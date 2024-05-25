import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";

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
  }

  private handleMessage(socket: WebSocket, data: string) {
    const message = JSON.parse(data);

    if (message.type === INIT_GAME) {
      if (this.pendingUser) {
        // start a game
        const game = new Game(this.pendingUser, socket);
        this.games.push(game);
        this.pendingUser = null;
      } else {
        this.pendingUser = socket;
      }
    }

    if (message.type === MOVE) {
      const game = this.games.find((game) => game.player1 === socket || game.player2 === socket);
      if(game){
        game.makeMove(socket, message.move);
      }
    }
  }

  private addHandler(socket: WebSocket) {
    socket.on("message", (data: string) => {
      this.handleMessage(socket, data);
    });

    socket.on("close", () => {
      this.removeUser(socket);
      if (this.pendingUser === socket) {
        this.pendingUser = null;
      }
    });
  }
}
