const express = require("express");
const app = express();

const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(9000, () => {
  console.log("listening on *:9000");
});

const activeUsers = [];

io.on("connection", (socket) => {
  console.log("New user connected", socket.id);
  const existingUser = activeUsers.find((users) => users.id == socket.id);
  if (!existingUser) {
    socket.username = `user${Math.random()}`;
    console.log(socket.username)

    io.sockets.emit("users", activeUsers)
  }

  socket.emit("setUsername");
});
