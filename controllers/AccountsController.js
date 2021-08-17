const accountService = require("../services/ModelServices/AccountService");
const userService = require("../services/ModelServices/UserService");
const postService = require("../services/ModelServices/PostService");
const { v4 } = require("uuid");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const GetToken = (userName) => {
  return (
    "bearer " +
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
      return res.status(201).json({
        IsSuccess: false,
        Message: "Tài khoản hoặc mật khẩu không chính xác",
        ReturnData: null,
      });
    }

    return res.status(201).json({
      IsSuccess: true,
      Message: "Đăng nhập thành công",
      ReturnData: {
        Access_token: GetToken(req.body.userName),
      },
    });
  });

  app.post("/register", async (req, res) => {
    // check exist auth
    var UserName = req.body.userName;
    var Email = req.body.email;

    const resultCheckUserName = await accountService.CheckExistUserName(
      UserName
    );
    if (resultCheckUserName.length == 0) {
      const resultCheckEmail = await accountService.CheckExistEmail(Email);
      if (resultCheckEmail.length == 0) {
        const auth = {
          UserName: UserName,
          PassWord: req.body.passWord,
          Email: Email,
        };
        const user = {
          UserId: v4(),
          UserName: UserName,
          FirstName: req.body.firstName,
          MiddleName: req.body.middleName,
          LastName: req.body.lastName,
          DoB: req.body.doB,
        };
        const resultAccount = await accountService.CreateAccount(auth);
        const resultUser = await userService.CreateUser(user);
        if (resultAccount.length != 0 || resultUser.length != 0) {
          return res.status(200).json({
            IsSuccess: true,
            Message: "Đăng ký thành công",
            ReturnData: [],
          });
        }
      } else {
        return res.status(200).json({
          IsSuccess: false,
          Message: "Email này đã được đăng ký",
          ReturnData: [],
        });
      }
    }
    return res.status(200).json({
      IsSuccess: false,
      Message: "Tài khoản đã tồn tại",
      ReturnData: [],
    });
  });
};
