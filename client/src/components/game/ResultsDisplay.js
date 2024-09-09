import React from 'react';

const ResultsDisplay = ({ gameState, reactionTime, bestTime }) => (
    <div className="results">
        <div className={`time ${gameState === 'finished' ? 'anim' : ''}`}>
            {gameState === 'finished' ?
                (reactionTime === 'Jump start!' ? reactionTime : formatTime(reactionTime)) :
                '00.000'}
        </div>
        <div className="best">Your best: <span>{formatTime(bestTime)}</span></div>
    </div>
);

const formatTime = (time) => {
    if (time === Infinity) return '00.000';
    time = Math.round(time);
    let outputTime = (time / 1000).toFixed(3);
    if (time < 10000) {
        outputTime = '0' + outputTime;
    }
    return outputTime.padEnd(6, '0');
};

export default ResultsDisplay;