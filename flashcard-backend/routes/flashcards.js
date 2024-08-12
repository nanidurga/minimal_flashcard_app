// const express = require('express');
// const router = express.Router();
// const db = require('../db/db');

// // Get all flashcards
// router.get('/', (req, res) => {
//     db.query('SELECT * FROM flashcards', (err, results) => {
//         if (err) throw err;
//         res.json(results);
//     });
// });

// // Add a new flashcard
// router.post('/', (req, res) => {
//     const { question, answer } = req.body;
//     db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer], (err, results) => {
//         if (err) throw err;
//         res.json({ id: results.insertId, question, answer });
//     });
// });

// // Delete a flashcard
// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     db.query('DELETE FROM flashcards WHERE id = ?', [id], (err, results) => {
//         if (err) throw err;
//         res.sendStatus(204);
//     });
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Get all flashcards
router.get('/', (req, res) => {
    db.query('SELECT * FROM flashcards', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add a new flashcard
router.post('/', (req, res) => {
    const { question, answer } = req.body;
    db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, question, answer });
    });
});

// Delete a flashcard
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    // Ensure that id is being properly parameterized
    console.log(id);
    db.query('DELETE FROM flashcards WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error deleting flashcard:', err);
            return res.status(500).json({ error: 'An error occurred while deleting the flashcard' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        res.sendStatus(204);
    });
});

// Update a flashcard's answer
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { answer } = req.body;

    if (!answer) {
        return res.status(400).json({ message: 'Answer is required' });
    }

    db.query('UPDATE flashcards SET answer = ? WHERE id = ?', [answer, id], (err, results) => {
        if (err) {
            console.error('Error updating flashcard:', err);
            return res.status(500).json({ error: 'An error occurred while updating the flashcard' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        res.json({ id, answer });
    });
});

module.exports = router;
