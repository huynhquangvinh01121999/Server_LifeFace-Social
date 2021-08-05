const knex = require("../database/useDatabase");

function GetAll(table) {
  return knex(table).select("*");
}

function GetById(table, condition) {
  return knex(table).where(condition.column, condition.value).select("*");
}

function Create(table, data) {
  return knex(table).insert(data);
}

function UpdateById(table, condition, data) {
  return knex(table).where(condition.column, condition.value).update(data);
}

function DeleteById(table, condition) {
  return knex(table).where(condition.column, condition.value).del();
}

module.exports = {
  GetAll,
  GetById,
  Create,
  UpdateById,
  DeleteById,
};
