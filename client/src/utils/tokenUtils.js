import { jwtDecode } from 'jwt-decode';

export const isTokenValid = (token) => {
    if (!token) return false;
    try {
        const decodedToken = jwtDecode(token);
        return decodedToken.exp * 1000 > Date.now();
    } catch (error) {
        console.error('Error decoding token:', error);
        return false;
    }
};