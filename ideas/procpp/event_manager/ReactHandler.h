#pragma once
#define DEBUG(exp, message) {\
	if (!(exp)) L.error_exit(message); \
}


#define L ErrorHandler::get_instance()

#include "EventManager.h"
#include "Server.h"
#include "ClientServer.h"
#include "Client.h"
#include "Protocol.h"
#include "Log/ErrorHandler.h"
#include "Utils.h"
#include "StateMachine/StateBuffer.h"
#include "Dispatch/ProcessWorker.h"




