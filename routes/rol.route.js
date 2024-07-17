const express = require('express');
const router = express.Router();

const { getAllRols } = require('../controllers/rol.controller');

router.route('/')
.get(getAllRols);

module.exports = router;
