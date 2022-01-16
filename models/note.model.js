const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
  
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  title: {
    type: String,
    trim: true,
    required: 'Title is Required',    
  },

  body: {
    type: String,
    trim: true,
    required: 'Body is Required', 
  },

  color: {
    type: String,
    trim: true,
  },

  isPin: {
    type: Boolean
  },

  tag: {
    type: String,
    trim: true,
  }
  
}, { versionKey: false }, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

module.exports = { Note };
