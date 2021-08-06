const knex = require("../../database/useDatabase.js");
const rootService = require("../rootServices");
const timer = require("../../configs/datetime.js");

const TABLE_NAME = "images";
/**
    CRUD table IMAGE
 **/

function GetImages() {
  return rootService.GetAll(TABLE_NAME);
}

function GetImageByID(imageId) {
  const condition = {
    column: "ImageId",
    value: imageId,
  };
  return rootService.GetById(TABLE_NAME, condition);
}

function CreateImage(data) {
  return rootService.Create(TABLE_NAME, {
    ...data,
    CreateAt: timer.timeNow(),
  });
}

function UpdateImage(imageId, data) {
  const condition = {
    column: "ImageId",
    value: imageId,
  };
  return rootService.UpdateById(TABLE_NAME, condition, {
    ...data,
    UpdateAt: timer.timeNow(),
  });
}

function DeleteImage(imageId) {
  const condition = {
    column: "ImageId",
    value: imageId,
  };
  return rootService.DeleteById(TABLE_NAME, condition);
}

module.exports = {
  GetImages,
  GetImageByID,
  CreateImage,
  UpdateImage,
  DeleteImage,
};
