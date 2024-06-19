const express = require('express');
const router = express.Router();

const { createGenre, getAllGenres, 
        getGenre, updateGenre, softDeleteGenre } = require('../controllers/genre.controller');

router.route('/')
.post(createGenre)
.get(getAllGenres);

router.route('/:id')
.get(getGenre)
.patch(updateGenre)
.delete(softDeleteGenre);

module.exports = router;
