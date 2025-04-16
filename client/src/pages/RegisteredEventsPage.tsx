import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import EventItem from "../components/events/EventItem"; // Unused, you can remove if not needed
import { useEventRegistration } from "../hooks/useEventRegistration"; // Unused, you can remove if not needed
import EventRegistrationButton from "../components/events/EventRegButton";
import SmallHeader from "../SmallHeader";

interface Event {
  event_id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  description: string;
  organizer_id: number;
  category_id: number; // Optional, not in DB
  category_name: string;
  color?: string; // Optional, not in DB
}

const RegisteredEventsPage: React.FC = () => {
  const { user, token } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);

  // Fetch the registered events
  const fetchRegisteredEvents = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/user/events", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: user }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch registered events");
      }

      const data = await response.json();
      setEvents(data);
    } catch (err) {
      console.error("Error fetching registered events:", err);
    }
  };


  useEffect(() => {
    if (user && token) {
      fetchRegisteredEvents();
    }
  }, [user, token]); 


  const isoString = "2025-04-30T18:30:00.000Z";
const dateObj = new Date(isoString);

// Format Date: DD-MM-YYYY
const formattedDate = dateObj.toLocaleDateString("en-US", ); 

// Format Time: HH:MM AM/PM
const formattedTime = dateObj.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

console.log("Date:", formattedDate);  
console.log("Time:", formattedTime);  

  return (
    <Layout>
      <SmallHeader title="Registered Events" />

      <div>
        <table>
          <thead>
            <tr>
              <th>Event Title</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Duration</th>
              {/* <th>Category</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event) => (
                <tr key={event.event_id}>
                  <td>{event.title}</td>
                  <td>{formattedDate}</td>
                  <td>{formattedTime}</td>
                  <td>{event.location}</td>
                  <td>{event.duration} h</td>
                  {/* <td>{event.category_name}</td> */}
                  <td>
                    <EventRegistrationButton event_id={event.event_id} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No registered events found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default RegisteredEventsPage;











// import { useEffect, useState } from "react";
// import Layout from "../components/Layout";
// import { useAuth } from "../context/AuthContext";
// import EventItem from "../components/events/EventItem";
// import { useEventRegistration } from "../hooks/useEventRegistration";
// import EventRegistrationButton from "../components/events/EventRegButton";

// interface Event {
//     event_id: number;
//     title: string;
//     date: string;
//     time: string;
//     duration: string;
//     location: string;
//     description: string;
//     organizer_id: number;
//     category_id: number; // Optional, not in DB
//     category_name:string;
//     color?: string; // Optional, not in DB
//   }



// const RegisteredEventsPage: React.FC = () => {
//     const {user, token} = useAuth();

//     const [events, setEvents] = useState<Event[]>([]);



//     const fetchRegisteredEvents = async () => {
//         try {
//           const response = await fetch('http://localhost:3001/api/user/reg-events', {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({
//               user_id: user,})
//           });

//           const data = await response.json();
//           setEvents(data);
//         } catch (err) { 
//           console.error('Error fetching registered events:', err);
//         }
//     }

//     useEffect(() => {   
//         fetchRegisteredEvents();
//     }, [events]);

       
    

//     return (
//         <Layout>

//             <div>

//                 {
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Event Title</th>
//                                 <th>Date</th>
//                                 <th>Time</th>
//                                 <th>Location</th>
//                                 <th>Duration</th>
//                                 <th>Category</th>
//                                 <th>Action</th>
                               
//                                 </tr>
//                                 </thead>

//                    { events.map((event) => (

                    
//                         <tr key={event.event_id}>
//                             <th>{event.title}</th>
//                             <th>{event.date}</th>
//                             <th>{event.time}</th>
//                             <th>{event.location}</th>
//                             <th>{event.duration}</th>
//                             <th>{event.category_name}</th>
//                             <th>
//                             <EventRegistrationButton event_id={event.event_id} />
//                             </th>
//                         </tr>
                       
//                     ))}
//                     </table>
//                 }



//             </div>


            
//         </Layout>
//     )
// }



// export default RegisteredEventsPage;