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

let activeUsers = [];

io.on("connection", (socket) => {
  console.log("New user connected", socket.id);
  const existingUser = activeUsers.find((user) => user.id == socket.id);
  if (!existingUser) {
    socket.username = `user-${(Math.floor(Math.random() * 100) * 1e3).toString(
      36
    )}`;
    console.log(socket.username);
    activeUsers.push({
      id: socket.id,
      username: socket.username,
    });
    io.sockets.emit("users", { users: activeUsers });
  }

  socket.emit("setUsername");

  socket.on("disconnect", () => {
    console.log(`disconnecting ${socket.id}`);
    activeUsers = activeUsers.filter((user) => user.id !== socket.id);
    io.sockets.emit("users", { users: activeUsers });
  });
});
