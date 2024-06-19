const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const bookSchema = new mongoose.Schema(
  {
    title : {
      type: String,
      required: [true, 'Please provide book title'],
      maxlength: 150,
    },
    published: {
      type: String,
      required: false,
    },
    stock: {
      type: Number,
      required: [true, 'Please provide the total amount of this book']
    },
    available: {
      type: Number,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'Author',
      required: [true, 'Please provide author'],
    },
    genre: {
      type: mongoose.Types.ObjectId,
      ref: 'Genre',
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [false, 'Provide user'], // change to true
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: false,
    }
  }, {timestamps: true}
);

bookSchema.plugin(mongoose_delete, { deletedAt: true, overrideMethods: true});

module.exports = mongoose.model('Book', bookSchema);
