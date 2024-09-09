import { useState, useEffect } from 'react';
import authService from './../services/authService'
import { useNavigate } from 'react-router-dom';


const useAuth = () => {
    const [isAuthenticated, setIsAthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const auth = authService.isAuthenticated();
            setIsAthenticated(auth);
            if(!auth){
                authService.logout();
                navigate('/login');
            }
        };
        checkAuth()
        const interval = setInterval(checkAuth,60000);

        return () => clearInterval(interval);
    }, [navigate]);

    return isAuthenticated;
}

export default useAuth;