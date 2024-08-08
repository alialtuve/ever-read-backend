const express = require('express');
const router = express.Router();
const {autho} = require('../middleware/authorization');
const { GENRE_SCR, CREATE, DELETE, WATCH, EDIT } = require('../config/env');

const { createGenre, getAllGenres, 
        getGenre, updateGenre, softDeleteGenre } = require('../controllers/genre.controller');

router.route('/')
.post(autho(GENRE_SCR, CREATE), createGenre)
.get(autho(GENRE_SCR, WATCH), getAllGenres);

router.route('/:id')
.get(autho(GENRE_SCR, WATCH), getGenre)
.patch(autho(GENRE_SCR, EDIT), updateGenre)
.delete(autho(GENRE_SCR, DELETE), softDeleteGenre);

module.exports = router;
