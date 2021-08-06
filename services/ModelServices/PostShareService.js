const knex = require("../../database/useDatabase.js");
const rootService = require("../rootServices");
const timer = require("../../configs/datetime.js");

/**
    CRUD table POSTSHARE
 **/

function GetPostShares() {
  return rootService.GetAll("postshares");
}

function GetPostShareByPostId(postId) {
  const condition = {
    column: "PostId",
    value: postId,
  };
  return rootService.GetById("postshares", condition);
}

function GetPostShare_ByUserId(userId) {
  const condition = {
    column: "UserId",
    value: userId,
  };
  return rootService.GetById("postshares", condition);
}

function CreatePostShare(data) {
  return rootService.Create("postshares", {
    ...data,
    CreateAt: timer.timeNow(),
  });
}

function UpdatePostShare(postId, userId, data) {
  return knex("postshares")
    .where("PostId", postId)
    .andWhere("UserId", userId)
    .update({
      ...data,
      UpdateAt: timer.timeNow(),
    });
}

function UpdateStatusPostShare(postId, userId, statusPostId) {
  return knex("posts")
    .where("PostId", postId)
    .andWhere("UserId", userId)
    .update({
      StatusPostId: statusPostId,
    });
}

function DeletePostShare(postId, userId) {
  return knex("postshares")
    .where("PostId", postId)
    .andWhere("UserId", userId)
    .del();
}

module.exports = {
  GetPostShares,
  GetPostShareByPostId,
  GetPostShare_ByUserId,
  CreatePostShare,
  UpdatePostShare,
  UpdateStatusPostShare,
  DeletePostShare,
};
