const mongoose = require('mongoose');

const genreSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Provide user'],
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: false,
    }
  }, {timestamps:true}
);

module.exports = mongoose.model('Genre', genreSchema);
