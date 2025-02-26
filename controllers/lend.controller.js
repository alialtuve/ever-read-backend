const {ObjectId} = require('mongoose').Types;
const Lend = require('../models/lend.model');
const Book = require('../models/book.model');
const User = require('../models/user.model');
const Author = require('../models/author.model');
const { checkAvalability, checkIsLended } = require('../middleware/availability');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');

const createLend = async(req, res) => {
  let availability;
  let isLended;

  const {book, user} = req.body;
    
  isLended = await checkIsLended(book, user);
  availability = await checkAvalability(book);
  
  if(isLended!=0){
    throw new BadRequestError('This user has already borrowed this book!');
  }
  
  if(availability == -1) {
    throw new BadRequestError('This book is not available!');
  }
  
  req.body.createdBy = req.user.userId;
  
  const lend = await Lend.create(req.body);

  if(lend) {
    const returnBook = await Book.updateOne(
      {_id: book}, 
      {
        $inc: { borrowed: 1}
      }
    );
  }

  res.status(StatusCodes.CREATED).json({ lend });
}

const getAllLend = async(req, res) => {
  
  const { title, user  } = req.query;  
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page -1 ) * limit;  
  
  let lend = ''
  let searchOptions = {};
  let total=0;

  if(user) {
    searchOptions = { 'user.name': {$regex: user}}
  }

  if(title) {
    searchOptions = { 'book.title': {$regex: title}}
  }  

  if(user || title ){
    
    lend = await Lend.aggregate([
        {
          $lookup:{
            from:'books',
            localField:'book',
            foreignField:'_id',
            as:'book',
            pipeline:[
              {
                $lookup:{
                  from: 'authors',
                  localField:'author',
                  foreignField:'_id',
                  as:'author'
                }
              }
            ]
          }
        },
        {
          $lookup:{
            from:'users',
            localField:'user',
            foreignField:'_id',
            as:'user'
          }
        },
        {
          $set:
          {
            user:{
              $map:{
                input:'$user',
                in:{_id:'$$this._id', name:'$$this.name', lastName:'$$this.lastName', email:'$$this.email'}
              }
            },
            book:{
              $map:{
                input:'$book',
                in:{
                  _id:'$$this._id', 
                  title:'$$this.title',
                  author: {
                    _id:'$$this.author._id',
                    name: '$$this.author.name'
                  }
                }
              },
            }
          }
        },
        { $unwind:"$book"},
        { $unwind:"$user"},
        { $unwind: "$book.author._id"},
        { $unwind: "$book.author.name"},
        { $match:{'returned': false}},
        { $match: searchOptions},
        { $skip: skip},
        { $limit: limit}
      ]) 

      
  } else {
    
    lend = await Lend.find({'returned': false})
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
                  select: { 'name':1,'lastName':1, 'email':1 }
                })
                .skip(skip)
                .limit(limit)

    }

  total = await Lend.countDocuments({'returned': false});
  const numOfPages = Math.ceil(total/limit);
  
  res.status(StatusCodes.OK).json({ lend, total, numOfPages, currentPage: page });
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

  res.status(StatusCodes.OK).json({ lend });
}

const updateLend = async(req, res) => {
  
  let availability;
  
  const {
    params: {id:lendId},
    user: { userId }
  } = req;
  
  const lend = await Lend.findByIdAndUpdate(
    { _id: ObjectId.createFromHexString(lendId) },
    { $set: {
        returned: true,
        updatedBy: userId
      }
    },
    { new:true }
  );
  
  if(lend) {
    availability = await checkAvalability(lend.book);

    if(availability === 0){
      throw new BadRequestError('Field borrowed can not be negative!')
    }
    const returnBook = await Book.updateOne(
      { _id: lend.book},  
      { $inc: { borrowed: -1 } }
    );
  }
  res.status(StatusCodes.OK).json({ lend });
}

const  getBooksByUser = async(req,res) => {
  let result;
  const {returned} = req.query;

  const {
    params: {id:userId}
  } = req;

  /* This is for find returned, no returned or both books by user */
  if(returned){
    result = Lend.find({user:userId, returned});
  } else {
    result = Lend.find({user:userId});
  }

  const lend = await result
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

  res.status(StatusCodes.OK).json({ lend })
}

module.exports = {
  createLend,
  getAllLend,
  getLend,
  updateLend,
  getBooksByUser
}
