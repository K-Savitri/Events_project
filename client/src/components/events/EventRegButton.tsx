
// import React from 'react';
// import { useEventRegistration } from '../../hooks/useEventRegistration';
// import { useAuth } from '../../context/AuthContext';

// interface Props {
//   event_id: number;
// }

// const EventRegistrationButton: React.FC<Props> = ({ event_id }) => {
//   const { user } = useAuth();
//   const user_id = user;

//   const canCallHook = user_id && event_id;

//   const regHook = canCallHook
//     ? useEventRegistration(user_id, event_id)
//     : { isRegistered: false, load: true, register: () => {}, cancel: () => {} };

//   const { isRegistered, load, register, cancel } = regHook;

//   if (load) return <p>Loading registration status...</p>;

//   return (
//     <div className="reg-event">
//       {isRegistered ? (
//         <button className="cancel-btn" onClick={cancel}>Cancel Registration</button>
//       ) : (
//         <button className="reg-event-btn" onClick={register}>Register Event</button>
//       )}
//     </div>
//   );
// };

// export default EventRegistrationButton;



import { useEventRegistration } from "../../hooks/useEventRegistration";
import { useAuth } from "../../context/AuthContext";

interface Props {
  event_id: number;
}

const EventRegistrationButton: React.FC<Props> = ({ event_id }) => {
  const { user } = useAuth();
  const { isRegistered, load, register, cancel } = useEventRegistration(user, event_id);

  if (load) return <p>Loading...</p>;

  return (
    <>
      {isRegistered ? (
        <button className="cancel-btn" onClick={cancel}>
          Cancel Registration
        </button>
      ) : (
        <button className="reg-event-btn" onClick={register}>
          Register Event
        </button>
      )}
    </>
  );
};

export default EventRegistrationButton;