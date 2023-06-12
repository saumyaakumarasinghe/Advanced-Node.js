const chalk = require("chalk");
const http = require("http");

const port = process.env.PORT || 9000;
const app = require("./app");

const server = http.createServer(app);

server.listen(port, () => {
  console.log(
    chalk.white.bgGreen.bold(" PORT ") +
      chalk.white.bgBlue.bold(` ${port} `) +
      chalk.white.bgGreen.bold(" MODE ") +
      chalk.white.bgRed.bold(` ${process.env.NODE_ENV} `)
  );
});

module.exports = server;