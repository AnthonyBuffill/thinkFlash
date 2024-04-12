import React from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import Modal from './components/Modal.jsx';  //Modal component
//pages
import AboutPage from './pages/AboutPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import NewDeckPage from './pages/NewDeckPage.jsx'
import PlayPage from './pages/PlayPage.jsx'
import DeckPage from './pages/DeckPage.jsx';
import AddCardPage from './pages/AddCardPage.jsx';
// styles
import './assets/css/resets.css'
import './assets/css/index.css'
import TeamPage from './pages/TeamPage.jsx';



const router = (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<AboutPage />} />

      <Route path="team" element={<TeamPage/>} />
      <Route path="modal" element={<Modal/>} />
      <Route path="dashboard/" element={<DashboardPage/>} />
      <Route path="dashboard/:userId" element={<DashboardPage/>} />
      <Route path="deck" element={<DeckPage/>} />
      <Route path="deck/:deckId/:userId" element={<DeckPage/>} />
      <Route path="newDeck" element={<NewDeckPage/>} />
      <Route path="addCard" element={<AddCardPage/>} />
      <Route path="play/:deckId/:userId" element={<PlayPage/>} />
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

