import Header from "../components/Header"
import TopBar from "../components/TopBar";
import '../App.css';
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import toast from "react-hot-toast";
import { useState } from "react";






const Home: React.FC = ()=>{

   
  return (
    <Layout>
      {/* searach here go to event details page  */}
      <div className="home-cards-container">
        <div className="home-card">
          <h3>📅 Streamlined Event Planning</h3>
          <p>
            Easily organize and manage college events with user-friendly tools designed to save time and reduce manual effort.
          </p>
        </div>
        <div className="home-card">
          <h3>👥 Role-Based Access</h3>
          <p>
            Organizers and students have customized dashboards, ensuring secure and relevant access to features and data.
          </p>
        </div>
        <div className="home-card">
          <h3>📈 Real-Time Updates</h3>
          <p>
            Stay informed with instant updates about registrations, schedules, and changes – all from one platform.
          </p>
        </div>
      </div>


    </Layout>
  )
}


export default Home;