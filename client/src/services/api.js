import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const login = (email, password) => {
    return axios.post(`${API_URL}/auth/login`, { email, password });
};

export const register = (email, password) => {
    return axios.post(`${API_URL}/auth/register`, { email, password });
};

export const getReactionTimes = () => {
    return axios.get(`${API_URL}/times/reaction-times`);
};

// New function for submitting reaction time
export const submitReactionTime = async (time) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/times/submit-reaction`, { time }, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error submitting reaction time:', error);
        throw error;
    }
};

