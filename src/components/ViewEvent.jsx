import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { getEvent, addGuest, getGuests, removeGuest } from "../api";
import AddToCalendar from "./AddToCalendar";
import NotFound from "./errors/NotFound";
import './ViewEvent.css'

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
        setGuests(fetchedGuests.guests || []);
        setIsLoading(false);
      })
      .catch((error) => {
        setError({ message: err.message, status: err.status });
        setIsLoading(false);
        console.error(error);
      });
  }, [event_id]);

  const handleSignUp = () => {
    if (user && user.id) {
      setSigningUp(true);
      setError(null);

      // Update the guests list locally first
      const updatedGuests = [
        ...guests,
        {
          id: user.id,
          username: user.username,
          email: user.email,
          thumbnail: user.thumbnail,
        },
      ];
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

  let foundGuest = guests.some((guest) => guest.id === user?.id);

  if (isLoading)
    return (
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    );

  if (error) return <NotFound />;
  if (!singleEvent) return <p>No event found.</p>;

  return (
    <section>
      {singleEvent && (
        <div className="container-view-event">
        <div className="content-view-event">
        <div className="view-event">


          
          {/* title */}
          <div className="ve title border-around">
            <h3>{singleEvent.event_name}</h3>
          </div>

          <div className="event-category">
                <p>Category: {singleEvent.category}</p>
              </div>
{/* cols */}
          <div className="two-cols">
 {/* first col */}
            <div className="first-col">
             

<div className="ve-el">
              <h4 className="bolder-subtitle">Date: </h4>
              <div className="date-time border-around">
                <p>{new Date(singleEvent.start_t).toLocaleString()}</p>
              </div>
              </div>

              <div className="event-price">
                <h4 className="bolder-subtitle">Ticket Price:</h4>
                <div className="ticket-price border-around">
                  <p>
                    {singleEvent.ticket_price > 0
                      ? `${singleEvent.ticket_price}`
                      : "Free"}
                  </p>
                </div>
              </div>

              <div className="">
                <h4>Attendees: {' '}
                  {guests && guests.length > 0
                    ? guests.length
                    : "Be the first to sign up"}
                    </h4>
             
              </div>
            </div>

            <div className="second-col">
              <div className="single-event-img">
                {singleEvent.image_url && (
                  <img
                    src={singleEvent.image_url}
                    alt={singleEvent.event_name}
                  />
                )}
              </div>
            </div>
          </div>
{/* close 2nd col */}
{/* lower subsection */}
          <div className="ve">
            <h4 className="bolder-subtitle">Additional information</h4>
            <div className="">
              <p>{singleEvent.description}</p>
            </div>
          </div>

          <div className="ve">
            <h4 className="bolder-subtitle">Address: </h4>
            <div className="address border-around">
            <p>
              {singleEvent.first_line_address},{" "}
              {singleEvent.second_line_address}, {singleEvent.city}{" "}
              {singleEvent.postcode}
            </p></div>
          </div>

          <div className="ve action-btns">
            <div className="addTo-calendar">
              <AddToCalendar event={singleEvent} />
            </div>

            <div className="ve central-position">
              {!foundGuest ? (
                <button
                className="signUp"
                  type="button"
                  onClick={handleSignUp}
                  disabled={signingUp}
                >
                  {signingUp ? "Signing Up..." : "Sign Up"}
                </button>
              ) : (
                <div className="ev ev-already-s">
                  <p>You have already signed up for this event.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
        </div>
      )}
    </section>
  );
};

export default ViewEvent;
