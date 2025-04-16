import React, { use, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import woman from '../assets/woman.png'; // Assume this is the profile picture
import { useAuth } from "../context/AuthContext";
import Notification  from "../components/notif/Notification"

const Header: React.FC = () => {
  const {user} = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const navigate = use

  const toggleMenu = () => {
    setShowMenu((prev) => !prev); // Toggle the menu visibility
  };

  const { logout } = useAuth(); 

  const handleLogout = () => {
    logout(); 
    console.log("Logging out...");
    navigate('/login');
  };
  return (
    <header className="dropdown-header">
      <div className="logo">MyApp</div>

      <div className="right-nav">
        <nav className="">
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
          </ul>
        </nav>


        <div onClick={toggleMenu} className="profile-pic">
       
          <img style={{ height: "40px" }} src={woman} alt="Profile" />
        </div>
{/* show the menu on click */}
        {showMenu && (
          <nav className="dropdown-menu">
            <ul>
              <li><Link to="/myevents">Registered Events</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li onClick={()=>setShowNotif(true)}>Notifications</li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </nav>
        )}

{showNotif && (
  <Notification onClose={() => setShowNotif(false)} />
)}

      </div>
    </header>
  );
};

export default Header;

