import http from "http"
import { WebSocketServer } from "ws"
import { GameManager } from "./GameManager"

const server = http.createServer()

const wss = new WebSocketServer({server})

const gameManger = new GameManager();
wss.on("connection", function (socket){
  socket.on("error", console.error);
  
  gameManger.addUser(socket);
  socket.on("disconnect", function disconnect(socket){
    gameManger.removeUser(socket);
  })
  
})

server.listen(8080, () => {
  console.log("started the server ")
})