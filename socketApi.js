var socket_io = require("socket.io");
var io = socket_io();
var socketApi = {};
const Message = require("./models/Message");

socketApi.io = io;

io.on("connection", async function (socket) {
  console.log("A user connected");
  let messages = await (
    await Message.find().sort({ _id: -1 }).limit(10)
  ).reverse();
  socket.emit("welcome", messages);
  socket.on("send", async (msg) => {
    let message = await Message.create({
      username: msg.username,
      avatar: msg.avatar,
      body: msg.body,
    });
    io.emit("receive", message);
  });
});

module.exports = socketApi;
