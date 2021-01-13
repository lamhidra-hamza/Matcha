var start = require("./server");

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
  socket.on("joinNotification", () => {
    socket.join("MatchaNotify");
  });

  socket.on("join", ({ userId, room }) => {
    socket.join(room);
    //socket.emit('message', { user: 'admin', text: `${userId} has joined!` });
    //socket.broadcast
    // .to("room")
    //.emit("message", { user: "admin", text: `${userId} has joined!` });
  });

  socket.on("newNotification", ({ userId, notifiedUser, notifyId }) => {
    console.log("notification here  ============     ", notifyId);
    socket.broadcast
      .to("MatchaNotify")
      .emit("notification", { notifiedUser, notifyId });
  });

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
