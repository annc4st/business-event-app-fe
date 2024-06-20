import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Link } from "react-router-dom";
import Loading from "./errors/Loading";
import "./errors/errors.css";

const Profile = () => {
    const { user, loading } = useContext(UserContext);

    if (loading) return <Loading />;

    if (!user) {
        return <div>No user logged in</div>;
      }

    return (
        <div className="page_404">
            {user ? (
                <>
                    <div className="ev fouro-four-title">
                        <h1>Profile</h1>
                    </div>
                    <div className="ev-notf">
                        <p>userid: {user.id}</p>
                    </div>
                   
                    <div className="ev-notf">
                        <p>Email: {user.email}</p>
                    </div>
                    <div className="ev-notf">
                        <p>Role: {user.role}</p>
                    </div>
                    {/* <div className="ev-notf">
                        <img src={user.role} alt="User Thumbnail" />
                    </div> */}
                    {user.role === "admin" && (
                        <div className="admin-part">
                            <p>If user is admin you can see this</p>
                            <p><Link to={"/create-event"}>Create new event</Link></p>
                        </div>
                    )}
                </>
            ) : (
                <p>You need to log in first.</p>
            )}
        </div>
    );
};

export default Profile;
