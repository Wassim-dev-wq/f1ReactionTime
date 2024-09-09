import { useState, useCallback, useEffect } from 'react';
import { submitReactionTime } from '../services/api';

const useF1Game = () => {
    const [gameState, setGameState] = useState('waiting');
    const [startTime, setStartTime] = useState(0);
    const [reactionTime, setReactionTime] = useState(0);
    const [bestTime, setBestTime] = useState(localStorage.getItem('bestTime') || '00.000');
    const [litLights, setLitLights] = useState(0);

    const resetGame = useCallback(() => {
        setGameState('waiting');
        setReactionTime(0);
        setLitLights(0);
        setStartTime(0);
    }, []);

    const startGame = useCallback(() => {
        if (gameState === 'waiting') {
            setGameState('countdown');
            setLitLights(0);
            let currentLight = 0;
            const lightInterval = setInterval(() => {
                if (currentLight < 5) {
                    setLitLights(currentLight + 1);
                    currentLight++;
                } else {
                    clearInterval(lightInterval);
                    setGameState('started');
                    setStartTime(Date.now());
                }
            }, 1000);
        } else if (gameState === 'countdown') {
            // Early click, reset the game
            resetGame();
        } else if (gameState === 'started') {
            const endTime = Date.now();
            const time = (endTime - startTime) / 1000;
            setReactionTime(time);
            setGameState('finished');
            if (time < parseFloat(bestTime)) {
                setBestTime(time.toFixed(3));
                localStorage.setItem('bestTime', time.toFixed(3));
            }
            submitReactionTime(time)
                .then(response => {
                    console.log('Reaction time submitted successfully:', response);
                })
                .catch(error => {
                    console.error('Failed to submit reaction time:', error);
                });
        } else if (gameState === 'finished') {
            resetGame();
        }
    }, [gameState, startTime, bestTime, resetGame]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.code === 'Space') {
                startGame();
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [startGame]);

    return { gameState, reactionTime, bestTime, startGame, litLights };
};

export default useF1Game;