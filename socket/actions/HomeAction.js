const HomeAction = (io, socket) => {
  socket.on("notifiOnline", (data) => {
    console.log(data);
    socket.broadcast.emit("reSentNotifiOnline", data + " vừa mới online");
  });

  socket.on("createNewPost", (data) => {
    console.log(data);
    socket.broadcast.emit("reSentCreatePost", data + " vừa thêm bài viết mới");
  });
};

module.exports = {
  HomeAction,
};
