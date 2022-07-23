const express = require('express');

const app = express();

const server = require('http').createServer(app);

const Websocket = require('ws');


const wss = new Websocket.Server({server : server});


wss.on('connection' , function connection (ws){
    
    console.log("A new connection is made ");

    ws.on('message' , function incoming(message){
        
        // console.log("received message from user : %s",message);
        // ws.send("did you sent this message : " + message);

        wss.clients.forEach (function each( client) {
            if ( client != ws && client.readyState == Websocket.OPEN ){
                client.send (message);
                //console.log("%s sent message to %s",ws,client);
                console.log("message sent %s",message);
            }
            
        });
    });
});

app.get("/" , (req , res) => {
    res.send("hello world");
});

const port = 3000;

server.listen(port , () => console.log(`server connected to the port ${port}`));