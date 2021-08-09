const express = require("express");
var bodyParser = require("body-parser");
const Post = require("./controllers/PostsController");
const Account = require("./controllers/AccountsController");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

Post(app);
Account(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
