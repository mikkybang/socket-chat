$(function () {
  var socket = io.connect("http://localhost:9000");

  let activeUsers = [];

  let selectedUser = null;

  socket.on("users", ({ users }) => {
    console.log(users);
    updateUserList(users);
    activeUsers.push(users);
  });

  function updateUserList(users) {
    $("#active-users").html("");
    users.forEach((user) => {
      if (socket.id === user.id) {
        $("#active-users").append(
          $(`<div class="chat_list active_chat" id="${user.id}">`).html(`
          <div class="chat_people">
                  <div class="chat_img">
                    <img
                      src="https://ptetutorials.com/images/user-profile.png"
                      alt="sunil"
                    />
                  </div>
                  <div class="chat_ib">
                    <h5>Yourself <span class="chat_date">(yourself)</span></h5>
                  </div>
            </div>
          `)
        );

        $(`#${user.id}`).click(() => {
          console.log("This is yourself");
        });
        return;
      }
      $("#active-users").append(
        $(
          `<div class="chat_list" id="${user.id}">
          `
        ).html(
          `
          <div class="chat_people">
                  <div class="chat_img">
                    <img
                      src="https://ptetutorials.com/images/user-profile.png"
                      alt="sunil"
                    />
                  </div>
                  <div class="chat_ib">
                    <h5>${user.username}<span class="chat_date">Dec 25</span></h5>
                   
                  </div>
                </div>
          `
        )
      );
      $(`#${user.id}`).click(() => {
        console.log(user);
      });
    });
  }

  function createUserMessageBox() {}

  function changeTab(id) {
    selectedUser = id;
  }

  function sendMessage(to, message) {
    socket.emit("privateMessage", {
      message,
      to: selectedUser,
    });
  }
});
