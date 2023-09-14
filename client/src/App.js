import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBarComponent from "./Navbar";
import HomeComponent from "./Home";
import UserProfileComponent from "./UserProfile";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS


function App() {
  return (
    <Router>
      <NavBarComponent />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/UserProfile" element={<UserProfileComponent />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
    
  );
}

export default App;
