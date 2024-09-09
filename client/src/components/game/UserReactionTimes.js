import React, { useState, useEffect } from 'react';
import { getUserReactionTimes } from '../../services/gameService';

const UserReactionTimes = ({ userId }) => {
    const [reactionTimes, setReactionTimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReactionTimes = async () => {
        setLoading(true);
        try {
            const times = await getUserReactionTimes(userId);
            setReactionTimes(times);
            setError(null);
        } catch (err) {
            setError('Failed to fetch reaction times. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReactionTimes();
    }, [userId]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) return <p>Loading reaction times...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="user-reaction-times">
            <h2>Your Reaction Times</h2>
            <button onClick={fetchReactionTimes} className="refresh-button">Refresh</button>
            {reactionTimes.length === 0 ? (
                <p>No reaction times recorded yet.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reactionTimes.map((timer) => (
                        <tr key={timer.id}>
                            <td>{formatDate(timer.createdAt)}</td>
                            <td>{timer.time === -1 ? 'Jump start' : `${timer.time} ms`}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserReactionTimes;