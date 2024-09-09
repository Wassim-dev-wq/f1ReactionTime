import { useState, useEffect } from 'react';
import authService from './../services/authService'
import { useNavigate } from 'react-router-dom';


const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const auth = authService.isAuthenticated();
            setIsAuthenticated(auth);
            if(!auth){
                console.log('useAutch, logingout the user.. :',{auth});
                authService.logout();
                navigate('/login');
            }
        };
        checkAuth()
        const interval = setInterval(checkAuth,60000);

        return () => clearInterval(interval);
    }, [navigate]);
    console.log('useAutch,  isAuthenticaed is ',{isAuthenticated});

    return isAuthenticated;
}

export default useAuth;