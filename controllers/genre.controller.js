const Genre = require ('../models/genre.model');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');

const createGenre = async(req, res) => {
  const {
    user: { userId}
  } = req;
  req.body.createdBy = userId;
  const genre = await Genre.create(req.body);
  res.status(StatusCodes.CREATED).json({genre});
}

const getAllGenres = async(req, res) => {
  const genres = await Genre.find().sort('name');
  res.status(StatusCodes.OK).json({ genres, total: genres.length });
}

const getGenre = async(req, res) => {
  const {
    params: {id:genreId}
  } = req;
  const genre = await Genre.findOne({_id:genreId});

  if(!genre){
    throw new NotFoundError(`No genre with id: ${genreId}, was found`)
  }
  
  res.status(StatusCodes.OK).json({genre});
}

const updateGenre = async(req, res) => {
  const {
    body: { name },
    params: { id:genreId },
    user: { userId }
  } = req;
  req.body.updatedBy = userId;

  if(name =='' || !name){
    throw new BadRequestError('Genre name can not be empty');
  }
  const genre =  await Genre.findByIdAndUpdate (
                            {_id:genreId},
                            req.body,
                            {new:true}
                        ); 
  
  res.status(StatusCodes.OK).json({ genre });
}

/* Hard deletion */
const deleteGenre = async(req, res) => {
  const {
    params: { id:genreId }
  } = req;
  const genre = await Genre.findByIdAndDelete({ _id:genreId });

  res.status(StatusCodes.OK).send({msg: 'genre deleted'});
}

/* Soft deletion */
const softDeleteGenre = async(req, res) => {
   const {
      params: { id:genreId },
      user: { userId }
    } = req;

   const genre = await Genre.deleteById({ _id:genreId }, userId);
 
   res.status(StatusCodes.OK).send({msg: 'genre was disabled!'});
}

module.exports = { 
  createGenre,
  getAllGenres,
  getGenre,
  updateGenre,
  deleteGenre,
  softDeleteGenre
}
