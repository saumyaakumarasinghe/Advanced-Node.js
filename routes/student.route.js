const { Router } = require("express");
const controller = require('../controllers/student.controller');

const router = Router();

router.get('/', controller.read);

module.exports =  router;