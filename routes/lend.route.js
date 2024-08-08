const express = require('express');
const router = express.Router();
const {autho} = require('../middleware/authorization');
const { LEND_SCR, CREATE, WATCH, EDIT } = require('../config/env');

const { createLend, getAllLend,
        getLend, updateLend, getBooksByUser } = require('../controllers/lend.controller');

router.route('/')
.post(autho(LEND_SCR, CREATE), createLend)
.get(autho(LEND_SCR, WATCH), getAllLend);

router.route('/:id')
.get(autho(LEND_SCR, WATCH), getLend)
.patch(autho(LEND_SCR, EDIT), updateLend);

router.route('/byuser/:id')
.get(autho(LEND_SCR, WATCH), getBooksByUser);

module.exports = router;
