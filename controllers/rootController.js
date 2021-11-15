const Post = require("./PostsController");
const Account = require("./AccountsController");
const User = require("./UsersController");

module.exports = (app) => {
  Post(app);
  Account(app);
  User(app);
};
