import React from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
//pages
import AboutPage from './pages/AboutPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import './index.css'


const router = (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<AboutPage />} />
      <Route path="dashboard" element={<DashboardPage/>} />
      <Route path="dashboard/:deckId" element={<DashboardPage/>} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage/>} />
    </Route>
  </Routes>
);


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>{router}</Router>
  </React.StrictMode>
);

