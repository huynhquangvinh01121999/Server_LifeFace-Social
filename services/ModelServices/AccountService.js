const knex = require("../../database/useDatabase.js");
const rootService = require("../rootServices");
const timer = require("../../configs/datetime.js");

/**
    CRUD table ACCOUNT
 **/

function GetAccounts() {
  return rootService.GetAll("accounts");
}

function GetAccountByUserName(userName) {
  const condition = {
    column: "UserName",
    value: userName,
  };
  return rootService.GetById("posts", condition);
}

function Auth(auth) {
  return knex("accounts")
    .where("UserName", auth.userName)
    .andWhere("PassWord", auth.passWord)
    .select("*");
}

function CreateAccount(data) {
  return rootService.Create("accounts", {
    ...data,
    CreateAt: timer.timeNow(),
  });
}

function UpdateAccount(userName, data) {
  const condition = {
    column: "UserName",
    value: userName,
  };
  
  return rootService.UpdateById("accounts", condition, {
    ...data,
    UpdateAt: timer.timeNow(),
  });
}

function DeleteAccount(userName) {
  const condition = {
    column: "UserName",
    value: userName,
  };
  return rootService.DeleteById("accounts", condition);
}

module.exports = {
  GetAccounts,
  GetAccountByUserName,
  Auth,
  CreateAccount,
  UpdateAccount,
  DeleteAccount,
};
