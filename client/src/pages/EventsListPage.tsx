import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import EventItem from '../components/events/EventItem';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import SearchEvent from '../components/events/SearchEvent';
import CategoryFilter from '../components/events/EventCategories';
import SmallHeader from '../SmallHeader';

interface Event {
  event_id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  description: string;
  organizer_id: number;
  organizer_name: string;
  category_id: number; // Optional, not in DB
  category_name:string;
  color?: string; // Optional, not in DB
}

interface Organizer {
  organizer_id: number;
  name: string;
  description: string;
  contact_info: string;
}


const categoryColors: { [key: string]: string } = {
  Academic: '#007bff',
  Cultural: '#ff5733',
  Sports: '#28a745',
  Career: '#ffc107',
  Club: '#6f42c1',
  Entertainment: '#dc3545',
  General: '#6c757d', // Fallback
};

const eventCategoryMap: { [key: number]: string } = {
  1: 'Academic', // AI & ML Workshop
  2: 'Cultural', // Battle of Bands
  3: 'Sports', // Annual Sports Meet
};


const EventsListPage: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  // const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [organizer, setOrganizer] = useState('')

  useEffect(() => {
    const fetchEvents = async () => {
      if (!token) {
        toast.error('Please log in to view events');
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/api/events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          toast.error('Session expired. Please log in again.');
          logout();
          navigate('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        console.log('Fetched events:', data);

        const alteredEvents = data.map((event: Event) => ({
          ...event,
          category: eventCategoryMap[event.event_id] || 'General',
          color: categoryColors[eventCategoryMap[event.event_id] || 'General'],
        }));

        if(searchTerm!==''){
          const filteredEvents = alteredEvents.filter((event) =>{
           event.title.toLowerCase().startsWith(searchTerm.toLowerCase()) }
            

        );
        setEvents(filteredEvents);
        }else if(selectedCategories.length > 0) {
          console.log(selectedCategories)
         const  selectedEvents = alteredEvents.filter((event) =>
            selectedCategories.includes(event.category || 'General')
          );
      setEvents(selectedEvents);
        }
        else{
          setEvents(alteredEvents);
        }

        // // Apply search and category filters
        // let updatedEvents = alteredEvents;

        // // Search filter
        // if (searchTerm !== '') {
        //   updatedEvents = updatedEvents.filter((event) =>
        //     event.title.toLowerCase().startsWith(searchTerm.toLowerCase())
        //   );
        // }

        // // Category filter
        // if (selectedCategories.length > 0) {
        //   updatedEvents = updatedEvents.filter((event) =>
        //     selectedCategories.includes(event.category || 'General')
        //   );
        // }

        // setEvents(alteredEvents); // Store all events
        // setFilteredEvents(updatedEvents); // Store filtered events


       
      } catch (err: any) {
        console.error('Error fetching events:', err);
        setError(err.message || 'Failed to load events');
        toast.error('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [token,searchTerm,selectedCategories, navigate, logout]);



  useEffect(()=>{
    const fetchOrganisers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/organizers', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },  
        });
  
        if (response.status === 401) {
          toast.error('Session expired. Please log in again.');
          logout();
          navigate('/login');
          return;
        }
  
        if (!response.ok) {
          throw new Error('Failed to fetch organisers');
        }
  
        const data = await response.json();
        console.log('Fetched organisers:', data);
  
        // Do something with the organisers data
        // ...



      } catch (err: any) {

      }

    }

    fetchOrganisers()

  },[organizer])


  const handleFilterChange = (categories: string[]) => {
    setSelectedCategories(categories);
   
  };


  return (
    <Layout>
      <SmallHeader title='All Events' />
      <SearchEvent onSearch={setSearchTerm}/>

      <CategoryFilter onFilterChange={handleFilterChange} />
      <div className="event-lists">
        {/* <h2>Upcoming Events</h2> */}
        {loading ? (
          <p>Loading events...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : events.length === 0 ? (
          <p>No events available.</p>
        ) : (
          events.map((event) => (
            <EventItem
              id={event.event_id}
              key={event.event_id}
              title={event.title} 
              date={event.date}
              duration={event.duration}
              time={event.time}
              location={event.location}
              category={event.category_name || 'General'}
              color={event.color || '#007BFF'}
            />
          ))
        )}
      </div>
    </Layout>
  );
};

export default EventsListPage;



// import { toast } from "react-hot-toast";
// import EventItem from "../components/events/EventItem";
// import Layout from "../components/Layout";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";


// interface Event {
//     event_id: number;
//     title: string;
//     date: string;
//     time: string;
//     duration: string;
//     location: string;
//     description: string;
//     organizer_id: number;
//     category?: string; // Optional, not in DB
//     color?: string; // Optional, not in DB
//   }

// const EventsListPage: React.FC = () => {

//     const { token, logout } = useAuth();
//     const navigate = useNavigate();
//     const [events, setEvents] = useState<Event[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
  
//     useEffect(() => {
//       const fetchEvents = async () => {
//         if (!token) {
//           toast.error('Please log in to view events');
//           navigate('/login');
//           return;
//         }
  
//         try {
//           const response = await fetch('/api/events', {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
  
//           if (response.status === 401) {
//             toast.error('Session expired. Please log in again.');
//             logout();
//             navigate('/login');
//             return;
//           }
  
//           if (!response.ok) {
//             throw new Error('Failed to fetch events');
//           }
  
//           const data = await response.json();
//           console.log('Fetched events:', data);
  
//           // Add category and color defaults since they're not in DB
//           const alteredEvents = data.map((event: Event, index: number) => ({
//             ...event,
//             category: event.category || ['Workshop', 'Social', 'Career'][index % 3], // Cycle through categories
//             color: event.color || ['#007BFF', 'green', '#FF5733'][index % 3], // Cycle through colors
//           }));
  
//           setEvents(enhancedEvents);
//         } catch (err: any) {
//           console.error('Error fetching events:', err);
//           setError(err.message || 'Failed to load events');
//           toast.error('Failed to load events');
//         } finally {
//           setLoading(false);
//         }
//       };
  
//       fetchEvents();
//     }, [token, navigate, logout]);
//   // Example array of event objects
// // const events = [
// //     {

// //       title: "Tech Talk",
// //       date: "2025-04-20",
// //       time: "5:00 PM",
// //       location: "Auditorium A",
// //       category: "Workshop",
// //       color: "#007BFF"
// //     },
// //     {
// //       title: "Cultural Fest",
// //       date: "2025-04-22",
// //       time: "6:30 PM",
// //       location: "Open Grounds",
// //       category: "Social",
// //       color: "green"
// //     },
// //     {
// //       title: "Career Fair",
// //       date: "2025-04-25",
// //       time: "10:00 AM",
// //       location: "Main Hall",
// //       category: "Career",
// //       color: "#FF5733"
// //     }
// //   ];
  
//     // const token = useAuth();

//     // console.log(token)

//     return( 
//     // chronological order
//     // fileter and secrh
//     <>
//     <Layout>
//     {/* <EventItem title={} date={} time={} location={} category={}/> */}

//      {/* <select name="categories" id="">
//      <option value="volvo">Volvo</option>
//   <option value="saab">Saab</option>
//   <option value="mercedes">Mercedes</option>
//   <option value="audi">Audi</option>
//     </select>    */}
    
    
//     {events.map((event, index) => (
//         <EventItem
//         id={}
//           key={index}
//           title={event.title}
//           date={event.date}
//           time={event.time}
//           location={event.location}
//           category={event.category}
//           color={event.color}
    
//         />
//       ))}
//     </Layout>

    
    
//     </>)
// }

// export default EventsListPage;