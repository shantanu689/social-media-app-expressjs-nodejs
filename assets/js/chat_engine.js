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
    this.socket = io.connect("http://localhost:5000", connectionOptions);

    if (this.userEmail) {
      this.connectionHandler();
    }
  }

  connectionHandler() {
    let self = this;

    this.socket.on("connect", function () {
      console.log("connection established using sockets");

      self.socket.emit("join_room", {
        user_email: self.userEmail,
        chatroom: "the-hex",
      });

      self.socket.on("user_joined", function (data) {
        console.log("a user joined ", data);
      });
    });

    //send a message on clicking the send message button
    $("#send-message").click(function () {
      let msg = $("#message").val();
      console.log(msg);

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
      console.log("message received", data.message);

      let newMessage = $("<li>");
      let messageType = "other-message";

      if (data.user_email == self.userEmail) {
        messageType = "self-message";
      }
      newMessage = $(`
            <li class=${messageType}>
                <span class="style-message">
                    <div class = "d-flex align-items-center">
                        <img src="${data.user_avatar}" alt="" width="35" height="35" style="border-radius: 50%; margin-right:5%">
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
