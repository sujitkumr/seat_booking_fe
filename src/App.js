import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Booking from './pages/Booking';
// import Login from './pages/Login'
// import SignUp from './pages/SignUp';
// import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/SignUp" element={<SignUp/>} />
          <Route
            path="/booking"
            element={
              <ChakraProvider>
                <Booking />
              </ChakraProvider>
            }
          />
        </Routes>
      </Router>
    );
  }
  
  export default App;