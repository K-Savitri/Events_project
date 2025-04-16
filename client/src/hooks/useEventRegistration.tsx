import { useReducer, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

interface State {
  isRegistered: boolean;
  load: boolean;
  error: string | null;
}

type Action =
  | { type: "CHECK_START" }
  | { type: "CHECK_SUCCESS"; payload: boolean }
  | { type: "CHECK_ERROR"; payload: string }
  | { type: "REGISTER_SUCCESS" }
  | { type: "CANCEL_SUCCESS" };

const initialState: State = {
  isRegistered: false,
  load: false,
  error: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CHECK_START":
      return { ...state, load: true, error: null };
    case "CHECK_SUCCESS":
      return { ...state, isRegistered: action.payload, load: false };
    case "CHECK_ERROR":
      return { ...state, error: action.payload, load: false };
    case "REGISTER_SUCCESS":
      return { ...state, isRegistered: true };
    case "CANCEL_SUCCESS":
      return { ...state, isRegistered: false };
    default:
      return state;
  }
};

export const useEventRegistration = (user_id: number, event_id: number) => {
    console.log("useEventRegistration input ", user_id, event_id);
  
  
    const { token } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  // Checking registration status
  const checkRegistration = async () => {
    dispatch({ type: "CHECK_START" });
    try {
      const res = await fetch("http://localhost:3001/api/user/check-reg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id, event_id }),
      });
      const data = await res.json();
      dispatch({ type: "CHECK_SUCCESS", payload: data.isRegistered });
    } catch (err: any) {
      dispatch({ type: "CHECK_ERROR", payload: err.message || "Failed to check registration" });
    }
  };

  // Register for event
  const register = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/user/reg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id, event_id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      dispatch({ type: "REGISTER_SUCCESS" });
      toast.success("Successfully registered!");
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    }
  };

  // Cancel registration
  const cancel = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/user/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id, event_id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      dispatch({ type: "CANCEL_SUCCESS" });
      toast.success("Registration cancelled");
    } catch (err: any) {
      toast.error(err.message || "Cancellation failed");
    }
  };

  useEffect(() => {
    checkRegistration();
  }, [user_id, event_id]);

  return {
    ...state,
    checkRegistration,
    register,
    cancel,
  };
};
