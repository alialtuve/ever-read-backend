const express = require('express');
const router = express.Router();

const { getUsers, softDelUser } = require('../controllers/user.controller');

router.get('/all', getUsers);

router.delete('/inactivate/:id', softDelUser);

module.exports = router;