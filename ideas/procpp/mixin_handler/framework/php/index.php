<?php
require __DIR__ . "/bootstrap/init.php";

class PhpCallback extends HttpCallback {
    function run($req, $resp)
    {
        echo "HttpCallback\n";
        Handler::getInstance()->dispatchHttp($req, $resp);
    }
}

$callback = new PhpCallback();

$s=new HttpProcessDispatcherServer();
$s->on('request', $callback);
$s->listen(8082);
$s->dispatch(1);
