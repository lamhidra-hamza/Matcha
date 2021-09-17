var start = require("./server");
const jwt = require("jsonwebtoken");


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
  try {
    console.log("token========>>>");
    // jwt.verify(token, "matcha-secret-code");
    socket.on("joinNotification", () => {
      socket.join("MatchaNotify");
    });

    socket.on("join", ({ userId, room }) => {
      console.log("room ======>>>", room);
      socket.join(room);
    });

    socket.on("newNotification", ({ userId, notifiedUser, notifyId }) => {
      console.log("notifiedUser=======>>>", notifiedUser);
      io.to("MatchaNotify").emit("notification", { notifiedUser, notifyId });
    });

    socket.on("sendMessage", ({ room, msgId }) => {
      console.log("sendMessage =====>>>", room,"\n" ,msgId, "====")
      socket.broadcast.to(room).emit("message", { msgId: msgId });
    });
  } catch (err) {}
});

const port = 8000;
io.listen(port);
console.log("listening on port ", port);
//
