const express = require('express');
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV;
const config = require(`./config/config`)[env];

const app = express();

app.use(express.json());

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.PG_HOST,
      dialect: config.dialect,
      pool: {
        max: parseInt(process.env.PG_MAXCONN),
        min: 0,
        acquire: 60000,
        idle: 10000,
      },
    }
  );
  
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.log(`Unable to connect to the database: ${error.message}`);
    });

const user = require('./routes/user.route');

app.use("/api/user", user);

module.exports = app;