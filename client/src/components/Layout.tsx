// components/Layout.tsx
import React from 'react';
import Header from "./Header";
import TopBar from "./TopBar";
import '../App.css';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    const location = useLocation();

    const isHome  = location.pathname === '/';
  return (
    <>
      <Header />
      <div className="main-container">

          {isHome && <TopBar />}
        
        {children}
      </div>
    </>
  );
};

export default Layout;
