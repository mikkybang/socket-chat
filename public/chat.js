$(function () {
  var socket = io.connect("http://localhost:9000");

  socket.on("users", ({ users }) => {
    console.log(users);
    updateUserList(users);
  });

  function updateUserList(users) {
    $("#active-users").html("");
    users.forEach((user) => {
      if (socket.id === user.id) {
        $("#active-users").append(
          $(`<div class="chat_list active_chat">`).html(`
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
        return;
      }
      $("#active-users").append(
        $(`<div class="chat_list">`).html(
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
    });
  }
});
