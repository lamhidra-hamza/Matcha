var start = require("./server");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { HTTP401Error, errorHandler } = require('./utils/errorHandler');

const userModel = require("./api/users/user.model");



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
const users = {};
io.use(function(socket, next){
  if (socket.handshake.query && socket.handshake.query.token){
    jwt.verify(socket.handshake.query.token, 'matcha-secret-code', function(err, decoded) {
      if (err) return next(new HTTP401Error('Authentication error'));
      socket.decoded = decoded;
      next();
    });
  }
  else {
    next(new HTTP401Error('Authentication error'));
  }    
})
.on("connect", (socket) => {
  try {
    let userId = socket.handshake.query.userId;
  
    if (userId) {
      if (!users[userId]) users[userId] = [];
      
      users[userId].push(socket.id);
      
      io.sockets.emit("online", userId);
  
      socket.on('disconnect', (reason) => {
        _.remove(users[userId], (u) => u === socket.id);
        if (users[userId].length === 0) {
          io.sockets.emit("offline", userId);
          delete users[userId];
          userModel.updateLastConnection(userId, new Date());
        }
        socket.disconnect(); 
  
      });
    }
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
  
  } catch (err) {
    console.log(err);
  }
});

const port = 8000;
io.listen(port);
console.log("listening on port ", port);
//
