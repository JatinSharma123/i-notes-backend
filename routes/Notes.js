const express = require('express');
const fetchUser = require('../middlewares/auth.js');
const router = express.Router();
const Note = require("../models/Notes.js")

//Route 1: Get All the Notes which belong to the user
router.get("/getAllNotes", fetchUser, async (req, resp) => {

  try {

    const notes = await Note.find({ user: req.user.id });

    return resp.json({ "success": "true", notes })

  } catch (error) {
    return resp.status(500).json({ "success": "false", "message": "Internal Server Error!!!" });
  }

})



//Route2:Add a New Note in the database with post method adduser

router.post("/addNotes", fetchUser, async (req, resp) => {
  try {

    const { title, description, tag } = req.body;
    if (!title || !description) {

      return resp.status(400).json({ "success": "false", "message": "Title,Description Can't Be Empty " })
    }

    const note = new Note({ user: req.user.id, title, description, tag });

    const savedNote = await note.save();
    return resp.status(200).json({ "success": "true", "message": "add notes succesfully!!!" });

  } catch (error) {
    return resp.status(500).json({ "success": "false", "message": "Internal Server error while adding notes!!" });

  }


})

//Route 3 : Edit the note by put method 
router.put("/updateNote/:id", fetchUser, async (req, resp) => {
  try {

    const { title, description, tag } = req.body;
    let newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {

      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    //find the notes by id and update it 
    let note = await Note.findById(req.params.id);
    if (!note) {
      return resp.status(400).json({ "message": "No Note present!!!Id Is Not Correct!!" });

    }
    if (note.user.toString() !== req.user.id) {
      return resp.status(400).json({ "message": "Not Allowed!!Userid Not Match" });

    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

    return resp.json(note);


  } catch (error) {

    return resp.status(500).json({ "message": "Internal Server error while updating note!!!!" });

  }

})


//Route 4::Delete A note by /deleteNote and delete request

router.delete("/deleteNote/:id", fetchUser, async (req, resp) => {
  try {


    //find the notes by id and delete it 
    let note = await Note.findById(req.params.id);
    if (!note) {
      return resp.status(400).json({ "message": "No Note present!!!Id Is Not Correct!!" });

    }
    if (note.user.toString() !== req.user.id) {
      return resp.status(400).json({ "message": "Not Allowed!!Userid Not Match" });

    }

    note = await Note.findByIdAndDelete(req.params.id);

    return resp.json(note);


  } catch (error) {

    return resp.status(500).json({ "message": "Internal Server error while updating note!!!!" });

  }

})

module.exports = router;