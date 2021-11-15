const knex = require("../../database/useDatabase.js");
const rootService = require("../rootServices");
const timer = require("../../configs/datetime.js");

/**
    CRUD table USER
 **/

function GetUsers() {
  return rootService.GetAll("users");
}

function GetUser_NotMe(userName) {
  return knex("users").whereNot("UserName", userName).select("*");
}

function GetUserByUserId(userId) {
  const condition = {
    column: "UserId",
    value: userId,
  };
  return rootService.GetById("users", condition);
}

function GetUserByUserName(userName) {
  const condition = {
    column: "UserName",
    value: userName,
  };
  return rootService.GetById("users", condition);
  // return knex("users")
  //   .where("UserName", userName)
  //   .select("UserId", "FirstName", "MiddleName", "LastName");
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
  GetUser_NotMe,
  GetUserByUserId,
  GetUserByUserName,
  CreateUser,
  UpdateUser,
  DeleteUser,
};
