package com.ev3;

import io.undertow.Undertow;

import static io.undertow.Handlers.path;
import static io.undertow.Handlers.websocket;

public class BrickServer {

    public static void main(String[] args) {
        startWebSocketServer();
    }

    private static void startWebSocketServer() {
        WebSocketCallback callback = new WebSocketCallback();

        Log.info("Starting server...");
        final String host = "0.0.0.0";
        Undertow server = Undertow
                .builder()
                .addHttpListener(8081, host)
                .setHandler(path().addPrefixPath("/ev3", websocket(callback)))
                .build();
        server.start();
        Log.info("Server started.");
    }
}
