module.exports.chatSockets = function (socketServer) {
  let io = require("socket.io")(socketServer);

  // io.connect from front-end fires an event called 'connection'
  io.sockets.on("connection", function (socket) {
    console.log("new connection received", socket.id);

    socket.on("disconnect", function () {
      console.log("socket disconnected!");
    });

    socket.on("join_room", function (data) {
      console.log("joining request received ", data);
      socket.join(data.chatroom);

      io.in(data.chatroom).emit("user_joined", data);
    });

    socket.on('send_message',function(data){
        // console.log(data);
        io.in(data.chatroom).emit('receive_message',data);
    })

  });
};
