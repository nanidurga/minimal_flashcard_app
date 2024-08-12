// FlashcardContainer.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Flashcard from './Flashcard';
import NextButton from './NextButton';
import PreviousButton from './PreviousButton';
import axios from 'axios';
import './style.css'; // Import the CSS file

function FlashcardContainer() {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        axios.get('http://localhost:5000/api/flashcards')
            .then(response => setFlashcards(response.data))
            .catch(error => console.error('Error fetching flashcards:', error));
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
        setIsFlipped(false); // Reset flip state when changing cards
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
        setIsFlipped(false); // Reset flip state when changing cards
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const goToAdmin = () => {
        navigate('/admin');
    };

    return (
        <div className="flashcard-container">
            <div className="admin-icon" onClick={goToAdmin}>
                <i className="fa fa-user" aria-hidden="true"></i> {/* User icon */}
            </div>
            {flashcards.length > 0 ? (
                <>
                    <div className="flashcard-wrapper" onClick={handleFlip}>
                        <Flashcard
                            question={flashcards[currentIndex].question}
                            answer={flashcards[currentIndex].answer}
                            isFlipped={isFlipped}
                        />
                    </div>
                    <div className="button-container">
                        <PreviousButton onClick={handlePrevious} />
                        <NextButton onClick={handleNext} />
                    </div>
                </>
            ) : (
                <p>Loading flashcards...</p>
            )}
        </div>
    );
}

export default FlashcardContainer;
