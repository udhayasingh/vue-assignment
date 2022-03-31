const config = require("../config/config.json");
const Sequelize = require("sequelize");
const Op = require("sequelize").Op;

const host = config.database.host,
  database = config.database.database,
  userName = config.database.user,
  password = config.database.password;

const sequelize = new Sequelize(database, userName, password, {
  host: host,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error connecting database " + err));

module.exports = sequelize;
global.Sequelize = Sequelize;
global.Op = Op;
