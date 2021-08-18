const postService = require("../services/ModelServices/PostService");
const userService = require("../services/ModelServices/UserService");
const imageService = require("../services/ModelServices/ImageService");
const postImageService = require("../services/ModelServices/PostImageService");
const { v4 } = require("uuid");

module.exports = (app) => {
  app.get("/", async (req, res) => {
    var results = await postService.GetPosts();
    var resultPostImage = await postImageService.GetPostImages();
    var resultImage = await imageService.GetImages();

    /*
    duyệt Post 
      => duyệt postImage => lấy ra ds postImage theo postID(truyền vô postID)
        => duyệt image => lấy ra ds image theo imageId(truyền vô imageId)
    */
    function getListImage(listPostImage, listImage, postId) {
      var listImageTemp = [];
      listPostImage = listPostImage.filter(
        (postImage) => postImage.PostId == postId
      );
      listImage.map((image) =>
        // duyệt danh sách listPostImage để lấy ra ds ảnh có cùng imageId
        listPostImage.forEach((element) => {
          element.ImageId === image.ImageId ? listImageTemp.push(image) : "";
        })
      );
      return listImageTemp;
    }

    // Cách 1: Dùng map để add key to object
    results.map(
      (result, index) =>
        (results[index]["ListImage"] = getListImage(
          resultPostImage,
          resultImage,
          result.PostId
        ))
    );

    // Cách 2: Dùng forEach để add key to object
    // results.forEach(
    //   (element, index) =>
    //     (results[index]["listImage"] = getListImage(
    //       resultPostImage,
    //       resultImage,
    //       element.PostId
    //     ))
    // );

    res.status(201).json({
      Total: results.length,
      ReturnData: results,
    });
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

  app.post("/createPost", async (req, res) => {
    var userId = await userService.GetUserByUserName(req.body.userName);
    const postId = v4();
    const imageId = v4();
    var newPost = {
      PostId: postId,
      UserId: userId[0].UserId,
      FullName:
        userId[0].FirstName +
        " " +
        userId[0].MiddleName +
        " " +
        userId[0].LastName,
      Content: req.body.content,
    };
    var newImage = {
      ImageId: imageId,
      ImageBase: req.body.imageBase,
    };

    var newPostImage = {
      PostId: postId,
      ImageId: imageId,
    };
    var resultCreatePost = await postService.CreatePost(newPost);
    var resultImage = await imageService.CreateImage(newImage);
    var resultPostImage = await postImageService.CreatePostImage(newPostImage);

    return res.status(200).json({
      IsSuccess: false,
      Message: "Đăng bài thành công",
      ReturnData: {
        post: resultCreatePost,
        image: resultImage,
        postImage: resultPostImage,
      },
    });
  });
};
