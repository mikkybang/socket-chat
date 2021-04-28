$(function () {
  var socket = io.connect("http://localhost:9000");

  socket.on("users", ({ users }) => {
    console.log(users);
    updateUserList(users);
  });

  function updateUserList(users) {
    users.forEach((user) => {
      $("#active-users").append($("<li>").html(user.username));
    });
  }
});
