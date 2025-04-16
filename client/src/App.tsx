import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/LoginPage'
import Register from './pages/RegisterPage'
import Home from './pages/Home'

import PrivateRoute from './components/PrivateRoute'
import EventsListPage from './pages/EventsListPage'
import EventDetailPage from './pages/EventDetailPage'
import OrganizerDetails from './components/organizer/organizerDetails'
import RegisteredEventsPage from './pages/RegisteredEventsPage'

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes */}
        <Route path="/" element={
          // <PrivateRoute>
            <Home />
          // </PrivateRoute>
        } />
        <Route path="/events" element={
          // <PrivateRoute>
            <EventsListPage />
          // </PrivateRoute>
        } />
        <Route path="/event/:id" element={
          // <PrivateRoute>
            <EventDetailPage />
          //  </PrivateRoute>
        }/>
        <Route path='/organizer/:id' element={
          <PrivateRoute>
            <OrganizerDetails/>
          </PrivateRoute>   
        }/>

        <Route path='/myevents' element={
          <PrivateRoute>
            <RegisteredEventsPage/>
          </PrivateRoute>
        }/>

        {/* <Route path="*" element={<h1>404 Not Found</h1>} /> */}

        


      </Routes>
    
    </BrowserRouter>
     
    </>
  )
}

export default App;
