import React from "react";
 

const EventGuests = ({ guests }) => {
    // const event_id = props.singleEvent.event_id;
    // console.log("from compo ", guests)
    return (
        <div>
            <h3>Attendees:</h3>
            <p>{guests.length == 0 ? "Be first to sign up" : guests.length}</p>
        </div>
    );
};


export default EventGuests
