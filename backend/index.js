var start = require("./server");
const jwt = require("jsonwebtoken");
const _ = require("lodash");



//chat
const httpServer = require("http").createServer();
const socket = require("socket.io");
const { user } = require("./config");
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
const users = {};
io.on("connect", (socket) => {
  try {
    let userId = socket.handshake.query.userId; // GET USER ID
    console.log("userId: ", userId);
  
    if (userId) {
      if (!users[userId]) users[userId] = [];
      console.log("users====>>>", users)
      
      users[userId].push(socket.id);
      
      io.sockets.emit("online", userId);
  
      socket.on('disconnect', (reason) => {
        _.remove(users[userId], (u) => u === socket.id);
        if (users[userId].length === 0) {
          io.sockets.emit("offline", userId);
          delete users[userId];
        }
        socket.disconnect(); 
  
      });
    }
    // jwt.verify(token, "matcha-secret-code");
    socket.on("joinNotification", () => {
      socket.join("MatchaNotify");
    });

    socket.on("join", ({ userId, room }) => {
      socket.join(room);
    });

    socket.on("newNotification", ({ userId, notifiedUser, notifyId }) => {
      io.to("MatchaNotify").emit("notification", { notifiedUser, notifyId });
    });

    socket.on("sendMessage", ({ room, msgId }) => {
      socket.broadcast.to(room).emit("message", { msgId: msgId });
    });
  
  } catch (err) {}
});

const port = 8000;
io.listen(port);
console.log("listening on port ", port);
//
