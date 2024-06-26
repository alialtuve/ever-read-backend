const express = require('express');
const router = express.Router();

const { createLend, getAllLend,
        getLend, updateLend, getBooksByUser } = require('../controllers/lend.controller');

router.route('/')
.post(createLend)
.get(getAllLend);

router.route('/:id')
.get(getLend)
.patch(updateLend);

router.route('/byuser/:id')
.get(getBooksByUser);

module.exports = router;
