import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";


const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "https://https://prechat.netlify.app",
  },
});

io.on("connection", (socket) => {
  socket.on("register", (data) => {
    socket.join(data.room);
  });
  socket.on("join", (data)=>{
    socket.join(data)
  })
  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(5000, () => {
  console.log("listening on port 5000");
});
