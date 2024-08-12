import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [flashcards, setFlashcards] = useState([]);
    const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });
    const [editingFlashcard, setEditingFlashcard] = useState(null);
    const [updatedAnswer, setUpdatedAnswer] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/flashcards')
            .then(response => setFlashcards(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleAddFlashcard = () => {
        axios.post('http://localhost:5000/api/flashcards', newFlashcard)
            .then(response => {
                setFlashcards([...flashcards, response.data]);
                // Reset newFlashcard state to clear input fields
                setNewFlashcard({ question: '', answer: '' });
            })
            .catch(error => console.error(error));
    };

    const handleDeleteFlashcard = (id) => {
        axios.delete(`http://localhost:5000/api/flashcards/${id}`)
            .then(() => setFlashcards(flashcards.filter(f => f.id !== id)))
            .catch(error => console.error(error));
    };

    const handleUpdateFlashcard = (id) => {
        axios.put(`http://localhost:5000/api/flashcards/${id}`, { answer: updatedAnswer })
            .then(response => {
                setFlashcards(flashcards.map(f => f.id === id ? { ...f, answer: updatedAnswer } : f));
                setEditingFlashcard(null);
                setUpdatedAnswer('');
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div>
                <input
                    type="text"
                    placeholder="Question"
                    value={newFlashcard.question}
                    onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Answer"
                    value={newFlashcard.answer}
                    onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
                />
                <button onClick={handleAddFlashcard}>Add Flashcard</button>
            </div>
            <ul>
                {flashcards.map(flashcard => (
                    <li key={flashcard.id}>
                        {flashcard.question} - {flashcard.answer}
                        <button onClick={() => handleDeleteFlashcard(flashcard.id)}>Delete</button>
                        <button onClick={() => setEditingFlashcard(flashcard.id)}>Edit</button>
                        {editingFlashcard === flashcard.id && (
                            <div>
                                <input
                                    type="text"
                                    placeholder="New Answer"
                                    value={updatedAnswer}
                                    onChange={(e) => setUpdatedAnswer(e.target.value)}
                                />
                                <button onClick={() => handleUpdateFlashcard(flashcard.id)}>Update</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminDashboard;
