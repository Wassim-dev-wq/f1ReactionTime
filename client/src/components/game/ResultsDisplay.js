import React from 'react';

const ResultsDisplay = ({ gameState, reactionTime, bestTime }) => (
    <div className="results">
        <div className={`time ${gameState === 'finished' ? 'anim' : ''}`}>
            {gameState === 'finished' ? reactionTime.toFixed(3) : '00.000'}
        </div>
        <div className="best">Your best: <span>{bestTime}</span></div>
    </div>
);

export default ResultsDisplay;