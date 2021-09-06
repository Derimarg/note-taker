const util = require('util');
const fs = require('fs');

// package manager of ids
const { v4: uuidv4 } = require('uuid');

const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

class Save {
    write(note) {
        return writeNote('db/db.json', JSON.stringify(note));
    }

    read() {
        return readNote('db/db.json', 'utf8');
    }

    retrieveNotes() {
        return this.read().then(notes => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    }

    // Save notes
    saveNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error('Title and text are required!');
        }
        // Add unique IDs
        const newNote = { title, text, id: uuidv4() };

        // Save new note and update lef panel
        return this.retrieveNotes().then(notes => [...notes, newNote]).then(updatedNotes => this.write(updatedNotes)).then(() => newNote);
    }

    deleteNote(id) {
        return this.retrieveNotes().then(notes => notes.filter(note => note.id !== id)).then(filteredNotes => this.write(filteredNotes));
    }

}

module.exports = new Save();