const knex = require("../../database/useDatabase.js");
const rootService = require("../rootServices");
const timer = require("../../configs/datetime.js");

const TABLE_NAME = "statusposts";
/**
    CRUD table STATUS POST
 **/

function GetStatusPosts() {
  return rootService.GetAll(TABLE_NAME);
}

function GetStatusPostByID(statusPostId) {
  const condition = {
    column: "StatusPostId",
    value: statusPostId,
  };
  return rootService.GetById(TABLE_NAME, condition);
}

function CreateStatusPost(data) {
  return rootService.Create(TABLE_NAME, {
    ...data,
    CreateAt: timer.timeNow(),
  });
}

function UpdateStatusPost(statusPostId, data) {
  const condition = {
    column: "StatusPostId",
    value: statusPostId,
  };
  return rootService.UpdateById(TABLE_NAME, condition, {
    ...data,
    UpdateAt: timer.timeNow(),
  });
}

function DeleteStatusPost(statusPostId) {
  const condition = {
    column: "StatusPostId",
    value: statusPostId,
  };
  return rootService.DeleteById(TABLE_NAME, condition);
}

module.exports = {
  GetStatusPosts,
  GetStatusPostByID,
  CreateStatusPost,
  UpdateStatusPost,
  DeleteStatusPost,
};
