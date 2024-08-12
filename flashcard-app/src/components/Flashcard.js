import React from 'react';

function Flashcard({ question, answer, isFlipped }) {
    return (
        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
            <div className="flashcard-content front">
                <h2>{question}</h2>
            </div>
            <div className="flashcard-content back">
                <p>{answer}</p>
            </div>
        </div>
    );
}

export default Flashcard;
