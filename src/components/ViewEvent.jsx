import React, { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { getEvent, addGuest, getGuests, removeGuest } from "../api";
import ModalAfterSignUp from "./ModalAfterSignUp";
import AddToCalendar from "./AddToCalendar";

const ViewEvent = () => {
 
    const { user } = useContext(UserContext);
  const { event_id } = useParams();
  const [singleEvent, setSingleEvent] = useState(null);
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [signingUp, setSigningUp] = useState(false);
 

//   

  useEffect(() => {
    setIsLoading(true);
    getEvent(event_id)
      .then((fetchedEvent) => {
        console.log(fetchedEvent);
        setSingleEvent(fetchedEvent);

        return getGuests(event_id);
        })
        .then((fetchedGuests) => {
            console.log("Fetched guests:", fetchedGuests.guests);
            setGuests(fetchedGuests.guests || []);
            setIsLoading(false);
        })
        .catch((err) => {
            setError({ message: err.message, status: err.status });
            setIsLoading(false);
            console.log(err);
        });
  }, [event_id]);




  const handleSignUp = () => {
    if (user && user.id) {
      setSigningUp(true);

      // API request to update guests
      addGuest(event_id, user.id)
        .then((updatedGuests) => {
          console.log("Successfully signed up:", updatedGuests);
          setGuests(updatedGuests.guests);
          setSigningUp(false);
        })
        .catch((error) => {
          console.error("Error signing up for event:", error);

          setSigningUp(false);
        });
    } else {
      console.error("User is not logged in");
      alert("You need to sign in to sign up for this event!");
    }
  };


let foundGuest = false;
    for (let i=0; i<guests.length; i++){
        if(guests[i].id === user.id) {
            foundGuest = true;
        }
    }
console.log("yay found", foundGuest)

  if (isLoading) return <div className="loading-p">loading...</div>;
  if (error) return <p>Error: {error.message}</p>;
  if (!singleEvent) return <p>No event found.</p>;

  return (
    <section >
      {singleEvent ? (
        <div className="event-section">
          <div className="single-event-img">
            {singleEvent.image_url && (
              <img src={singleEvent.image_url} alt={singleEvent.event_name} />
            )}
          </div>
          <h2>{singleEvent.event_name}</h2>

          <p>Category: {singleEvent.category}</p>
          <p>{new Date(singleEvent.start_t).toLocaleString()}</p>

          <AddToCalendar event={singleEvent} />

          <p>
            Ticket Price:{" "}
            {singleEvent.ticket_price > 0
              ? `${singleEvent.ticket_price}`
              : "Free"}
          </p>
          <p>{singleEvent.description}</p>

          <div>
            <h3>Attendees:</h3>
            <p>{guests.length == 0 ? "Be first to sign up" : guests.length}</p>
          </div>
           
            {(!foundGuest) ? (
          <button type="button" onClick={handleSignUp} disabled={signingUp}>
            Sign Up btn
          </button>
            ): (
                <div><p>You have already signed up for this event.</p></div>
            )}
          
          <p></p>
          <p>
            Address: {singleEvent.first_line_address},{" "}
            {singleEvent.second_line_address}, {singleEvent.city}{" "}
            {singleEvent.postcode}
          </p>
          <div>map div</div>
          <p></p>
        </div>
      ) : (
        <p> Loading ... </p>
      )}
    </section>
  );
};

export default ViewEvent;
