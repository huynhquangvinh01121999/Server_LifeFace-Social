const knex = require("../../database/useDatabase.js");
const rootService = require("../rootServices");
const timer = require("../../configs/datetime.js");

const TABLE_NAME = "comments";
/**
    CRUD table COMMENT
 **/

function GetComments() {
  return rootService.GetAll(TABLE_NAME);
}

function GetCommentByPostId(postId) {
  const condition = {
    column: "PostId",
    value: postId,
  };
  return rootService.GetById(TABLE_NAME, condition);
}

function GetCommentByCommentParrentId(commentParrentId) {
  const condition = {
    column: "CommentParrentId",
    value: commentParrentId,
  };
  return rootService.GetById(TABLE_NAME, condition);
}

function CreateComment(data) {
  return rootService.Create(TABLE_NAME, {
    ...data,
    CreateAt: timer.timeNow(),
  });
}

function UpdateComment(commentId, data) {
  const condition = {
    column: "CommentId",
    value: commentId,
  };
  return rootService.UpdateById(TABLE_NAME, condition, {
    ...data,
    UpdateAt: timer.timeNow(),
  });
}

function DeleteComment(commentId) {
  const condition = {
    column: "CommentId",
    value: commentId,
  };
  return rootService.DeleteById(TABLE_NAME, condition);
}

function DeleteCommentByPostId(postId) {
  const condition = {
    column: "PostId",
    value: postId,
  };
  return rootService.DeleteById(TABLE_NAME, condition);
}

module.exports = {
  GetComments,
  GetCommentByPostId,
  GetCommentByCommentParrentId,
  CreateComment,
  UpdateComment,
  DeleteComment,
  DeleteCommentByPostId,
};
