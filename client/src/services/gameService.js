import api from './api';

export const submitReactionTime = async (time) => {
    try {
        const response = await api.post('/timers/submit-reaction-time', { time });
        return response.data;
    } catch (error) {
        console.error('Error submitting reaction time:', error);
        throw error;
    }
};