var start = require("./server");
var {
  removeOne,
  updateOne,
  getMany,
  getOne,
  createOne,
  getChatLastUpdate,
} = require("./api/chat/chat.controller");

//chat
const httpServer = require("http").createServer();
const socket = require("socket.io");
const io = socket(
  (httpServer,
  {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["token"],
      credentials: true,
    },
  })
);

//

start();

//chat
io.on("connect", (socket) => {


  socket.on("join", ({ userId, room }) => {
    
    socket.join(room);
    //socket.emit('message', { user: 'admin', text: `${userId} has joined!` });
    //socket.broadcast
    //.to("room")
    //.emit("message", { user: "admin", text: `${userId} has joined!` });
  });

  socket.on("sendMessage", ({ room, msgId }) => {
    console.log("the message id is", msgId);
    //io.to("room").emit('message', { user: userId, text: message });
    socket.broadcast.to(room).emit("message", { msgId: msgId });
  });

});

const port = 8000;
io.listen(port);
console.log("listening on port ", port);
//
