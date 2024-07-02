const express = require('express');
const router = express.Router();

const { register, getUsers,
        softDelUser } = require('../controllers/auth.controller');

router.post('/register', register)
.get('/all', getUsers);

router.delete('/inactivate/:id', softDelUser);

module.exports = router;
