const router = require('express').Router();

const saveNotesData = require('../db/saveNotesData');

router.get('/notes', function (req, res) {
    saveNotesData.retrieveNotes().then(notes => res.json(notes)).catch(err => res.status(500).json(err));
});

router.post('/notes', (req, res) => {
    saveNotesData.addNote(req.body).then((note) => res.json(note)).catch(err => res.status(500).json(err));
});

module.exports = router;