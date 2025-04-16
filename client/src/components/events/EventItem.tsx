import { useNavigate } from "react-router-dom";
import CategoryLabel from "./CategoryLabel";

interface EventListProps{
    id: number,
    title: string,
    date: string,
    time: string,
    location: string,
    duration: string,
    category: string,
    color: string


}

const EventItem: React.FC<EventListProps> = ({id, title, date, time,duration, location, category, color}) =>{

    const navigate = useNavigate();
    

    const time_shortened = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


    const handleClick = () => {
      navigate(`/event/${id}`);
    };

    const dateObj = new Date(date);
const formattedDate = dateObj.toLocaleDateString('en-IN', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});
const formattedTime = dateObj.toLocaleTimeString('en-IN', {
  hour: '2-digit',
  minute: '2-digit',
});


    return( 
        <>  
        <div className="event-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="evn">
        <div className="event-title">
          <h4>{title}</h4>
          <div className="event-date">
            <p><span>{formattedDate}</span></p>
            <p>
              <span>{formattedTime}</span>
            </p>
            <p>
              <span>Duration: {duration} h</span>
            </p>
            <p>
              <span>{location}</span>
            </p>
          </div>
        </div>
        <div className="event-category">
          <CategoryLabel label={category} color={color} />
        </div>
      </div>
    </div>
        
        </>
    )
}

export default EventItem;