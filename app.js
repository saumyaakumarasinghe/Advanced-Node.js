const express = require('express');

const app = express();
const PORT = 3000;

const student = require('./routes/student.route');

app.use("/api/student", student);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

module.exports = app;