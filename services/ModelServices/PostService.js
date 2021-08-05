const knex = requrie("../../database/useDatabase.js");
const rootService = require("../rootServices");
const timer = requrie("../../configs/datetime.js");

/**
    CRUD table POST
 **/

function GetPosts() {
  return rootService.GetAll("posts");
}

function GetPostById(postId) {
  const condition = {
    column: "PostId",
    value: postId,
  };
  return rootService.GetById("posts", condition);
}

function CreatePost(data) {
  return rootService.Create("posts", {
    ...data,
    CreateAt: timer.timeNow(),
  });
}

function UpdatePostById(postId, data) {
  const condition = {
    column: "PostId",
    value: postId,
  };
  return rootService.UpdateById("posts", condition, {
    ...data,
    UpdateAt: timer.timeNow(),
  });
}

function DeletePostById(postId) {
  const condition = {
    column: "PostId",
    value: postId,
  };
  return rootService.DeleteById("post", condition);
}

module.exports = {
  GetPosts,
  GetPostById,
  CreatePost,
  UpdatePostById,
  DeletePostById,
};
