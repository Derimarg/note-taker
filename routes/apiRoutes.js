const router = require('express').Router();

const saveNotesData = require('../db/saveNotesData');

// Get request
router.get('/notes', function (req, res) {
    saveNotesData.retrieveNotes().then(notes => res.json(notes)).catch(err => res.status(500).json(err));
});

// Post request
router.post('/notes', (req, res) => {
    saveNotesData.saveNote(req.body).then((note) => res.json(note)).catch(err => res.status(500).json(err));
});

module.exports = router;