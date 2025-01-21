const setupSocket = (server) => {
    const { Server } = require("socket.io");
    const io = new Server(server, {
      cors: { origin: "http://localhost:5173" },
    });
  
    io.on("connection", (socket) => {
      console.log("Client connected:", socket.id);
  
      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });
  
    return io;
  };
  
  module.exports = setupSocket;
  