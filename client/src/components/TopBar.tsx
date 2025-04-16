import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

interface UserDetails {
        name: string;
    }

const TopBar = () =>{

    const { token } = useAuth();
    const {user} = useAuth();
    const [userDetails, setUserDetails] = useState<UserDetails>();

    console.log('this user', user)
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body : JSON.stringify({user_id : user})
        });

        if (response.status === 401) {
          toast.error('Session expired. Please log in again.');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        const data = await response.json(); 
        console.log('User details:', data);
        setUserDetails(data);

    } catch (err) {
        console.error('Error fetching user:', err);
        toast.error('Failed to fetch user');
      }
    };  

    useEffect(() => {
        if (token, user) {
          fetchUser();
        }
      }, [token, user]);
    return(

        <>
        {/* <div className="main-container"> */}
        {userDetails     ? (
  <h4>Welcome <span>{userDetails.name}</span>!</h4>
) : (
  <h4>Loading...</h4>
)}
        {/* </div> */}
        </>
    )
}

export default TopBar;