import React from 'react';
import F1Lights from './F1Lights';
import ResultsDisplay from './ResultsDisplay';
import useF1Game from '../../hooks/useF1Game';
import '../../styles/F1StartTimer.css';

const F1StartTimer = () => {
    const { gameState, reactionTime, bestTime, startGame, litLights } = useF1Game();

    return (
        <div className="f1-start-timer" onClick={startGame}>
            <F1Lights litLights={litLights} />
            <p>
                {gameState === 'waiting' && 'Click to start the lights sequence'}
                {gameState === 'countdown' && 'Wait for all lights to be on'}
                {gameState === 'started' && 'GO! Click now!'}
                {gameState === 'finished' && 'Click to try again'}
            </p>
            <ResultsDisplay gameState={gameState} reactionTime={reactionTime} bestTime={bestTime} />
        </div>
    );
};

export default F1StartTimer;