import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";


// adding pending users to the queue 

export class GameManager {

  private games: Game[];
  private pendingUser: WebSocket | null;
  private users: WebSocket[];

  constructor() {
    this.games = [];
    this.users = [];
    this.pendingUser = null;
  }

  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.addHandler(socket);
  }

  removeUser(socket: WebSocket) {
    this.users = this.users.filter(user => user !== socket);
    // we also need to have a reconnect logic 
  }

  private addHandler(socket: WebSocket) {
    socket.on("message",(data) => {
      const message = JSON.parse(data.toString())
      if(message.type === INIT_GAME){
        if(this.pendingUser){
          const game = new Game(this.pendingUser, socket)
          this.games.push(game)
          this.pendingUser = null
        }else{
          this.pendingUser = socket
        }
      }

      if(message.type === MOVE){
        console.log("inside move")
        const game = this.games.find(game => game.player1 === socket || game.player2 === socket)
        if(game){
          console.log("inside makemove")
          game.makeMove(socket, message.move)
        }
      }
    })
  }
}
