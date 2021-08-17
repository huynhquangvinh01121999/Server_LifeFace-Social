const knex = require("../../database/useDatabase.js");
const rootService = require("../rootServices");
const timer = require("../../configs/datetime.js");

const TABLE_NAME = "accounts";
/**
    CRUD table ACCOUNT
 **/
function GetAccounts() {
  return rootService.GetAll(TABLE_NAME);
}

function GetAccountByUserName(userName) {
  const condition = {
    column: "UserName",
    value: userName,
  };
  return rootService.GetById(TABLE_NAME, condition);
}

function Auth(auth) {
  return knex(TABLE_NAME)
    .where("UserName", auth.userName)
    .andWhere("PassWord", auth.passWord)
    .select("*");
}

function CheckExistUserName(UserName) {
  return knex(TABLE_NAME).where("UserName", UserName).select("*");
}
function CheckExistEmail(Email) {
  return knex(TABLE_NAME).where("Email", Email).select("*");
}

function CreateAccount(data) {
  return rootService.Create(TABLE_NAME, {
    ...data,
    CreateAt: timer.timeNow(),
  });
}

function UpdateAccount(userName, data) {
  const condition = {
    column: "UserName",
    value: userName,
  };

  return rootService.UpdateById(TABLE_NAME, condition, {
    ...data,
    UpdateAt: timer.timeNow(),
  });
}

function DeleteAccount(userName) {
  const condition = {
    column: "UserName",
    value: userName,
  };
  return rootService.DeleteById(TABLE_NAME, condition);
}

module.exports = {
  GetAccounts,
  GetAccountByUserName,
  Auth,
  CheckExistUserName,
  CheckExistEmail,
  CreateAccount,
  UpdateAccount,
  DeleteAccount,
};
