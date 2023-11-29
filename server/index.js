const express = require("express");
const http = require("node:http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Hello my socket app");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("send_message", (data) => {
    console.log(socket.id);
    socket.emit("emit_success", { ...data, id: socket.id });
    socket.broadcast.emit("receive_message", { ...data, id: socket.id });
  });

  socket.on("join_room", (data) => {
    console.log(data);
    socket.join(data);
  });

  socket.on("send_message_room", (data, error) => {
    console.log({ data });
    socket
      .to(data.room)
      .emit("receive_message_room", { ...data, id: socket.id });
    socket.emit("emit_success", { ...data, id: socket.id });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
