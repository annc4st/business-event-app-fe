import React, { useEffect, useState, useContext} from "react";
import Modal from 'react-modal';
import { useParams} from 'react-router-dom';
import { UserContext} from "../contexts/UserContext";
import { getEvent, addGuest, getGuests} from "../api";
import ModalAfterSignUp from "./ModalAfterSignUp";
import ModalErrorGuestExists from "./ModalErrorGuestExists";
import AddToCalendar from './AddToCalendar'
import EventGuests from './EventGuests'



const ViewEvent = () => {
    const {event_id} = useParams();
    const [singleEvent, setSingleEvent] = useState(null);
    const [guests, setGuests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [signingUp, setSigningUp] = useState(false);
    const { user } = useContext(UserContext);
    const [openModal, setOpenModal] = useState(false)
    const [errorModal, setErrorModal] = useState(null); 



    useEffect(() => {
        setIsLoading(true);
        getEvent(event_id)

        .then((fetchedEvent) => {
            console.log(fetchedEvent)
        
            setSingleEvent(fetchedEvent)
            setIsLoading(false)
        }).catch((err) => {
            setError({message:err.message, status: err.status})
            setIsLoading(false);
            console.log(err)
        })
    }, [event_id]);

    useEffect(() => {
        if (singleEvent) {
            getGuests(event_id)
                .then((fetchedGuests) => {
                    console.log("Fetched guests:", fetchedGuests);
                    setGuests(fetchedGuests.guests);
                })
                .catch((err) => {
                    console.error("Error fetching guests:", err);
                    setError({ message: err.message, status: err.status });
                });
        }
    }, [event_id, singleEvent]);


    const handleSignUp = () => {
        if (user && user.id) {
            setSigningUp(true);

            // API request to update guests
            addGuest(event_id, user.id)
                .then((updatedGuests) => {
                    console.log('Successfully signed up:', updatedGuests);
                    setGuests(updatedGuests.guests);
                    setSigningUp(false);
                    setOpenModal(true); // Only open modal on successful sign-up
                })
                .catch((error) => {
                    console.error('Error signing up for event:', error);
                    if (error.message === "This user has already signed up for the event.") {
                        setErrorModal('You have already signed up for this event.'); // Set error message
                    }
                    setSigningUp(false);
                });
        } else {
            console.error('User is not logged in');
            alert("You need to sign in to sign up for this event!");
        }
    };

    if (isLoading) return <div className="loading-p">loading...</div>;
    if (error) return <p>Error: {error.message}</p>;
    if (!singleEvent) return <p>No event found.</p>;

    return (
        <section>
        {singleEvent ? (
            
                <div>
                <div className="single-event-img">
                    {singleEvent.image_url && <img src = {singleEvent.image_url}  alt={singleEvent.event_name}/>}
                </div>
                    <h2>{singleEvent.event_name}</h2>
                
                    <p>Category: {singleEvent.category}</p>
                    <p>{new Date(singleEvent.start_t).toLocaleString()}</p> 
                    
                        <AddToCalendar event={singleEvent} />
                
                    <p>Ticket Price: {singleEvent.ticket_price > 0 ? `${singleEvent.ticket_price}` : "Free"}</p>
                    <p>{singleEvent.description}</p>
                    
                    <EventGuests guests={guests} />
                   
                    <button 
                        onClick={ handleSignUp } 
                        disabled={ signingUp }
                        >Sign Up btn</button>
                   
                    {errorModal && <ModalErrorGuestExists message={errorModal} closeModal={() => setErrorModal(null)} />}
                    <p></p>
                    <p>Address: {singleEvent.first_line_address}, {singleEvent.second_line_address}, {singleEvent.city} {singleEvent.postcode}</p>
                    <div>
                        map div
                    </div>
                    <p></p>
                </div>
            ) : (
        <p> Loading ... </p>
      )}
            
        </section>
        )
}


export default ViewEvent;