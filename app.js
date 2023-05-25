const express = require('express');

const port = 3000;
const app = express();

app.use(express.json());

const user = require('./routes/user.route');

app.use("/api/user", user);

app.listen(port, () => console.log(`App listening on port ${port}`));

module.exports = app;