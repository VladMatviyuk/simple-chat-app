const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Connection user when someone open our app
io.on("connection", (socket) => {
  // Call event join
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    // User greeting
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });

    // Send all users message about user join
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has join`,
    });

    socket.join(user.room);

    // Event for get information about who in chat room
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  // Event for send message
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    // Generate data about message
    io.to(user.room).emit("message", {
      user: user.name,
      text: message,
      date: `${
        new Date().getHours() < 10
          ? "0" + new Date().getHours()
          : new Date().getHours()
      }:${
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes()
      }`,
    });

    // updating users data in a room
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  // Event when user disconnect
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    // check if the user is leave chat room then send all users a message about it
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `user ${user.name} has left`,
      });

      // updating users data in a room
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

app.use(router);

server.listen(PORT, () => {
  console.log(`Server listern on port ${PORT}`);
});
