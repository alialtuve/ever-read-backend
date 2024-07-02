const Lend = require('../models/lend.model');
const Book = require('../models/book.model');
const User = require('../models/user.model');
const Author = require('../models/author.model');
const { checkAvalability, checkIsLended } = require('../middleware/availability');


const createLend = async(req, res) => {
  let availability;
  let isLended;

  const {book,user} = req.body;

  isLended = await checkIsLended(book, user);
  availability = await checkAvalability(book);

  if(isLended!=0){
    throw new Error('This user has borrowed this book!');/** This must change after implementing handle errors middleware**/
  }

  if(availability == -1) {
    throw new Error('This book is not available!');/** This must change after implementing handle errors middleware**/
  }

  const lend = await Lend.create(req.body);

  if(lend) {
    
    const returnBook = await Book.updateOne(
      {_id: book}, 
      {
        $inc: { borrowed: 1}
      }
    );
  }

  res.status(201).json({ lend });
}

const getAllLend = async(req, res) => {
  const lend = await Lend.find({'returned':false})
                .populate({ 
                  path:'book', 
                  model:Book, 
                  select:'title',
                  populate:{
                    path: 'author',
                    model: Author,
                    select: 'name'
                  }
                })
                .populate({ 
                  path:'user', 
                  model:User, 
                  select: { 'name':1, 'email':1 }
                });

  res.status(200).json({ lend, total: lend.length });
}

const getLend = async(req, res) => {
  const {
    params: {id:lendId}
  } = req;
  const lend = await Lend.findById({_id:lendId})
                .where('returned').equals(false)
                .populate({ 
                  path: 'book', 
                  model: Book,
                  select: 'title',
                  populate:{
                    path: 'author',
                    model: Author,
                    select: 'name'
                  }
                 })
                .populate({ 
                  path: 'user', 
                  model: User,
                  select: { 'name':1, 'email':1 }
                });

  res.status(200).json({ lend });
}

const updateLend = async(req, res) => {

  let availability;
  const {
    params: {id:lendId}
  } = req;

  const lend = await Lend.findByIdAndUpdate(
    { _id:lendId },
    { $set: {
      returned: true
    }
  },
  { new:true }
  );
  
  if(lend) {

    availability = await checkAvalability(lend.book);
    
    if(availability == 0) {
      throw new Error('No loan updated!');/* This must change after implementing handle errors middleware**/
    }

    const returnBook = await Book.updateOne(
      { _id: lend.book}, 
      { $inc: { borrowed: -1} }
      );
  }
  res.status(200).json({ lend });
}

const  getBooksByUser = async(req,res) => {

  const {
    params: {id:userId}
  } = req;

   const lend = await Lend.find({user:userId})
            .populate({ 
              path: 'book', 
              model: Book,
              select: 'title',
              populate:{
                path: 'author',
                model: Author,
                select: 'name'
              }
            })
            .populate({ 
              path: 'user', 
              model: User,
              select: { 'name':1, 'email':1 }
            });

    res.status(200).json({ lend })
}

module.exports = {
  createLend,
  getAllLend,
  getLend,
  updateLend,
  getBooksByUser
}
