const { Note } = require('../models/note.model');
const { User } = require('../models/user.model');
const { sendError } = require('../utils');
var _ = require('lodash');

const saveNewNote = async (res, note, userId) => {

  try {

    const foundUser = await User.findOne({ _id: userId });

    if(!foundUser) {
      return res.json({
        success:false,
        message: 'User not present',
      })
    }

    const newNote = new Note(note);
    const savedNewNote = await newNote.save();

    return savedNewNote;
  } catch(error) {
    sendError(res, error.message);
  }
}

const addNewNote = async (res, note) => {

  try {
    const newNote = new Note(note);
    const saveAddedNote = await newNote.save();

    return saveAddedNote;
  } catch(error) {
    sendError(res, error.message);
  }
}

const deleteNote = async (res, id, userId) => {

  try {
    console.log({ id });
    const deletedNote = await Note.findByIdAndDelete(id);
    return deletedNote;
  } catch(error) {
    sendError(res, error.message)
  }
}

const editNote = async (res, id, itemsToBeEdited, userId) => {

  try {
    const notes = await Note.findByIdAndUpdate(id, itemsToBeEdited);
    return notes;
  } catch(error) {
    sendError(res, error.message);
  }

}

module.exports = { saveNewNote, addNewNote, deleteNote, editNote };