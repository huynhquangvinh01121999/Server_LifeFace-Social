const knex = require("../../database/useDatabase.js");
const rootService = require("../rootServices");
const timer = require("../../configs/datetime.js");

/**
    CRUD table POST
 **/

function GetPosts(offset) {
  return rootService
    .GetAll("posts")
    .orderBy("AutoId", "desc")
    .limit(10)
    .offset(offset);
}

function GetPostById(postId) {
  const condition = {
    column: "PostId",
    value: postId,
  };
  return rootService.GetById("posts", condition);
}

function GetPostAutoId(autoId) {
  const condition = {
    column: "AutoId",
    value: autoId,
  };
  return rootService.GetById("posts", condition);
}

function GetPosts_ByUserId(userId) {
  const condition = {
    column: "UserId",
    value: userId,
  };
  return rootService.GetById("posts", condition).orderBy("AutoId", "desc");
}

function GetPostById_orderby(userId, offset) {
  const condition = {
    column: "UserId",
    value: userId,
  };
  return rootService
    .GetById("posts", condition)
    .orderBy("AutoId", "desc")
    .limit(10)
    .offset(offset);
}

function CreatePost(data) {
  return rootService.Create("posts", {
    ...data,
    HeartCount: 0,
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

function UpdatePlusHeartCount(autoId) {
  return knex("posts").where("AutoId", autoId).increment("HeartCount", 1);
}

function UpdateMinusHeartCount(autoId) {
  return knex("posts").where("AutoId", autoId).decrement("HeartCount", 1);
}

function UpdatePlusCommentCount(autoId) {
  return knex("posts").where("AutoId", autoId).increment("CommentCount", 1);
}

function UpdateMinusCommentCount(autoId) {
  return knex("posts").where("AutoId", autoId).decrement("CommentCount", 1);
}

module.exports = {
  GetPosts,
  GetPostById,
  GetPostAutoId,
  GetPosts_ByUserId,
  GetPostById_orderby,
  CreatePost,
  UpdatePostById,
  UpdateStatusPost,
  DeletePostById,
  UpdatePlusHeartCount,
  UpdateMinusHeartCount,
  UpdatePlusCommentCount,
  UpdateMinusCommentCount,
};
