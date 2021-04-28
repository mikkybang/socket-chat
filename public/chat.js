$(function () {
  var socket = io.connect("http://localhost:9000");

  let activeUsers = [];

  let selectedUser = {
    id: null,
    messages: [],
  };

  let user = {
    id: null,
    messages: [],
  };

  const inputElement = document.getElementById("message-input");

  inputElement.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      sendMessage(inputElement.value);
      inputElement.value = "";
    }
  });

  socket.on("connect", () => {
    console.log("connected");
    user.id = socket.id;
    selectedUser.id = socket.id;
  });

  socket.on("users", ({ users }) => {
    console.log(users);
    updateUserList(users);
    activeUsers.push(users);
  });

  socket.on("privateMessage", ({ message, from }) => {
    console.log(message, from);
    receiveMessage(from, message);
  });

  function updateUserList(users) {
    $("#active-users").html("");
    users.forEach((user) => {
      if (socket.id === user.id) {
        $("#active-users").append(
          $(`<div class="chat_list" id="${user.id}">`).html(`
          <div class="chat_people">
                  <div class="chat_img">
                    <img
                      src="https://ptetutorials.com/images/user-profile.png"
                      alt="sunil"
                    />
                  </div>
                  <div class="chat_ib">
                    <h5>${user.username}<span class="chat_date">(yourself)</span></h5>
                  </div>
            </div>
          `)
        );

        $(`#${user.id}`).click(() => {
          console.log("This is yourself");
          changeTab(user.id);
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
                    <h5>${user.username}</h5>
                   
                  </div>
                </div>
          `
        )
      );
      $(`#${user.id}`).click(() => {
        console.log(user);
        changeTab(user.id);
      });
    });
  }

  function changeTab(id) {
    $(`#${selectedUser.id}`).removeClass("active_chat");
    selectedUser.id = id;
    $(`#${id}`).addClass("active_chat");
  }

  function sendMessage(message) {
    socket.emit("privateMessage", {
      message,
      to: selectedUser.id,
    });

    selectedUser.messages.push({
      message,
      fromSelf: true,
    });

    $(".msg_history").append(`div class="outgoing_msg"`).html(
      `<div class="sent_msg">
        <p>${message}</p>
      </div>`
    );
  }

  function receiveMessage(from, message) {
    user.messages.push({
      message,
      from,
    });
    $(".msg_history").append(`div class="incoming_msg"`).html(
      `<div class="received_msg">
        <div class="received_withd_msg">
          <p>${message}</p>
        </div>
      </div>`
    );
  }
});
