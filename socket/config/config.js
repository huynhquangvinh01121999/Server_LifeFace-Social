const Server = (app) => {
  // khởi tạo 1 server
  var server = require("http").createServer(app);
  return server;
};

const Io = (server) => {
  // khởi tạo 1 socket io nối vào server
  var io = require("socket.io")(server, {
    cors: { origin: "https://localhost:44315/", credentials: true },
  });

  return io;
};

module.exports = {
  Server,
  Io,
};
