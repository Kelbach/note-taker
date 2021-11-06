//Requires
const router = require('express').Router();
const notes = require('../db/db.json');
const { v4:uuidv4 } = require('uuid');
const {validateNote,createNewNote,deleteNote} = require('../lib/note');



// GET "/api/notes" responds with all notes from the database
router.get('/notes', (req, res) => {
    let results = notes;
    // console.log(results);
    res.json(results);
});

// Post "/api/notes" responds with adding a note to database
router.post('/notes', (req, res) => {
    req.body.id = uuidv4();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

// DELETE "/api/notes" deletes the note with an id equal to req.params.id
router.delete('/notes/:id' , (req, res) => {
    let id = req.params.id
    // console.log(id);
    if (deleteNote(id, notes)) {
        // console.log('success');
        res.sendStatus(200);
    } else {
        res.status(500).json({error: "Internal server error"});
    }
});

// export
module.exports = router;