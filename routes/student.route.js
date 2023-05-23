const express = require("express");

const router = express.Router();
const controller = require('../controllers/student.controller');

router.get('/', controller.read);

module.exports =  router;