const knex = require("../../database/useDatabase.js");
const rootService = require("../rootServices");
const timer = require("../../configs/datetime.js");

const TABLE_NAME = "postimages";
/**
    CRUD table POST IMAGE
 **/

function GetPostImages() {
  return rootService.GetAll(TABLE_NAME);
}

function GetPostImageByPostId(postId) {
  const condition = {
    column: "PostId",
    value: postId,
  };
  return rootService.GetById(TABLE_NAME, condition);
}

function CreatePostImage(data) {
  return rootService.Create(TABLE_NAME, {
    ...data,
    CreateAt: timer.timeNow(),
  });
}

function UpdatePostImage(postId, imageId, data) {
  return knex("postimages")
    .where("PostId", postId)
    .andWhere("ImageId", imageId)
    .update({ ...data, UpdateAt: timer.timeNow() });
}

function DeletePostImage(postId) {
  const condition = {
    column: "PostId",
    value: postId,
  };
  return rootService.DeleteById(TABLE_NAME, condition);
}

module.exports = {
  GetPostImages,
  GetPostImageByPostId,
  CreatePostImage,
  UpdatePostImage,
  DeletePostImage,
};
