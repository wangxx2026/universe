#include "ReactHandler.h"
#include <sys/prctl.h>//prctl
#include <signal.h>//SIGHUP

ClientServer::~ClientServer()
{
    if (_global_proto_p) delete _global_proto_p;
}

int ClientServer::accept(int socketfd, struct sockaddr *addr, socklen_t *addrlen)
{
    auto client = Server::accept(socketfd, addr, addrlen);


    //若client == -1则为惊群或者已读完，此时不需要自增
    if (client != -1 && !_is_child) {
        auto session_id = ++_session_id;
        _c2s[client] = session_id;
        _s2c[session_id] = client;
    }

    return client;
}

bool ClientServer::unwatch(int fd, bool no_callback)
{
    if (EventManager::unwatch(fd, no_callback)) {
        if (_c2s.find(fd) != _c2s.end()) {
            auto session_id = _c2s[fd];
            _s2c.erase(session_id);

            _c2s.erase(fd);
        }

        //只有is_child && recv_session_id成功前有内容
        //但不排除_session_task中unwatch的可能性
        //所以暂时不加条件  TODO 把可能性排除 加上条件
        _session_tasks.erase(fd);

        erase_buf(fd);

        return true;
    }

    return false;
}

bool ClientServer::get_session_id(int client, unsigned int* session_id)
{
    if (_c2s.find(client) == _c2s.end()) return false;

    if (session_id) *session_id = _c2s[client];

    return true;
}

bool ClientServer::send_session_id(int worker_fd, int client)
{
    uint32_t session_id = 0;
    if (get_session_id(client, &session_id)) {
        L.info_log("client = " + to_string(client) + " session_id = " + to_string(session_id));
        auto session_id_n = htonl(session_id);
        write(worker_fd, &session_id_n, sizeof(uint32_t));//TODO handle write failure
        return true;
    }

    return false;
}

bool ClientServer::recv_session_id(int worker_client, string& message)
{
    append_buf(worker_client, message);

    uint32_t session_id_n;
    if ( need_buf(worker_client, message, !Protocol::read(message, session_id_n)) ) {
        return false;
    }

    auto session_id = ntohl(session_id_n);
    _c2s[worker_client] = session_id;
    _s2c[session_id] = worker_client;

    return true;
}

ssize_t ClientServer::write_global(uint32_t session_id, const void *buf, size_t count)
{

    if (_s2c.find(session_id) != _s2c.end()) {
        auto local_client = _s2c[session_id];
        return write(local_client, buf, count);
    }

    if (!_is_child) {
        L.error_log("session_id " + to_string(session_id) + " not exists!");
        return 0;
    }

    //同步
    connect_parent();

    auto channel = _parent_sock;

    uint32_t total_size = sizeof(uint32_t) + count + sizeof(uint32_t);
    auto total_size_n = htonl(total_size);
    auto session_id_n = htonl(session_id);
    write(channel, &total_size_n, sizeof(total_size_n));
    write(channel, &session_id_n, sizeof(session_id_n));
    write(channel, buf, count);

    return count;//TODO handle write failure

}

ssize_t ClientServer::write_global(uint32_t session_id, const string& data)
{
    return write_global(session_id, data.data(), data.length());
}

bool ClientServer::listen_for_child(const string sun_path)
{
    if (!_global_proto_p) _global_proto_p = new Global(*this);

    return listen(sun_path, *_global_proto_p);
}

bool ClientServer::set_parent(string sun_path)
{
    if (_parent_sock > 0) {
        close(_parent_sock);
        _parent_sock = -1;
    }

    _parent_addr_type = ClientServer::AddressType::SUN;
    _parent_sun = sun_path;


    _is_child = true;

    return true;
}

bool ClientServer::set_parent(string host, uint16_t port)
{
    if (_parent_sock > 0) {
        close(_parent_sock);
        _parent_sock = -1;
    }

    _parent_addr_type = ClientServer::AddressType::INET;
    _parent_host = host;
    _parent_port = port;


    _is_child = true;

    return true;
}

//write_global时调用
bool ClientServer::connect_parent()
{
    if (_parent_port > 0) return true;

    auto callbacks = EventManager::EventCB{
        {
            EventType::CONNECT, EventManager::CB([this] (int parent_sock, ConnectResult r) {
                _parent_sock = parent_sock;
            }),
        },
        {
            EventType::READ, EventManager::CB([this] (int parent_sock, string message) {
                //TODO handle response
            })
        },
        {
            EventType::CLOSE, EventManager::CB([this] (int parent_sock) {
                L.error_log("parent_sock is closed");
                _parent_sock = -1;
            })
        }
    };

    switch (_parent_addr_type) {
        case ClientServer::AddressType::SUN:
        {
            if ( connect(_parent_sun, callbacks) < 0 ) {
                L.error_exit("set_parent " + _parent_sun + " failed!");
            }

            break;
        }
        case ClientServer::AddressType::INET:
        {
            if ( connect(_parent_host, _parent_port, callbacks) < 0 ) {
                L.error_exit("set_parent " + _parent_host + ":" + to_string(_parent_port) + " failed!");
            }

            break;
        }
    }

    return true;
}

EventManager::EventCB ClientServer::to_callbacks(Protocol& proto)
{
    return EventManager::EventCB{
        {
            EventType::READ, EventManager::CB([&proto, this] (int fd) mutable {

                while (true) {
                    auto client = accept(fd, nullptr, nullptr);
                    if (client == -1) {
                        //cout << "[accept] end pid=" + to_string(Utils::getpid()) << endl;
                        return;
                    }

                    proto.on_connect(client);

                    watch(client, EventManager::EventCB{
                        {
                            EventType::READ, initial_message_wrapper(

                                [&proto] (int client, string message) mutable {
                                    proto.on_message(client, message);
                                }

                            ),
                        },
                        {
                            EventType::CLOSE, EventManager::CB([&proto] (int client) {
                                proto.on_close(client);
                            })
                        }
                    });

                }

            })
        }
    };
}

EventManager::CB ClientServer::initial_message_wrapper(EventManager::CB::R r)
{

    return EventManager::CB([this, r] (int client, string message) {

            if (_is_child) {
                if (recv_session_id(client, message)) {

                    if (_session_tasks.find(client) != _session_tasks.end()) {
                        for (auto& task : _session_tasks[client] ) task(client);

                        _session_tasks.erase(client);
                    }

                    watch( client, EventType::READ, EventManager::CB( r ) );

                    if (message.length() > 0) r(client, message);

                }
            } else {
                watch( client, EventType::READ, EventManager::CB( r ) );

                r(client, message);
            }

    });

}

bool ClientServer::add_session_task(int client, SessionTask task)
{
    //wait
    if (_c2s.find(client) == _c2s.end()) {
        _session_tasks[client].push_back(task);
        return false;
    }

    //fire right away
    task(client);
    return true;
}

void ClientServer::event_loop()
{

    if (_worker_num == 0) {
        Server::event_loop();
        return;
    }

    if (_worker_num == ClientServer::NUMBER_CORES) {
        _worker_num = Utils::get_cpu_cores();
    }

    auto child_callback = [this]() {

        prctl(PR_SET_PDEATHSIG, SIGHUP);
        this->fire<EventManager::ON_FORK>();

        Server::event_loop();

        // child should never return
        exit(0);

    };

    for (int i = 0; i < _worker_num; i++) {
        auto pid = fork();
        if (pid == -1) L.error_exit("fork");

        if (pid) {
        } else {

            child_callback();

        }
    }

    Utils::supervise_subprocess(child_callback);

}
