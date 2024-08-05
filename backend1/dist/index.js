"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const server = http_1.default.createServer();
const wss = new ws_1.WebSocketServer({ server });
const gameManger = new GameManager_1.GameManager();
wss.on("connection", function (socket) {
    socket.on("error", console.error);
    gameManger.addUser(socket);
    socket.on("disconnect", function disconnect(socket) {
        gameManger.removeUser(socket);
    });
});
server.listen(8080, () => {
    console.log("started the server ");
});
