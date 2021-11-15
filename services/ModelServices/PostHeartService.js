const knex = require("../../database/useDatabase.js");
const rootService = require("../rootServices");
const timer = require("../../configs/datetime.js");

const TABLE_NAME = "posthearts";
/**
    CRUD table FEEL
 **/

function GetAll() {
  return rootService.GetAll(TABLE_NAME);
}

function GetByID(userId) {
  const condition = {
    column: "UserId",
    value: userId,
  };
  return rootService.GetById(TABLE_NAME, condition);
}

function GetByAutoPostId(autoPostId) {
  const condition = {
    column: "AutoPostId",
    value: autoPostId,
  };
  return rootService.GetById(TABLE_NAME, condition);
}

function Create(data) {
  return rootService.Create(TABLE_NAME, {
    ...data,
    CreateAt: timer.timeNow(),
  });
}

function Delete(autoPostId, userId) {
  const condition = { AutoPostId: autoPostId, UserId: userId };
  return knex(TABLE_NAME).where(condition).del();
}

function CheckExits(autoPostId, userId) {
  const condition = { AutoPostId: autoPostId, UserId: userId };
  return knex(TABLE_NAME).where(condition).select("*");
}

module.exports = {
  GetAll,
  GetByID,
  GetByAutoPostId,
  Create,
  Delete,
  CheckExits,
};
