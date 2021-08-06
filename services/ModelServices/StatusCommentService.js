const knex = require("../../database/useDatabase.js");
const rootService = require("../rootServices");
const timer = require("../../configs/datetime.js");

const TABLE_NAME = "statuscomments";
/**
    CRUD table STATUS COMMENT
 **/

function GetStatusComments() {
  return rootService.GetAll(TABLE_NAME);
}

function GetStatusCommentByID(statusCommentId) {
  const condition = {
    column: "StatusCommentId",
    value: statusCommentId,
  };
  return rootService.GetById(TABLE_NAME, condition);
}

function CreateStatusComment(data) {
  return rootService.Create(TABLE_NAME, {
    ...data,
    CreateAt: timer.timeNow(),
  });
}

function UpdateStatusComment(statusCommentId, data) {
  const condition = {
    column: "StatusCommentId",
    value: statusCommentId,
  };
  return rootService.UpdateById(TABLE_NAME, condition, {
    ...data,
    UpdateAt: timer.timeNow(),
  });
}

function DeleteStatusComment(statusCommentId) {
  const condition = {
    column: "StatusCommentId",
    value: statusCommentId,
  };
  return rootService.DeleteById(TABLE_NAME, condition);
}

module.exports = {
  GetStatusComments,
  GetStatusCommentByID,
  CreateStatusComment,
  UpdateStatusComment,
  DeleteStatusComment,
};
