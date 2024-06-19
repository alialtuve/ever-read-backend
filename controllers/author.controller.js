const Author = require('../models/author.model');

const createAuthor = async(req, res) => {
  const author = await Author.create(req.body);
  res.status(201).json({author});
}

const getAllAuthors = async(req, res) => {
  const authors = await Author.find().sort('name');
  res.status(200).json({ authors, total: authors.length });
}

const getAuthor = async(req, res) => {
  const {
    params: {id: authorId}
  } = req;
  const author = await Author.findById({_id:authorId});
  res.status(200).json({ author });
}

const updateAuthor = async(req, res) => {
  const {
    params: { id: authorId}
  } = req;
  const author = await Author.findByIdAndUpdate(
    { _id:authorId },
    req.body,
    { new:true }
  );
  res.status(200).json({ author });
}

const softDeleteAuthor = async(req, res) => {
  const { 
    params: { id:authorId} 
  } = req;
  const author = await Author.deleteById({ _id:authorId});
  res.status(200).json({ msg:'author was disabled!'});
}

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthor,
  updateAuthor,
  softDeleteAuthor
}