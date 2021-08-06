const knex = require("../../database/useDatabase.js");
const rootService = require("../rootServices");
const timer = require("../../configs/datetime.js");

const TABLE_NAME = "posttags";
/**
    CRUD table POST TAG
 **/

function GetPostTags() {
  return rootService.GetAll(TABLE_NAME);
}

function GetPostTagByPostId(postId) {
  const condition = {
    column: "PostId",
    value: postId,
  };
  return rootService.GetById(TABLE_NAME, condition);
}

function GetPostTagByUserId(userId) {
  const condition = {
    column: "UserId",
    value: userId,
  };
  return rootService.GetById(TABLE_NAME, condition);
}

function CreatePostTag(data) {
  return rootService.Create(TABLE_NAME, {
    ...data,
    CreateAt: timer.timeNow(),
  });
}

function UpdatePostTagByPostId(postId, data) {
  const condition = {
    column: "PostId",
    value: postId,
  };
  return rootService.UpdateById(TABLE_NAME, condition, {
    ...data,
    UpdateAt: timer.timeNow(),
  });
}

function DeletePostTags(postId) {
  const condition = {
    column: "PostId",
    value: postId,
  };
  return rootService.DeleteById(TABLE_NAME, condition);
}

function DeletePostTag(postId, userId) {
  return knex(TABLE_NAME)
    .where("PostId", postId)
    .andWhere("UserId", userId)
    .del();
}

module.exports = {
  GetPostTags,
  GetPostTagByPostId,
  GetPostTagByUserId,
  CreatePostTag,
  UpdatePostTagByPostId,
  DeletePostTags,
  DeletePostTag,
};
