import axios from "axios";

const eventsApi = axios.create ({
    // baseURL : "http://localhost:9000/api",
    baseURL : "https://business-event-app.onrender.com/api",
    withCredentials: true,
})

export const getEvents = (category) => {
    let params = {};
    if (category){
        params.category = category;
    }
 
    return  eventsApi.get('/events', {params})
    .then((response) => {
        return response.data;
    })
}

export const getCategories = () => {
    return eventsApi.get('/categories')
    .then((response) => {
        return response.data;
    })
}

export const getEvent = (event_id) => {
    return eventsApi.get(`/events/${event_id}`)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        throw error;
    });
}

export const postEvent = async (newEvent) => {
    const response = await eventsApi.post(`/events`, newEvent);
    return response.data;
}

export const getUser = () => {
    return eventsApi.get('/auth/user', { withCredentials: true })
    .then((response) => {
        return response.data
    })
}


//add user to guestlist for event when user signs up
export const addGuest = (event_id, userId) => {
    return eventsApi.patch(`/events/${event_id}/guests`,  { id: userId })
    .then((response) => {
        console.log("api.js line 60>> ",response.data);
        return response.data;
    })
    .catch((error) => {
        console.error('Error updating guest list:', error);
        throw error;
      });
}

//remove user from guestlist by admin
export const removeGuest = (event_id, userId) => {
    return eventsApi.delete(`/events/${event_id}/guests`,  { id: userId })
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        // console.error('Error removing  guest from list:', error);
        throw error;
      });
}

export const getGuests = (event_id) => {
    return eventsApi.get(`/events/${event_id}/guests`)
    .then((response)=> {
        // console.log("api.js line 85> ",response.data);
        return response.data;
    })
    .catch((error) => {
        console.error("Getting all guests ", error)
        throw error;
    })
}

export const getLocations = async() => {
    const response = await eventsApi.get(`/locations`)
    return response.data;
}

export const getLocationById = async(location_id) => {
    const response = await eventsApi.get(`/locations/${location_id}`)
    return response.data;
}

export const createLocation = async (newLocation) => {
    const response = await eventsApi.post(`/locations`, newLocation);
    // console.log("create locations ", response.data)
    return response.data;
}

export const deleteLocation = (location_id) => {
    return eventsApi.delete(`/locations/${location_id}`)
    .then(() => {
        // console.log(`Location ${location_id} has been deleted successfully`)
    })
    .catch((error) => {
        // console.log('Error : ', error)
    })
}