import React, { useState, useContext } from "react";
import {Route, Routes, Link} from "react-router-dom";
import {UserProvider } from "./contexts/UserContext";

import EventsList from "./components/EventsList";
import ViewEvent from "./components/ViewEvent";
import Nav from "./components/Nav";
import Header from "./components/Header";

import Profile from "./components/Profile";
// import CreateEvent from './components/CreateEvent';
import "./App.css";

function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <Nav />   

        
          <Routes>
            <Route path="/" element={<EventsList />} />
            <Route path="/:category" element={<EventsList />} />
            <Route path="/events/:event_id" element={<ViewEvent />} />
            <Route path="/profile" element={<Profile />} />

            {/* <Route path="/create-event" element={<Create />} /> */}
 
          </Routes>
    
      </UserProvider>
    </>
  );
}

export default App;
