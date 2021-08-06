const knex = require("../../database/useDatabase.js");
const rootService = require("../rootServices");
const timer = require("../../configs/datetime.js");

/**
    CRUD table USER
 **/

function GetUsers() {
  return rootService.GetAll("users");
}

function GetUserByUserId(userId) {
  const condition = {
    column: "UserId",
    value: userId,
  };
  return rootService.GetById("users", condition);
}

function CreateUser(data) {
  return rootService.Create("users", {
    ...data,
    CreateAt: timer.timeNow(),
  });
}

function UpdateUser(userId, data) {
  const condition = {
    column: "UserId",
    value: userId,
  };
  return rootService.UpdateById("users", condition, {
    ...data,
    UpdateAt: timer.timeNow(),
  });
}

function DeleteUser(userId) {
  const condition = {
    column: "UserId",
    value: userId,
  };
  return rootService.DeleteById("users", condition);
}

module.exports = {
  GetUsers,
  GetUserByUserId,
  CreateUser,
  UpdateUser,
  DeleteUser,
};
