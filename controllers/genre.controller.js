const Genre = require ('../models/genre.model');

const createGenre = async(req, res) => {
  const genre = await Genre.create(req.body);
  res.status(201).json({genre});
}

const getAllGenres = async(req, res) => {
  const genres = await Genre.find().sort('name');
  res.status(200).json({ genres, total: genres.length });
}

const getGenre = async(req, res) => {
  const {
    params: {id:genreId}
  } = req;
  const genre = await Genre.findOne({_id:genreId});
  
  res.status(200).json({genre});
}

const updateGenre = async(req, res) => {
  const {
    body: { name, active },
    params: { id:genreId }
  } = req;

  const genre =  await Genre.findByIdAndUpdate (
                            {_id:genreId},
                            req.body,
                            {new:true}
                        );

  res.status(200).json({ genre });
}

/* Hard deletion */
const deleteGenre = async(req, res) => {
  const {
    params: { id:genreId }
  } = req;
  const genre = await Genre.findByIdAndDelete({ _id:genreId });

  res.status(200).send({msg: 'genre deleted'});
}

/* Soft deletion */
const softDeleteGenre = async(req, res) => {
   const {
      params: { id:genreId }
    } = req;

   const genre = await Genre.deleteById({ _id:genreId });
  
   res.status(200).send({msg: 'genre was disabled!'});
}

module.exports = { 
  createGenre,
  getAllGenres,
  getGenre,
  updateGenre,
  deleteGenre,
  softDeleteGenre
}
