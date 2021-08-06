const knex = require("../../database/useDatabase.js");
const rootService = require("../rootServices");
const timer = require("../../configs/datetime.js");

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

function GetPosts_ByUserId(userId) {
  const condition = {
    column: "UserId",
    value: userId,
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

function UpdateStatusPost(postId, statusPostId) {
  return knex("posts").where("PostId", postId).update({
    StatusPostId: statusPostId,
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
  GetPosts_ByUserId,
  CreatePost,
  UpdatePostById,
  UpdateStatusPost,
  DeletePostById,
};
