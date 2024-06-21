const express = require('express');
const router = express.Router();

const { createLend, getAllLend,
        getLend } = require('../controllers/lend.controller');

router.route('/')
.post(createLend)
.get(getAllLend);

router.route('/:id')
.get(getLend);

module.exports = router;
