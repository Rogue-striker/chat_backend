import express from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import UserModel from "./Models/UserModel.js";

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// mongoose
//   .connect("mongodb://localhost:27017/chat", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => {
//     console.log("connected to mongodb");
//   })
//   .catch((err) => {
//     console.log(err);
// });

app.get("/", (req, res) => {
  UserModel.find({ name }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

io.on("connection", (socket) => {
  socket.on("register", (data) => {
    socket.join(data.room);
  });
  socket.on("sendMessage", (data) => {
    console.log(data);
    io.emit("receiveMessage", data);
//io.to(data.room).emit("receiveMessage", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(5000, () => {
  console.log("listening on port 5000");
});
