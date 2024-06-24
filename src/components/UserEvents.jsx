import React, { useEffect, useState } from 'react';
import { getUserSignedUpEvents } from '../api';


const UserEvents = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const userEvents = await getUserSignedUpEvents();
                setEvents(userEvents);
            } catch (err) {
                setError(err);
            }
        };

        fetchEvents();
    }, []);

    if (error) {
        return <div><p>You have not signed up for any event yet.</p></div>;
    }

    return (
        <div>
            <h2>You Signed Up For the Following Events</h2>
            <ul>
                {events.map((event) => (
                    <li key={event.event_id}>
                        <h3>{event.event_name}</h3>
                        <p>{event.description}</p>
                        <p>Start Time: {new Date(event.start_t).toLocaleString()}</p>
                        <p>End Time: {new Date(event.end_t).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserEvents;