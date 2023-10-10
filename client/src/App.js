import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBarComponent from "./Navbar";
import CreatefreelancerProfileComponent from "./Freelancer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import CreatecorporateProfileComponent from "./Corporate"
import LandingPage from './LandingPage';

function App() {
  return (
    <Router>
      {/* <NavBarComponent /> */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/freelancerProfile" element={<CreatefreelancerProfileComponent />} />
        <Route path="/corporateProfile" element={<CreatecorporateProfileComponent />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
    
  );
}

export default App;
