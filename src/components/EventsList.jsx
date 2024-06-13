import { getEvents, getCategories } from "../api";
import EventItem from "./EventItem";
import React, { useEffect, useState } from "react";
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom';


const EventsList = () => {
    const [categories, setCategories] = useState([]);
    const [events, setEvents] = useState([]);
    const {category} = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(category || '');

    // getting categories
    useEffect(()=> {
        setIsLoading(true)
        getCategories().then((fetchedCategories) => {
            // console.log(fetchedCategories);
            setIsLoading(false);
            setCategories(fetchedCategories)
        });
    },  []);

    //getting events
    useEffect(() => {
        setIsLoading(true);
        getEvents(selectedCategory).then((fetchedEvents) => {
            // console.log(fetchedEvents)
            setIsLoading(false)
            setEvents(fetchedEvents);
        })
        .catch((err) => {
            setError({message:err.message, status: err.status})
        });
    },[selectedCategory]);

const handleChangeCategory = (catg) => {
    setSelectedCategory(catg);
    navigate(`/${catg}`);
};


    if (isLoading) return <div className="loading-p">loading...</div>;
    if (error) return <p>No Results Found</p>;
    

    return (
        <div>
        <div className="category-selector">
        <ul>
            {categories.map((catg)=> {
                return (
                    <li key={catg.slug} 
                        className={selectedCategory === catg.slug ? "active" : "not-active"}
                        onClick={() => handleChangeCategory(catg.slug)}>
                        <Link to={`/${catg.slug}`}>{catg.slug}</Link>
                    </li>
                )
            })}
        </ul>

        </div>

   
        <div className="events-container">
            <h2>Events</h2>
            {events.length === 0 ? (
                    <p>No events yet</p>
                ) : (
            <div className="events-list">
                {events.map((event) => (
            
                        <EventItem key = {event.event_id} event = {event} />
                
                    ))}
            </div>
                )}
                
        </div>

        </div>
    )
}
export default EventsList;