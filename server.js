const express = require("express");
const bodyParser = require("body-parser");
const controller = require("./controllers/rootController");
const socketConnection = require("./socket/service/connection");

// import server socket io
const { Server } = require("./socket/config/config");
const { Io } = require("./socket/config/config");

const app = express();

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
// var options = {
//   inflate: true,
//   limit: "50mb",
//   type: "application/octet-stream",
// };
// app.use(bodyParser.raw(options));

// USE CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const server = Server(app);
const io = Io(server);

socketConnection(io);
controller(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
