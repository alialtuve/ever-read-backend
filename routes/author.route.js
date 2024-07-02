const express = require('express');
const router = express.Router();

const { createAuthor, getAllAuthors,
        getAuthor, updateAuthor,
        softDeleteAuthor } = require('../controllers/author.controller');

router.route('/')
.post(createAuthor)
.get(getAllAuthors);

router.route('/:id')
.get(getAuthor)
.patch(updateAuthor)
.delete(softDeleteAuthor);

module.exports = router;
