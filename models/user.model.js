const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      minlength: 5,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      index:{unique: true}
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'Please provide password'],
      minlength: 6,
      maxlength: 25,
    },
    role: {
      type: String,
      enum: ['admin', 'librarian', 'reader', 'visitor'],
      default: 'visitor',
    },
    active:{
      type:Boolean,
      default: true,
    }
  }, {timestamps:true}
);

module.exports = mongoose.model('User', userSchema);
