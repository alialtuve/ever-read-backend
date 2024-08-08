const express = require('express');
const router = express.Router();
const {autho} = require('../middleware/authorization');
const {  ROL_SCR, WATCH } = require('../config/env');

const { getAllRols } = require('../controllers/rol.controller');

router.route('/')
.get(autho(ROL_SCR, WATCH),getAllRols);

module.exports = router;
