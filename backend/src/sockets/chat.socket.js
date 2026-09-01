const Message = require("../models/message.model");

const chatSocket = (io) => {
  const onlineUsers = new Set();
  io.on("connection", (socket) => {
    onlineUsers.add(socket.id);
    io.emit("online_users", onlineUsers.size);
    const guestName = `User ${socket.id.slice(0, 4)}`;

    socket.emit("user_join", { name: "You joined the chat" });
    socket.broadcast.emit("user_join", { name: guestName });

    socket.on("send_message", async (data) => {
      try {
        console.log("Received message:", data);
        const message = await Message.create({
          sender: data.senderId,
          message: data.message,
        });

        const populatedMessage = await Message.findById(message._id).populate(
          "sender",
          "name email",
        );

        io.emit("message", populatedMessage);
      } catch (error) {
        console.error(error.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      onlineUsers.delete(socket.id);
      io.emit("online_users", onlineUsers.size);
    });
  });
};

module.exports = chatSocket;
