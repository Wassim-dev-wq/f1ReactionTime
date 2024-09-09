import React, { useState } from 'react';
import F1Lights from './F1Lights';
import ResultsDisplay from './ResultsDisplay';
import UserReactionTimes from './UserReactionTimes';
import useF1Game from '../../hooks/useF1Game';
import '../../styles/F1StartTimer.css';

const F1StartTimer = () => {
    const { gameState, reactionTime, bestTime, startGame, litLights, error } = useF1Game();
    const [showReactionTimes, setShowReactionTimes] = useState(false);
    const [userId, setUserId] = useState(1);

    const toggleReactionTimes = () => {
        setShowReactionTimes(!showReactionTimes);
    };

    return (
        <div className="f1-start-timer">
            <div className="game-area" onClick={startGame}>
                <F1Lights litLights={litLights} />
                <p>
                    {gameState === 'waiting' && 'Tap/click when you re ready to race, then tap again when the lights go out.'}
                    {gameState === 'countdown' && 'Wait for all lights to be on'}
                    {gameState === 'started' && 'GO! Tap/click now!'}
                    {gameState === 'finished' && 'Tap/click to try again'}
                        </p>
                        <ResultsDisplay gameState={gameState} reactionTime={reactionTime} bestTime={bestTime} />
                {error && <p className="error-message">{error}</p>}
            </div>
            <div className="reaction-times-section">
                <button onClick={toggleReactionTimes} className="toggle-reaction-times">
                    {showReactionTimes ? 'Hide Reaction Times' : 'Show Reaction Times'}
                </button>
                {showReactionTimes && <UserReactionTimes userId={userId} />}
            </div>
        </div>
    );
};

export default F1StartTimer;