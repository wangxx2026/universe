#include "Client.h"
#include <strings.h>//bzero
#include <netdb.h>//getaddrinfo
#include <unistd.h>//close
#include <iostream>
using namespace std;

static void error_exit(const char *s)
{
	perror(s);
	exit(1);
}

static string RED(string s)
{
	return "\033[1;31m" + s + "\033[0m";
}


static void error_log(const char *s)
{
	perror(s);
}


bool Client::connect(string address, uint16_t port, EventManager::EventCB callbacks)
{
	//domain name
	struct addrinfo hints;
	struct addrinfo *result;
	bzero(&hints, sizeof(hints));
	hints.ai_family = AF_UNSPEC;    /* Allow IPv4 or IPv6 */
	hints.ai_socktype = SOCK_STREAM; /* Datagram socket */
	hints.ai_flags = AI_PASSIVE;    /* For wildcard IP address */
	hints.ai_protocol = 0;          /* Any protocol */
	hints.ai_canonname = NULL;
	hints.ai_addr = NULL;
	hints.ai_next = NULL;

	auto port_string = to_string(port);
	if (getaddrinfo(address.c_str(), port_string.c_str(), &hints, &result) != 0) {
		error_log("getaddrinfo");
		return false;
	}

	for (auto rp = result; rp != nullptr; rp = rp->ai_next) {
		if (connect(rp->ai_addr, rp->ai_addrlen, callbacks)) {
			freeaddrinfo(result);
			return true;
		}
	}

	return false;
}

bool Client::connect(const struct sockaddr* addr, socklen_t addrlen, EventManager::EventCB callbacks)
{
	auto s = socket(AF_INET, SOCK_STREAM, 0);
	if (s == -1) error_exit("socket");

	if (::connect(s, addr, addrlen) == -1) {
		error_log("connect");
		return false;
	}

	if (callbacks.find(EventType::CONNECT) != callbacks.end()) {
		callbacks[EventType::CONNECT](s);
		callbacks.erase(EventType::CONNECT);
	}

	watch(s, callbacks);

	return true;
}


void Client::connect(string address, uint16_t port, EventManager::EventCB callbacks, bool async)
{
}

void Client::connect(const struct sockaddr* addr, socklen_t addrlen, EventManager::EventCB callbacks, bool async)
{
	// 只应有CONNECT回调
	if ( ! ((callbacks.find(EventType::CONNECT) != callbacks.end()) && callbacks.size() == 1) ) {
		cout << RED("should only have CONNECT callback") << endl;
		exit(1);
	}

	auto s = nonblock_socket(AF_INET, SOCK_STREAM, 0);
	if (s == -1) error_exit("nonblock_socket");

	auto ret = ::connect(s, addr, addrlen);

	//失败，关闭socket
	if (ret == -1 && errno != EINPROGRESS) {
		callbacks[EventType::CONNECT](s, false);
		::close(s);
		return;
	}

	//只有连接localhost时才有可能出现立即成功
	if (ret == 0) callbacks[EventType::CONNECT](s, true);
	else {
		watch(s, callbacks);
	}
}
