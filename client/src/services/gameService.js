const API_BASE_URL = 'http://localhost:8080/api';

export const submitReactionTime = async (time) => {
    try {
        const response = await fetch(`${API_BASE_URL}/timers/submit-reaction-time`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ time }),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to submit reaction time');
        }

        return await response.json();
    } catch (error) {
        console.error('Error submitting result:', error);
        throw error;
    }
};

export const getUserReactionTimes = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/timers/get-reaction-times/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch reaction times');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching reaction times:', error);
        throw error;
    }
};