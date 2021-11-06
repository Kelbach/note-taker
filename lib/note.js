const fs = require('fs');
const path = require('path');

function validateNote(note) {
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    if (!note.title || typeof note.title !== 'string') {
        return false;
    } 
    return true;
}

function createNewNote(body, notesArray) {
    const note = body;
    // console.log(note);
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return note;
}

function deleteNote(id, notesArray) {
    // console.log(id);
    notesArray.splice(note => note.id === id,1);
    let newNotes = notesArray;
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(newNotes, null, 2)
    );

    return true;
}

module.exports = {validateNote,createNewNote,deleteNote};