import {Route, Routes, Link} from "react-router-dom";

const EventItem = ({event}) => {
return (
    <div className="event-item">
        <Link to={`/events/${event.event_id}`}>
        <h3>{event.event_name}</h3>
        </Link>
        <p>{event.description}</p>
        <p>{new Date(event.start_t).toLocaleString()}</p>
        <p>{event.postcode}, {event.first_line_address}, {event.second_line_address}, {event.city}</p>
    </div>
)

}

export default EventItem;