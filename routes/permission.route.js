const express = require('express');
const router = express.Router();
const { autho } = require('../middleware/authorization');
const { PERM_SRC, WATCH } = require('../config/env');

const { getPermission } = require('../controllers/permission.controller');

router.route('/:id')
.get(autho(PERM_SRC, WATCH), getPermission);

module.exports = router;
