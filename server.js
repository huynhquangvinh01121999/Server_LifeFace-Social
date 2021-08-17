const express = require("express");
var bodyParser = require("body-parser");
const Post = require("./controllers/PostsController");
const Account = require("./controllers/AccountsController");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var options = {
  inflate: true,
  limit: "100kb",
  type: "application/octet-stream",
};
app.use(bodyParser.raw(options));
// USE CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

Post(app);
Account(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
