import React, { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { getEvent, addGuest, getGuests, removeGuest } from "../api";
import ModalAfterSignUp from "./ModalAfterSignUp";
import AddToCalendar from "./AddToCalendar";
import NotFound from './errors/NotFound';
import Loading from "./errors/Loading";

const ViewEvent = () => {
  const { user } = useContext(UserContext);
  const { event_id } = useParams();
  const [singleEvent, setSingleEvent] = useState(null);
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [signingUp, setSigningUp] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    getEvent(event_id)
      .then((fetchedEvent) => {
        // console.log(fetchedEvent);
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
      setError(null);

      // Update the guests list locally first
      const updatedGuests = [...guests, { id: user.id, username: user.username, email: user.email, thumbnail: user.thumbnail }];
      setGuests(updatedGuests);

      // API request to update guests
      addGuest(event_id, user.id)
        .then(() => {
          setSigningUp(false);
        })
        .catch((error) => {
          console.error("Error signing up for event:", error);
          setError("Error signing up. Please try again later.");
          // revert the local update in case of error
          setGuests(guests);
          setSigningUp(false);
        });
    } else {
      console.error("User is not logged in");
      alert("You need to sign in to sign up for this event!");
    }
  };
 
  let foundGuest = guests.some(guest => guest.id === user?.id);
 
  if (isLoading) return <Loading />;
  if (error) return <NotFound />;
  if (!singleEvent) return <p>No event found.</p>;

  return (
    <section>
      {singleEvent ? (
        <div className="event-section">
          <div className="single-event-img">
            {singleEvent.image_url && (
              <img src={singleEvent.image_url} alt={singleEvent.event_name} />
            )}
          </div>
          <div className="ev ev-title">

          <h3>{singleEvent.event_name}</h3>
          </div>

          <p>Category: {singleEvent.category}</p>
          
          <div className="ev ev-date">
          <h4>Date: </h4>
          <p>{new Date(singleEvent.start_t).toLocaleString()}</p>
          </div>
      
      <div className="ev">
          <AddToCalendar event={singleEvent} />
        </div>
            
          <div className="ev">
            <h4>Ticket Price:</h4>{" "}
            <div className="ticket-price">
            <p > {singleEvent.ticket_price > 0
              ? `${singleEvent.ticket_price}`
              : "Free"}
          </p></div>
          </div>
          <div className="ev ev-descrption">
          <h4>Description</h4>
          <p>{singleEvent.description}</p>
          </div>

          <div className="ev ev-guests">
            <h4>Attendees:</h4>
            <p>
            {guests && guests.length > 0
                ? guests.length
                : "Be the first to sign up"}
            </p>
          </div>

          <div className="ev ev-address">
          <h4>Address: </h4>
            <p>{singleEvent.first_line_address},{" "}
            {singleEvent.second_line_address}, {singleEvent.city}{" "}
            {singleEvent.postcode}
          </p>
          </div>

          <div className="ev">
            {!foundGuest ? (
              <button type="button" 
              onClick={handleSignUp} disabled={signingUp}>
               {signingUp ? "Signing Up..." : "Sign Up"}
              </button>
            ) : (
              <div className="ev ev-already-s">
                <p >You have already signed up for this event.</p>
              </div>
            )}
          </div>
          <div className="ev-map"></div>
          <p></p>
        </div>
      ) : (
        <p> Loading ... </p>
      )}
    </section>
  );
};

export default ViewEvent;
