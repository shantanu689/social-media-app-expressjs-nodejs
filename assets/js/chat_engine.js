class ChatEngine {
  constructor(chatBoxId, userEmail, userName, userAvatar) {
    this.chatBox = $(`#${chatBoxId}`);
    this.userEmail = userEmail;
    this.userName = userName;
    this.userAvatar = userAvatar;
    var connectionOptions = {
      "force new connection": true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"],
    };
    this.socket = io.connect("https://the-hex.herokuapp.com", connectionOptions);

    if (this.userEmail) {
      this.connectionHandler();
    }
  }

  connectionHandler() {
    let self = this;

    this.socket.on("connect", function () {
      self.socket.emit("join_room", {
        user_email: self.userEmail,
        user_name: self.userName,
        user_avatar: self.userAvatar,
        chatroom: "the-hex",
      });

      self.socket.on("user_joined", function (data) {
        let imagePath;
        if(data.user_avatar.includes('http')) {
          imagePath = data.user_avatar
        } else {
          imagePath = `/images/${data.user_avatar}`
        }
        let newUserJoined = $(`
                <li class='new-user-joined'>
                    <img src="${imagePath}" alt="" width="35" height="35" style="border-radius: 100px;">
                    <span><b>${data.user_name}</b> joined the chat!</span>
                </li>
                `);
        $("#chat-message-list").append(newUserJoined);
      });
    });

    //send a message on clicking the send message button
    $("#send-message").click(function () {
      let msg = $("#message").val();
      $('#message').val('')
      if (msg != "") {
        self.socket.emit("send_message", {
          message: msg,
          user_email: self.userEmail,
          user_name: self.userName,
          user_avatar: self.userAvatar,
          chatroom: "the-hex",
        });
      }
    });

    self.socket.on("receive_message", function (data) {
      let newMessage = $("<li>");
      let messageType = "other-message";

      if (data.user_email == self.userEmail) {
        messageType = "self-message";
      }
      let imagePath;
      if(data.user_avatar.includes('http')) {
        imagePath = data.user_avatar
      } else {
        imagePath = `/images/${data.user_avatar}`
      }
      newMessage = $(`
            <li class=${messageType}>
                <span class="style-message">
                    <div class = "d-flex align-items-center">
                        <img src="${imagePath}" alt="" width="35" height="35" style="border-radius: 50%; margin-right:5%">
                        <h6>${data.user_name}</h6>
                    </div>
                    <p>${data.message}</p>
                </span>
            </li>
            `);
      $("#chat-message-list").append(newMessage);
    });
  }
}
