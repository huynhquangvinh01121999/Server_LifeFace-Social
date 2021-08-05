const knex = require("knex");

const connectData = knex({
  client: "sqlite3",
  connection: {
    filename: "./lifeface.sqlite3",
  },
  useNullAsDefault: true,
});

module.exports = connectData;
