const express = require('express');
const router = express.Router();
const {autho} = require('../middleware/authorization');
const { BOOK_SCR, CREATE, DELETE, WATCH, EDIT } = require('../config/env');

const { createBook, getAllBooks, 
        getBook, updateBook, 
        softDeleteBook } = require('../controllers/book.controller');

router.route('/')
.post(autho(BOOK_SCR, CREATE ),createBook)
.get(autho(BOOK_SCR, WATCH),getAllBooks);

router.route('/:id')
.get(autho(BOOK_SCR, WATCH),getBook)
.patch(autho(BOOK_SCR, EDIT),updateBook)
.delete(autho(BOOK_SCR, DELETE),softDeleteBook);

module.exports = router;
