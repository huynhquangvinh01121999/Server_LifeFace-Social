const knex = require("../../database/useDatabase.js");
const rootService = require("../rootServices");
const timer = require("../../configs/datetime.js");

const TABLE_NAME = "feels";
/**
    CRUD table FEEL
 **/

function GetFeels() {
  return rootService.GetAll(TABLE_NAME);
}

function GetFeelByID(feelId) {
  const condition = {
    column: "FeelId",
    value: feelId,
  };
  return rootService.GetById(TABLE_NAME, condition);
}

function CreateFeel(data) {
  return rootService.Create(TABLE_NAME, {
    ...data,
    CreateAt: timer.timeNow(),
  });
}

function UpdateFeel(feelId, data) {
  const condition = {
    column: "FeelId",
    value: feelId,
  };
  return rootService.UpdateById(TABLE_NAME, condition, {
    ...data,
    UpdateAt: timer.timeNow(),
  });
}

function DeleteFeel(feelId) {
  const condition = {
    column: "FeelId",
    value: feelId,
  };
  return rootService.DeleteById(TABLE_NAME, condition);
}

module.exports = {
  GetFeels,
  GetFeelByID,
  CreateFeel,
  UpdateFeel,
  DeleteFeel,
};
