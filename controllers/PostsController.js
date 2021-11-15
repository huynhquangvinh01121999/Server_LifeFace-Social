const postService = require("../services/ModelServices/PostService");
const userService = require("../services/ModelServices/UserService");
const imageService = require("../services/ModelServices/ImageService");
const postImageService = require("../services/ModelServices/PostImageService");
const postHeartService = require("../services/ModelServices/PostHeartService");
const commentService = require("../services/ModelServices/CommentService");

const { v4 } = require("uuid");

module.exports = (app) => {
  // Lấy ra toàn bộ ds bài viết
  app.get("/", async (req, res) => {
    var results = await postService.GetPosts(req.query.offSet);
    var resultPostImage = await postImageService.GetPostImages();
    var resultImage = await imageService.GetImages();
    var users = await userService.GetUsers();
    var comments = await commentService.GetComments();

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

    function getAvatar(users, userId) {
      users = users.filter((user) => user.UserId === userId);
      return users[0].ImageBase;
    }

    function getFullName(users, userId) {
      users = users.filter((user) => user.UserId === userId);
      return (
        users[0].FirstName + " " + users[0].MiddleName + " " + users[0].LastName
      );
    }

    function getComments(comments, postId) {
      comments = comments.filter((comment) => comment.PostId === postId);
      return comments;
    }

    // Cách 1: Dùng map để add key to object

    // lấy ra avatar của bài post
    await results.map(
      (result, index) =>
        (results[index]["Avatar"] = getAvatar(users, result.UserId))
    );

    // Lấy ra danh sách bình luận + tên từng người viết bình luận đó
    await results.map(
      (result, index) =>
        (results[index]["Comments"] = getComments(comments, result.PostId))
    );

    // lấy ra avatar của bình luận
    await results.map((result, index) => {
      results[index]["Comments"].map((comment, commentIndex) => {
        results[index]["Comments"][commentIndex]["Avatar"] = getAvatar(
          users,
          comment.UserId
        );
        results[index]["Comments"][commentIndex]["FullName"] = getFullName(
          users,
          comment.UserId
        );
      });
    });

    // lấy ra ds ảnh của các bài viết
    await results.map(
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
    //     (results[index]["ListImage"] = getListImage(
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

  // lấy ds bài viết theo AutoId
  app.get("/getPostById", async (req, res) => {
    var postId = req.query.postId;
    var results = await postService.GetPostById(postId);
    console.log(results);
    res.status(201).json(results);
  });

  // lấy ds bài viết theo UserId
  app.get("/getPostByUserId", async (req, res) => {
    var userId = req.query.userId;
    var results = await postService.GetPosts_ByUserId(userId);
    console.log(results);
    res.status(201).json(results);
  });

  // tạo mới bài viết
  app.post("/createPost", async (req, res) => {
    const postId = v4();
    const imageId = v4();
    var newPost = {
      PostId: postId,
      UserId: req.body.userId,
      Content: req.body.content,
      FullName: req.body.fullName,
    };

    var resultCreatePost = await postService.CreatePost(newPost);

    if (req.body.imageBase) {
      var newImage = {
        ImageId: imageId,
        ImageBase: req.body.imageBase,
      };

      var newPostImage = {
        PostId: postId,
        ImageId: imageId,
      };
      var resultImage = await imageService.CreateImage(newImage);
      var resultPostImage = await postImageService.CreatePostImage(
        newPostImage
      );
    }

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

  // sự kiện thả tim
  app.post("/heart", async (req, res) => {
    const userId = req.body.userId;
    const autoPostId = req.body.autoPostId;

    var resultCheck = await postHeartService.CheckExits(autoPostId, userId);
    if (resultCheck.length === 0) {
      var result = await postHeartService.Create({
        AutoPostId: autoPostId,
        UserId: userId,
      });

      var plusHeart = await postService.UpdatePlusHeartCount(autoPostId);
      var heartCount = await postService.GetPostAutoId(autoPostId);

      res.status(201).json({
        Status: true,
        Message: "Heart Post Success",
        ReturnData: {
          Action: "heart",
          HeartCount: heartCount[0].HeartCount,
        },
      });
    } else {
      var result = await postHeartService.Delete(autoPostId, userId);
      var minusHeart = await postService.UpdateMinusHeartCount(autoPostId);
      var heartCount = await postService.GetPostAutoId(autoPostId);
      res.status(201).json({
        Status: true,
        Message: "Delete Heart Post Success",
        ReturnData: {
          Action: "unheart",
          HeartCount: heartCount[0].HeartCount,
        },
      });
    }
  });

  // lấy ra các bài viết đc thả tim theo user truyền vào
  app.get("/getPostHeart_By_AutoPostId", async (req, res) => {
    var userInfo = await userService.GetUserByUserName(req.query.userName);
    var results = await postHeartService.GetByID(userInfo[0].UserId);

    res.status(201).json(results);
  });

  app.post("/postComment", async (req, res) => {
    // AutoPostId, UserId, PostId, Content
    var resultUpdateCommentCount = await postService.UpdatePlusCommentCount(
      req.body.autoPostId
    );
    var resultAddComment = await commentService.CreateComment({
      CommentId: v4(),
      UserId: req.body.userId,
      PostId: req.body.postId,
      Content: req.body.content,
    });
    res.status(201).json({
      Status: true,
      Message: "Post Comment Successed",
      ReturnData: "Bình luận đã được đăng thành công",
    });
  });

  app.get("/profile", async (req, res) => {
    var userInfo = await userService.GetUserByUserName(req.query.userName);
    var listPostInfo = await postService.GetPostById(userInfo[0].UserId);
    var listPost = await postService.GetPostById_orderby(
      userInfo[0].UserId,
      req.query.offSet
    );
    var listPeople = await userService.GetUser_NotMe(req.query.userName);
    let totalHeart = 0;
    listPostInfo.map((post) => (totalHeart += post.HeartCount));

    var resultPostImage = await postImageService.GetPostImages();
    var resultImage = await imageService.GetImages();
    var users = await userService.GetUsers();
    var comments = await commentService.GetComments();

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

    function getAvatar(users, userId) {
      users = users.filter((user) => user.UserId === userId);
      return users[0].ImageBase;
    }

    function getFullName(users, userId) {
      users = users.filter((user) => user.UserId === userId);
      return (
        users[0].FirstName + " " + users[0].MiddleName + " " + users[0].LastName
      );
    }

    function getComments(comments, postId) {
      comments = comments.filter((comment) => comment.PostId === postId);
      return comments;
    }

    // Cách 1: Dùng map để add key to object

    // lấy ra avatar của bài post
    await listPost.map(
      (post, index) =>
        (listPost[index]["Avatar"] = getAvatar(users, post.UserId))
    );

    // Lấy ra danh sách bình luận + tên từng người viết bình luận đó
    await listPost.map(
      (post, index) =>
        (listPost[index]["Comments"] = getComments(comments, post.PostId))
    );

    // lấy ra avatar của bình luận
    await listPost.map((post, index) => {
      listPost[index]["Comments"].map((comment, commentIndex) => {
        listPost[index]["Comments"][commentIndex]["Avatar"] = getAvatar(
          users,
          comment.UserId
        );
        listPost[index]["Comments"][commentIndex]["FullName"] = getFullName(
          users,
          comment.UserId
        );
      });
    });

    // lấy ra ds ảnh của các bài viết
    await listPost.map(
      (post, index) =>
        (listPost[index]["ListImage"] = getListImage(
          resultPostImage,
          resultImage,
          post.PostId
        ))
    );

    res.status(201).json({
      Status: true,
      Message: "Get data successed",
      ReturnData: {
        UserInfo: userInfo,
        ListPost: listPost,
        ListPeople: listPeople,
        TotalHeart: totalHeart,
      },
    });
  });
};
