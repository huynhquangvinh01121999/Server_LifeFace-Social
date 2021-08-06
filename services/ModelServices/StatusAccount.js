const knex = require("../../database/useDatabase.js");
const rootService = require("../rootServices");
const timer = require("../../configs/datetime.js");

const TABLE_NAME = "statusaccounts";
/**
    CRUD table STATUS ACCOUNT
 **/

function GetStatusAccounts() {
  return rootService.GetAll(TABLE_NAME);
}

function GetStatusAccountByID(statusAccountId) {
  const condition = {
    column: "StatusAccountId",
    value: statusAccountId,
  };
  return rootService.GetById(TABLE_NAME, condition);
}

function CreateStatusAccount(data) {
  return rootService.Create(TABLE_NAME, {
    ...data,
    CreateAt: timer.timeNow(),
  });
}

function UpdateStatusAccount(statusAccountId, data) {
  const condition = {
    column: "StatusAccountId",
    value: statusAccountId,
  };
  return rootService.UpdateById(TABLE_NAME, condition, {
    ...data,
    UpdateAt: timer.timeNow(),
  });
}

function DeleteStatusAccount(statusAccountId) {
  const condition = {
    column: "StatusAccountId",
    value: statusAccountId,
  };
  return rootService.DeleteById(TABLE_NAME, condition);
}

module.exports = {
  GetStatusAccounts,
  GetStatusAccountByID,
  CreateStatusAccount,
  UpdateStatusAccount,
  DeleteStatusAccount,
};
