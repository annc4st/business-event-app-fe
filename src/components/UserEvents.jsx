import React, { useEffect, useState } from 'react';
import { getUserSignedUpEvents } from '../api';


const UserEvents = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [expandedEventId, setExpandedEventId] = useState(null);

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

    const toggleEventDetails = (eventId) => {
        setExpandedEventId(expandedEventId === eventId ? null : eventId);
    };

    if (error) {
        return <div><p>You have not signed up for any event yet.</p></div>;
    }

    return (
        <div className='user-signedup-event'>
            <h3>You Signed Up For the Following Events</h3>
            <ol>
                {events.map((event) => (
                    <li key={event.event_id}>
                        <div className='user-signedup-event-details'>
                            <h4 onClick={() => toggleEventDetails(event.event_id)}>{event.event_name}</h4>
                            {expandedEventId === event.event_id && (
                                <div className="event-details">
                                    <p>{event.description}</p>
                                    <p>Start Time: {new Date(event.start_t).toLocaleString()}</p>
                                    <p>End Time: {new Date(event.end_t).toLocaleString()}</p>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
};
export default UserEvents;