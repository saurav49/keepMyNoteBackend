const express = require('express');
const router = express.Router();
const { Note } = require('../models/note.model');
const { sendError } = require('../utils');


const { saveNewNote, addNewNote, deleteNote, editNote } = require('../controllers/note.controller');

// add new note
router.route('/:userId')
.post(async (req, res) => {
  
  const note = req.body;
  const { userId } = req.params;

  const savedNewNote = await saveNewNote(res, note, userId);
  
  return res.status(201).json({
    success: true,
    savedNewNote,
  })
  
})
.get(async (req, res) => { // get all notes for a particular user
  
  try {
    const { userId } = req.params;

    const notes = await Note.find({ userId });

    res.status(200).json({
      success: true,
      notes,
    })
    
  } catch(error) {
    sendError(res, error.message)
  }

  
})

router.route('/deleteNote/:id')
.delete( async (req, res) => {  // delete a note

    const { id } = req.params;

    const deletedNote = await deleteNote(res, id);
  
    res.status(200).json({
      success: true,
      message: "note deleted successfully",
      deletedNote,
    })
})

router.route('/newNote')
.post( async(req, res) => {
  
  const note = req.body;
  const addedNewNote = await addNewNote(res, note);

  res.status(200).json({
    success: true,
    addedNewNote,
  })

})

router.route('/editNote/:id')
.post( async(req, res) => {  // edit note

  const { id } = req.params;
  const itemsToBeUpdated = req.body;

  const updatedNote = await editNote(res, id, itemsToBeUpdated);

  res.status(200).json({
      success: true,
      id,
      itemsToBeUpdated
    })
  
})




module.exports = router;
