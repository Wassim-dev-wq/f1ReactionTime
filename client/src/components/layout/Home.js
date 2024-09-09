import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const isAuthenticated = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthenticated){
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div>
            <h1>Welcome to F1 Reaction Timer</h1>
            <Link to="/game">Start Game</Link>
        </div>
    );
};

export default Home;