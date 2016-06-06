template <DispatchMode m, typename Proto>
class DispatcherClientServer
{
public:
    DispatcherClientServer();

    bool listen(uint16_t port, int domain = AF_INET);

    void start();
};



%template(SoaProcessDispatcherClientServer) DispatcherClientServer<DispatchMode::ProcessSession, Soa>;

%inline %{

    typedef DispatcherClientServer<DispatchMode::ProcessSession, Soa> SoaProcessDispatcherClientServer;

    class SoaProcessDispatcherServer : public SoaProcessDispatcherClientServer
    {
    protected:
        SoaCallback* _callback;

    public:
        SoaProcessDispatcherServer() : _callback(nullptr)
        {
            EventManager::on<Soa::ON_REQUEST>(Utils::to_function([this](SoaRequest& request, SoaResponse& response) {
                if (_callback) _callback->run(request, response);
            }));

        }

        void dispatch(int n_process)
        {
            DispatcherClientServer<DispatchMode::ProcessSession, Soa>::dispatch(n_process);
        }

        void on(char* event, SoaCallback* cb)
        {
            if (strcasecmp(event, "request") == 0) {
                if (_callback) delete _callback;
                _callback = cb;
            } else {
                exit(1);
            }
        }


    };

%}