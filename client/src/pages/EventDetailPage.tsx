import { useNavigate, useParams } from 'react-router-dom';
import { useAuthFetch } from '../hooks/useAuthFetch';
import { use, useState } from 'react';
import { useAuth } from '../context/AuthContext';
// import OrganizerDetails from '../components/organizer/organizerDetails';
// import Popup from '../components/utils/PopupModal';
import Layout from '../components/Layout';
// import { useEventRegistration } from '../hooks/useEventRegistration';
import EventRegistrationButton from '../components/events/EventRegButton';
import CategoryLabel from '../components/events/CategoryLabel';
import BackButton from '../components/utils/BackButton';

interface EventDetail {
  event_id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  description: string;
  category_id: number;
  organizer_id: number;
  category_name: string;
  organizer_name: string;
}




const EventDetailPage = () => {
  const {user} = useAuth();
  const {token} = useAuth();
  console.log(user)

  const { id } = useParams();
  // const [showPopup, setShowPopup] = useState(false);
// const [selectedOrganizerId, setSelectedOrganizerId] = useState<number | null>(null);
  

const { data: event, loading, error } = useAuthFetch<EventDetail>(`http://localhost:3001/api/event/${id}`);

  const { data: regData} = useAuthFetch<{ "COUNT(*)": number }>(`http://localhost:3001/api/event/reg/${id}`);


  const [showMore, setShowMore] = useState(false);

  const navigate = useNavigate();
  const eventId = Number(id); 

  const categoryColors: { [key: string]: string } = {
    Academic: '#007bff',
    Cultural: '#ff5733',
    Sports: '#28a745',
    Career: '#ffc107',
    Club: '#6f42c1',
    Entertainment: '#dc3545',
    General: '#6c757d', 
  };


  if (loading) return <div>Loading...</div>;
  if (error || !event) return <div>Error loading event details</div>;


  const color = event.category_name ? categoryColors[event.category_name] || 'gray' : 'gray';

console.log('orgeraniserrr id', event.organizer_id)

 
  const eventTitle = event.title;
  const eventLink = `https://myapp.com/events/${eventId}`;
  const message = `Hey! Let's attend "${eventTitle}" together! Check it out: ${eventLink}`;

  function copyLink() {
    navigator.clipboard.writeText(message).then(() => {
      alert("Copied to clipboard!");
      fetch(`/api/event/${eventId}/share`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
         },
         body: JSON.stringify({ eventId })
         }); 
    });
  }

  return (
    <Layout>
     
      <div className="event-page">
      <BackButton/>
        <div className="event-detail-card">
        
          <div>
            <div className="title-category">
              <h4 className="event-title">{event.title}</h4>
              <CategoryLabel label={event.category_name} color={color} />
              
            </div>

            <div className='flex-it'>
            <div>
  
              <p>
              <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong> {event.time}
            </p>
            <p>
              <strong>Duration:</strong> {event.duration || 'N/A'} h
            </p>
            <p>
          <strong>Location:</strong> {event.location}
        </p>

            <p><strong>No of students registered:</strong> {regData ? regData['COUNT(*)'] : 0}</p>
              
        <button className='show-more-btn' onClick={() => setShowMore(!showMore)}>
          {showMore ? 'Show Less' : 'Show More'}
        </button>

      </div>
          <div className="organizer-section">
        <div>
        <button
              className="organizer-link"
              onClick={() => navigate(`/organizer/${event.organizer_id}`)}
            >
              Organised by: {event.organizer_name}
              <i style={{ marginLeft: '5px' }} className="fa-solid fa-arrow-right"></i>
            </button> 
        </div>

          <div className="register-section">
          <EventRegistrationButton event_id={event.event_id} />
        </div>
        <div>
          <button className='photos-btn'>See Photos</button>
        </div>

     
        <div className="share-section">
          <button onClick={copyLink}>Copy Link</button>
        </div>
          </div>
          </div>
        </div>
        </div>
        {showMore && (
          <>
          <div className="description-block">
            <h4>Description</h4>
            <p>{event.description}</p>
          </div>
          <div className='maps-section'>

          </div>
          </>
         
        )}

      </div>
    </Layout>
//     <Layout>
//     <div className="event-container">
//     <div className='event-detail'>
//     <div>  

//     <div style={{display: 'flex',  alignItems: 'flex-end' }}>
                  
//     <h4 className="event-heading">{event.title} </h4> 
//     <p style={{paddingLeft: '200px',}}><CategoryLabel label={event.category_name} color={color}/></p>
//     </div>
  


//       <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
//       <p><strong>Time:</strong> {event.time}</p>
//       <p><strong>Duration:</strong> {event.duration || 'N/A'} h</p>
      
//     </div>

//       <div className='org-btn'>
//       <p>No of students registered :{regData ? regData["COUNT(*)"] : 0}</p>
//       <button className='organizer-btn' onClick={() => {navigate(`/organizer/${event.organizer_id}`)}}>
//   Organised by: {event.organizer_name}
// </button></div>

//     </div>


//       <p><strong>Location:</strong> {event.location}</p>
      

      
//       <button onClick={() => setShowMore(!showMore)}>show more</button>
//       {showMore && <>
//         <div className="event-description">
//         <h4>More Description</h4>
//         <p>{event.description}</p>
//       </div>
//       </>}


//       <div className="reg-event">

//     <EventRegistrationButton event_id={event.event_id} />



//         </div>

//         <div className='share-event'>
//         <button onClick={copyLink}>Copy Link</button>



//           {/* <button className=''> Share this event</button> */}
//         </div>

      
//     </div>
//     </Layout>
  );
};

export default EventDetailPage;









