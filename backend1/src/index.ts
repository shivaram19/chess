import http from "http"
import { WebSocketServer } from "ws"

const server = http.createServer()

const wss = new WebSocketServer({server})


wss.on("connection", function (socket){
  socket.on("error", console.error);
  
  socket.on("message", function(data){
    console.log(`received the message from client side ${data}`);
    socket.send(`I'm sending the same data from the server side ${data}`);
  })

  socket.send("message received");
})

server.listen(8080, () => {
  console.log("started the server ")
})