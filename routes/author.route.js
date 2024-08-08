const express = require('express');
const router = express.Router();
const {autho} = require('../middleware/authorization');
const { AUTHOR_SCR, CREATE, DELETE, WATCH, EDIT } = require('../config/env');

const { createAuthor, getAllAuthors,
        getAuthor, updateAuthor,
        softDeleteAuthor } = require('../controllers/author.controller');

router.route('/')
.post(autho(AUTHOR_SCR, CREATE), createAuthor)
.get(autho(AUTHOR_SCR, WATCH), getAllAuthors);

router.route('/:id')
.get(autho(AUTHOR_SCR, WATCH), getAuthor)
.patch(autho(AUTHOR_SCR, EDIT), updateAuthor)
.delete(autho(AUTHOR_SCR, DELETE), softDeleteAuthor);

module.exports = router;
