const Lend = require('../models/lend.model');
const Book = require('../models/book.model');
const User = require('../models/user.model');
const Author = require('../models/author.model');

const createLend = async(req, res) => {
  /* add funtionality of rest one on book availability on Book model
     and validate not to rest more than book stock */  
  const lend = await Lend.create(req.body);
  res.status(201).json({ lend });
}

const getAllLend = async(req, res) => {
  const lend = await Lend.find({'status':false})
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
                .where('status').equals(false)
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
  const {
    params: {id:lendId}
  } = req;

  const lend = await Lend.findByIdAndUpdate(
                      { _id:lendId },
                      { $set: {
                          status: true
                        }
                      },
                      { new:true }
                     );

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
