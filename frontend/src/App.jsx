import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PolicyPage from "./pages/PolicyPage";
import ProfilePage from "./pages/ExportDetails";

import SignInExpert from "./pages/SignInExpert";

import SignUpExpert from "./pages/SignUpExpert";




import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { UserProvider } from './context/UserContext';
import AddService from "./pages/AddService";
import ExportDetails from "./pages/ExportDetails";

import ServiceDetailsPage from "./pages/ServiceDetailsPage"; 

import ProfileExpert from "./pages/ProfileExpert";
import EditServicePage from "./pages/EditServicePage"; // adjust the path if different
import BookNowPage from "./pages/BookNowPage";


// Inside your <Routes>

const App = () => {
  return (
    
      <Router>
        <Routes>
       

          {/* Layout-wrapped routes */}
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="policy" element={<PolicyPage/>}/>
            <Route path="profile" element={<ProfilePage />} />
        
            <Route path="signin/expert" element={<SignInExpert />} />
     
            <Route path="signup/expert" element={<SignUpExpert />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
           
           
           
            <Route path="/profileExport/:id" element={<ProfileExpert/>} /> {/* ✅ Route for expert */}
            <Route path="/createService/:id" element={<AddService />} />
            <Route path="/expert-details/:id" element={<ExportDetails />} /> 
           
            <Route path="/service/:id" element={<ServiceDetailsPage />} />
            <Route path="/service/update/:id" element={<EditServicePage />} />
            <Route path="/book/:id" element={<BookNowPage />} />

          


          </Route>
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
   
  );
};

export default App;




