const mongoose = require('mongoose');
const {Schema, Types, model } = mongoose;

const permissionSchema = Schema(
    {
      screen_name: {
        type: String,
        required: true,
      },
      screen_code: {
        type: String,
        required: true,
      },
      can_create: {
        type: Boolean,
        required: true,
        default: false,
      },
      can_edit: {
        type: Boolean,
        required: true,
        default: false,
      },
      can_delete: {
        type: Boolean,
        required: true,
        default: false,
      },
      can_watch: {
        type: Boolean,
        required: true,
        default: false,
      },
      rol : {
        type: Types.ObjectId,
        ref: 'Rol',
        required: true
      }
    }, { timestamps:true, versionKey:false }
  );

  module.exports = new model('Permission', permissionSchema);
