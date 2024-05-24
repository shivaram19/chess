"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const server = http_1.default.createServer();
const wss = new ws_1.WebSocketServer({ server });
wss.on("connection", function (socket) {
    socket.on("error", console.error);
    socket.on("message", function (data) {
        console.log(`received the message from client side ${data}`);
        socket.send(`I'm sending the same data from the server side ${data}`);
    });
    socket.send("message received");
});
server.listen(8080, () => {
    console.log("started the server ");
});
