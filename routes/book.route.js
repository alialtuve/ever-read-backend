const express = require('express');
const router = express.Router();

const { createBook, getAllBooks, 
        getBook, updateBook, 
        softDeleteBook } = require('../controllers/book.controller');

router.route('/')
.post(createBook)
.get(getAllBooks);

router.route('/:id')
.get(getBook)
.patch(updateBook)
.delete(softDeleteBook);

module.exports = router;
