#pragma once
#include "EventManager.h"
#include <sys/types.h>          /* See NOTES */
#include <sys/socket.h>

class IServer
{
public:
	virtual bool listen(uint16_t port, EventManager::EventCB callbacks, int domain) = 0;
	virtual bool listen(const struct sockaddr *addr, socklen_t addrlen, EventManager::EventCB callbacks) = 0;
	virtual bool listen_u(uint16_t port, EventManager::EventCB callbacks, int domain) = 0;
	virtual bool listen_u(const struct sockaddr *addr, socklen_t addrlen, EventManager::EventCB callbacks) = 0;
	virtual void start() = 0;
};

class Server : public IServer
{
public:
	virtual bool listen(uint16_t port, EventManager::EventCB callbacks, int domain = AF_INET) override;
	virtual bool listen(const struct sockaddr *addr, socklen_t addrlen, EventManager::EventCB callbacks) override { return false; };
	virtual bool listen_u(uint16_t port, EventManager::EventCB callbacks, int domain = AF_INET) override { return false; };
	virtual bool listen_u(const struct sockaddr *addr, socklen_t addrlen, EventManager::EventCB callbacks) override { return false; };
	virtual void start() override;
	EventManager& getEventManager() { return _m; }

private:
	bool listen4(const struct sockaddr_in *addr, EventManager::EventCB callbacks);
	bool listen6(const struct sockaddr_in6 *addr, EventManager::EventCB callbacks);
	EventManager _m;

	friend class Echo;
	friend class Socks;
};

