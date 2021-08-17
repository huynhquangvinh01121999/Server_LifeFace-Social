const postService = require("../services/ModelServices/PostService");
const { v4 } = require("uuid");

module.exports = (app) => {
  app.get("/", async (req, res) => {
    var results = await postService.GetPosts();
    console.log(results);
    res.status(201).json(results);
  });

  app.get("/getPostById", async (req, res) => {
    var postId = req.query.postId;
    var results = await postService.GetPostById(postId);
    console.log(results);
    res.status(201).json(results);
  });

  app.get("/getPostByUserId", async (req, res) => {
    var userId = req.query.userId;
    var results = await postService.GetPosts_ByUserId(userId);
    console.log(results);
    res.status(201).json(results);
  });
};
