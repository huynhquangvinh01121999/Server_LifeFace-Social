const postService = require("../services/ModelServices/PostService");
const userService = require("../services/ModelServices/UserService");
const imageService = require("../services/ModelServices/ImageService");
const postImageService = require("../services/ModelServices/PostImageService");
const { v4 } = require("uuid");

module.exports = (app) => {
  app.get("/getInfo", async (req, res) => {
    var user = await userService.GetUserByUserName(req.query.userName);
    return res.status(201).json(user);
  });

  app.get("/getUserNotMe", async (req, res) => {
    var users = await userService.GetUser_NotMe(req.query.userName);
    return res.status(201).json({
      Total: users.length,
      ReturnData: users,
    });
  });

  app.post("/updateAvatar", async (req, res) => {
    var data = {
      ImageBase: req.body.imageBase,
    };
    var result = await userService.UpdateUser(req.body.userId, data);
    res.status(201).json({
      Status: true,
      Message: "Cập nhật ảnh đại diện thành công",
      ReturnData: result,
    });
  });

  app.post("/updateBackground", async (req, res) => {
    var data = {
      BackgroundBase: req.body.backgroundBase,
    };
    var result = await userService.UpdateUser(req.body.userId, data);
    res.status(201).json({
      Status: true,
      Message: "Cập nhật ảnh nền thành công",
      ReturnData: result,
    });
  });
};
