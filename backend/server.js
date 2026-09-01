require("dotenv").config();
const app = require("./src/app");
const http = require("http");
const socketIO = require("socket.io");
const chatSocket = require("./src/sockets/chat.socket");

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  },
});
chatSocket(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
