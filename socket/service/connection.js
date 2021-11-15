const { HomeAction } = require("../actions/HomeAction");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`client ${socket.id} đã kết nổi`);
    HomeAction(io, socket);
  });
};
