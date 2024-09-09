import {register} from './api';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = process.env.REACT_APP_API_URL


const authService = {
    login: async (email, password) => {

        const response = await axios.post(`${API_URL}/auth/login`, {
            email,
            password
        });
        return response.data;
    },

    register: async (email, password) => {
        try {
            const response = await register(email, password);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    isAuthenticated: () => {
        const token = localStorage.getItem('token');
        if(!token) return false;
        try{
            const decodeToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodeToken.exp > currentTime;
        } catch(error){
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration')
    },

};

export default authService;