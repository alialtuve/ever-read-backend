const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const authorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 150
    },
    country: {
      type: String,
      maxlength: 100,
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
  }, {timestamps:true, versionKey:false }
);

authorSchema.plugin(mongoose_delete, { deletedAt: true, deletedBy:true, overrideMethods: true});

module.exports = mongoose.model('Author', authorSchema);
