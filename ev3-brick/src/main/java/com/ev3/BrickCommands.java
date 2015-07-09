package com.ev3;

import io.undertow.websockets.core.AbstractReceiveListener;
import io.undertow.websockets.core.BufferedTextMessage;
import io.undertow.websockets.core.WebSocketChannel;
import io.undertow.websockets.core.WebSockets;

import javax.json.Json;
import javax.json.JsonObject;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import java.io.StringReader;

public class BrickCommands extends AbstractReceiveListener {

    private WebSocketChannel channel;

    @Override
    protected void onFullTextMessage(WebSocketChannel channel, BufferedTextMessage message) {
        this.channel = channel;

        final JsonObject jsonCommand = Json.createReader(new StringReader(message.getData()))
                                           .readObject();

        final String action = jsonCommand.getString("action");
        Log.info("Received command action: " + action);

        WebSockets.sendText("[ev3.brick] Received action " + action, channel, null);

        if("run".equals(action)){
            final String script = jsonCommand.getString("script");
            runNashornScript(script);
        }
        if("stop".equals(action)){
            System.exit(0);
        }
    }

    private void runNashornScript(String script) {
        Log.info("Initializing Nashorn...");

        ScriptEngineManager engineManager = new ScriptEngineManager();
        ScriptEngine scriptEngine = engineManager.getEngineByName("nashorn");

        try {
            Log.info("Evaluating script... ");

            Log.info(script);

            scriptEngine.eval(script);

            Log.info("Evaluating script done.");

            WebSockets.sendText("[ev3.brick] Evaluating script done.", channel, null);

        } catch (Exception e) {
            Log.info("Failed evaluate script.");
        }
    }
}
