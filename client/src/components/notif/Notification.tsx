import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

interface NotificationProps {
  // userId: number;
  onClose: () => void;
}

interface Reminder {
  event_id: number;
  title: string;
  date: string;
  reminder_time: string;
  duration: number;
}

const Notification: React.FC<NotificationProps> = ({ onClose }) => {
  const [notifications, setNotifications] = useState<Reminder[]>([]);
  const {user}  = useAuth();
  const userId = Number(user)
  

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/user/reminder/${userId}`);
        const data: Reminder[] = await response.json();

        const now = new Date();

        const filtered = data.filter((notif) => {
          const eventDateTime = new Date(notif.date);
          
          // 1 h less
          const reminderTime = new Date(eventDateTime);
          reminderTime.setHours(reminderTime.getHours() - 1);

          // only show notifications within ±5 minutes of this reminderTime
          const diff = Math.abs(reminderTime.getTime() - now.getTime());

          return diff <= 5 * 60 * 1000; 
        });

        setNotifications(filtered);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();

    // Refresh every 1 minute
    const interval = setInterval(fetchNotifications, 60 * 1000);
    return () => clearInterval(interval);
  }, [userId]);

  return (
    <div className="notifications">
      <button className="close-btn" onClick={onClose}>×</button>
      <h3>Upcoming Reminders (1h before event)</h3>
      {notifications.length === 0 ? (
        <p>No upcoming reminders</p>
      ) : (
        <ul>
          {notifications.map((notif) => (
            <li key={notif.event_id}>
  <strong>{notif.title}</strong> – Starts at{" "}
            {new Date(notif.date).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
