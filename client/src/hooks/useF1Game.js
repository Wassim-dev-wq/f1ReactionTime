import { useState, useEffect, useCallback } from 'react';
import { submitReactionTime } from '../services/gameService';

const useF1Game = () => {
    const [gameState, setGameState] = useState('waiting');
    const [litLights, setLitLights] = useState(0);
    const [reactionTime, setReactionTime] = useState(0);
    const [bestTime, setBestTime] = useState(() => {
        const saved = localStorage.getItem('best');
        return saved ? Number(saved) : Infinity;
    });
    const [lightsOutTime, setLightsOutTime] = useState(0);
    const [error, setError] = useState(null);

    const handleSubmitResult = async (time) => {
        try {
            const result = await submitReactionTime(time);
            setError(null);
            console.log('Reaction time submitted successfully:', result);
        } catch (err) {
            if (err.message === 'Unauthorized') {
                setError('You need to be logged in to submit results.');
            } else {
                setError('Failed to submit result. Please try again.');
            }
        }
    };

    const startGame = useCallback(() => {
        if (gameState === 'waiting' || gameState === 'finished') {
            setGameState('countdown');
            setLitLights(0);
            setReactionTime(0);
            setLightsOutTime(0);
            setError(null);

            let lightsOn = 0;
            const lightsStart = performance.now();

            const lightInterval = setInterval(() => {
                lightsOn++;
                setLitLights(lightsOn);
                if (lightsOn === 5) {
                    clearInterval(lightInterval);
                    const delay = Math.random() * 4000 + 1000;
                    setTimeout(() => {
                        setLitLights(0);
                        setLightsOutTime(performance.now());
                        setGameState('started');
                    }, delay);
                }
            }, 1000);
        } else if (gameState === 'started') {
            const endTime = performance.now();
            if (lightsOutTime === 0) {
                setReactionTime('Jump start!');
                handleSubmitResult(-1); // Use -1 to indicate a jump start
            } else {
                const time = Math.round(endTime - lightsOutTime);
                setReactionTime(time);
                handleSubmitResult(time);
                if (time < bestTime) {
                    setBestTime(time);
                    localStorage.setItem('best', time);
                }
            }
            setGameState('finished');
        }
    }, [gameState, lightsOutTime, bestTime]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === ' ') {
                startGame();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [startGame]);

    return { gameState, reactionTime, bestTime, startGame, litLights, error };
};

export default useF1Game;