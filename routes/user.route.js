const express = require('express');
const router = express.Router();
const {autho} = require('../middleware/authorization');
const { USER_SCR, CREATE, DELETE, WATCH, EDIT } = require('../config/env');

const { getUsers, softDelUser, getCurrentUser } = require('../controllers/user.controller');

router.get('/all', autho(USER_SCR, WATCH), getUsers);

router.get('/current-user', autho(USER_SCR, WATCH), getCurrentUser );

router.delete('/inactivate/:id', autho(USER_SCR, DELETE), softDelUser);

module.exports = router;
