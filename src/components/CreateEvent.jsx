import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../contexts/UserContext';
import { postEvent, getCategories, getLocations } from '../api';

const CreateEvent= () => {
    const { user, loading } = useContext(UserContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesAndLocations = async () => {
        try {
          const fetchedCategories = await getCategories();
          const fetchedLocations = await getLocations();
          setCategories(fetchedCategories);
          setLocations(fetchedLocations);
          setIsLoading(false);
        } catch (err) {
          console.error('Error fetching data:', err);
          setError(err);
          setIsLoading(false);
        }
      };
  
      fetchCategoriesAndLocations();
    }, []);

  const validationSchema = Yup.object().shape({
    event_name: Yup.string().required('Event name is required'),
    description: Yup.string().required('Description is required'),
    startdate: Yup.date().required('Start date is required'),
    starttime: Yup.string().required('Start time is required'),
    enddate: Yup.date().required('End date is required'),
    endtime: Yup.string().required('End time is required'),
    ticket_price: Yup.number().min(0, 'Ticket price must be a positive number').required('Ticket price is required'),
    image_url: Yup.string().url('Invalid URL'),
    category: Yup.string().required('Category is required'),
    location: Yup.string().required('Location is required'),
  });

  const handleSubmit = (values, { setSubmitting} ) => {
    if(user.role==="admin"){
        postEvent(values).then((response) => {
            console.log('Event created:', response.data);
          navigate('/');
        })
        .catch((error) => {
            console.error('Error creating event:', error);
            setError(error.message);
            setSubmitting(false); // Set submitting to false on error
          });  
        } else {
            setError('You do not have permission to create an event');
            setSubmitting(false); // Set submitting to false if user is not admin
        }
  }

 
  return (
    <>
    {
        (user&&user.role== "admin" )? (
            <div className="create-event">
            <h2>Create Event</h2>
            {error && <div className="error">{error}</div>}
            <Formik
                    initialValues={{
                event_name: '',
                description: '',
                startdate: '',
                starttime: '',
                enddate: '',
                endtime: '',
                ticket_price: '0.00',
                image_url: '',
                category: '',
                location: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
            {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Event Name</label>
              <Field type="text" name="event_name" />
              <ErrorMessage name="event_name" component="div" className="error" />
            </div>
            <div>
              <label>Description</label>
              <Field type="text" name="description" />
              <ErrorMessage name="description" component="div" className="error" />
            </div>
            <div>
              <label>Start Date</label>
              <Field type="date" name="startdate" />
              <ErrorMessage name="startdate" component="div" className="error" />
            </div>
            <div>
              <label>Start Time</label>
              <Field type="time" name="starttime" />
              <ErrorMessage name="starttime" component="div" className="error" />
            </div>
            <div>
              <label>End Date</label>
              <Field type="date" name="enddate" />
              <ErrorMessage name="enddate" component="div" className="error" />
            </div>
            <div>
              <label>End Time</label>
              <Field type="time" name="endtime" />
              <ErrorMessage name="endtime" component="div" className="error" />
            </div>
            <div>
              <label>Ticket Price</label>
              <Field type="number" name="ticket_price" step="0.01" />
              <ErrorMessage name="ticket_price" component="div" className="error" />
            </div>
            <div>
              <label>Image URL</label>
              <Field type="text" name="image_url" />
              <ErrorMessage name="image_url" component="div" className="error" />
            </div>
            <div>
              <label>Category</label>
              <Field as="select" name="category">
                <option value="" label="Select category" />
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.slug}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="category" component="div" className="error" />
            </div>
            <div>
              <label>Location</label>
              <Field as="select" name="location">
                <option value="" label="Select location" />
                {locations.map((location) => (
                  <option key={location.location_id} value={location.location_id}>
                    {`${location.postcode}, ${location.first_line_address}, ${location.second_line_address}, ${location.city}`}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="location" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Create Event
            </button>
          </Form>
        )}
      </Formik>

            
            </div>


        ) : (
            <p>You need to login first.</p>
        )
    }
      
    </>
  )
}

export default CreateEvent
