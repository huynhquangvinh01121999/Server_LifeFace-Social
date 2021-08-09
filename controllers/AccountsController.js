const accountService = require("../services/ModelServices/AccountService");
const { uuid } = require("uuidv4");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const GetToken = (userName) => {
  return (
    "beaer " +
    jwt.sign({ username: userName }, process.env.ACCESS_TOKEN_SERET_KEY, {
      expiresIn: "60s",
    })
  );
};

module.exports = (app) => {
  app.post("/authen", async (req, res) => {
    const auth = {
      userName: req.body.userName,
      passWord: req.body.passWord,
    };
    const result = await accountService.Auth(auth);
    if (result.length == 0) {
      return res.status(500).json({
        isSuccess: false,
        message: "Authenticate fail",
        access_token: null,
      });
    }

    return res.status(201).json({
      isSuccess: true,
      message: "Authenticate successfuly",
      access_token: GetToken(req.body.userName),
    });
  });
};
