import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode'; 


interface DecodedToken {
  user_id: number;
  email: string;
  // add role if needed
}


interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  user: number | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<number | null>(null);

  // Load token from localStorage on mount
  // useEffect(() => {
  //   const storedToken = localStorage.getItem('token');
  //   if (storedToken) {
  //     setTokenState(storedToken);
  //   }
  // }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setTokenState(storedToken);
  
      try {
        const decoded: DecodedToken = jwtDecode(storedToken);
        setUser(decoded.user_id);
      } catch (err) {
        console.error('Invalid token on load', err);
        setToken(null); // optional: force logout on bad token
      }
    }
  }, []);
  

  // Update localStorage whenever token changes
  // const setToken = (newToken: string | null) => {
  //   setTokenState(newToken);
  //   if (newToken) {
  //     localStorage.setItem('token', newToken);
  //   } else {
  //     localStorage.removeItem('token');
  //   }
  // };


  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem('token', newToken);
      const decoded: DecodedToken = jwtDecode(newToken);
      console.log("Token to decode:", newToken);

      setUser(decoded.user_id);
    } else {
      setUser(null);
      localStorage.removeItem('token');
    }
  };

  const logout = () => {
    setToken(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ token, user, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook 
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

