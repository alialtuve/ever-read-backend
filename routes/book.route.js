const express = require('express');
const router = express.Router();

const { createBook, getAllBooks, 
        getBook, updateBook, 
        softDelteBook } = require('../controllers/book.controller');

router.route('/')
.post(createBook)
.get(getAllBooks);

router.route('/:id')
.get(getBook)
.patch(updateBook)
.delete(softDelteBook);

module.exports = router;
