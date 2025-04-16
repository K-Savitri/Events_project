/* .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md) var(--spacing-xl);
    background-color: var(--color-white);
    border-bottom: 1px solid var(--color-border);
    box-shadow: var(--shadow-sm);
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--color-primary);
  } */
/*   
  .nav-list {
    list-style: none;
    display: flex;
    gap: var(--spacing-lg);
  }
  
  .nav-list a {
    text-decoration: none;
    color: var(--color-dark);
    font-weight: 500;
    transition: color 0.2s ease;
  }
  
  .nav-list a:hover {
    color: var(--color-primary);
  }
   */
/* 
   .menu-icon {
    font-size: 1.8rem;
    cursor: pointer;
    user-select: none;
  }

.dropdown-menu{
position: absolute;
  top: 10%;
  right: var(--spacing-xl);
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-sm) 0;
  z-index: 999;
   }


   .dropdown-menu ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .dropdown-menu li {
    padding: var(--spacing-sm) var(--spacing-md);
    white-space: nowrap;
  }
  
  .dropdown-menu li a {
    text-decoration: none;
    color: var(--color-dark);
    font-weight: 500;
    display: block;
  }
  
  .dropdown-menu li:hover {
    background-color: var(--color-light);
  } */



{
    "event_id": 1,
    "title": "AI & ML Workshop",
    "date": "2025-04-30T18:30:00.000Z",
    "time": "10:00:00",
    "location": "Auditorium A",
    "description": "Hands-on workshop on AI and ML fundamentals'",
    "category_id": 1,
    "category_name": "Workshop"
}

    const handleClick = () => {
      navigate(`/event/${id}`);
    };


    




// import React, { useState } from "react";
// import "./Header.css";
// import { Link } from "react-router-dom";
// import woman from '../assets/woman.png'




// const Header: React.FC = () => {
//   // const [menuOpen, setMenuOpen] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);
//   const toggleMenu = () => {
//     setShowMenu((prev:Boolean) => !prev);
//   };


//   // const toggleMenu = () => setMenuOpen((prev) => !prev);

//   return (
//     <header className="dropdown-header">
//       <div className="logo">MyApp</div>
// {/* 
//       <div className="menu-icon" onClick={toggleMenu}>
//         ☰
//       </div> */}

//       {/* {menuOpen && (
//         <nav className="dropdown-menu">
//           <ul>
//             <li><a href="/profile">Profile</a></li>
//             <li><a href="/login">Login</a></li>
//             <li><a href="/register">Register</a></li>
//           </ul>
//         </nav>
//       )} */}

// <div className="right-nav">
//           <nav className="">
//       <ul className="nav-list">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/events">Events</Link></li>
//        {/* <li><Link to="/myevents">Registered Events</Link></li> */}
// </ul>
// </nav>

//       <div onClick={toggleMenu} className="profile-pic">
//       <img style={{height: "40px"}} src={woman} alt="" /> 

//         </div>

//         <div onClick={toggleMenu} className="profile-pic">
//         <img style={{height: "40px"}} src={woman} alt="" /> 
//   </div>



// </div>
     
//     </header>
//   );
// };

// export default Header;




// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useFetch } from '../hooks/useFetch';
// import { useAuth } from '../context/AuthContext';
// import toast from 'react-hot-toast';

// interface EventDetail {
//   event_id: number;
//   title: string;
//   date: string;
//   time: string;
//   duration: string;
//   location: string;
//   description: string;
//   category_id: number;
//   organizer_id: number;
//   category_name: string;
// }

// const EventDetailPage = () => {
//   const { id } = useParams();
//     const { token, logout } = useAuth();
  
//   // const { data: event, loading, error } = useFetch<EventDetail>({
//   //   url: `/api/event/${id}`, // dynamic id here
//   // });
//   const [EventDetails, setEventDetails] = useState<EventDetail[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

// const fetchEventDetails = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/event/${id}`,
//        { headers: {
//           Authorization: `Bearer ${token}`,
//         },
//     });
//       const data = await response.json();
      
//       if(!response.ok){
//         toast.error(data.message);
//       }
//       console.log('fetched eventDetails', EventDetails)
//       setEventDetails(EventDetails)
//     }  catch (err: any) {
//       console.error('Error fetching events:', err);
//       setError(err.message || 'Failed to load events');
//       toast.error('Failed to load events');
//     } finally {
//       setLoading(false);
//     }
//   };  


//   useEffect(() => {
//     fetchEventDetails()
//     },[id]);  
 


//   const categoryColors: Record<string, string> = {
//     Workshop: '#007BFF',
//     Social: 'green',
//     Career: '#FF5733',
//   };

//   const color = event?.category_name ? categoryColors[event.category_name] || 'gray' : 'gray';



//   return (
//     <div style={{ padding: '1rem' }}>
//       <h2>{event.title}</h2>
//       <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
//       <p><strong>Time:</strong> {event.time}</p>
//       <p><strong>Duration:</strong> {event.duration || 'N/A'}</p>
//       <p><strong>Location:</strong> {event.location}</p>
//       <p><strong>Description:</strong> {event.description}</p>

//       <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
//         <div style={{
//           width: '12px',
//           height: '12px',
//           borderRadius: '50%',
//           backgroundColor: color,
//           marginRight: '8px'
//         }}></div>
//         <span>{event.category_name}</span>
//       </div>
//     </div>
//   );
// };

// export default EventDetailPage;











