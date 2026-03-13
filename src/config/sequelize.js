import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "Database.sqlite",
  logging: false
});

export default sequelize;