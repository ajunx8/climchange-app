import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { supabase } from './supabaseClient'
import Account from './Account';
import Auth from './Auth';

import Charts from './components/Charts';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Footer from './components/Footer';
import WeatherSearch from './components/WeatherSearch';
import './App.css'
import './styles/Navbar.css';


function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
  setSession(supabase.auth.session())

  navigator.geolocation.getCurrentPosition(function(position) {
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
  });

  supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session)
  })
  }, [])

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/profile" element={ !session ? <Auth /> : <Account key={session.user.id} session={session} /> } />
          <Route path="/charts" element={<Charts />}/>
          <Route path="/posts" element={ !session ? <Auth /> : <Posts key={session.user.id} session={session} /> }/>
          <Route path="/" element={<Home />}/>
        </Routes>
      </Router>
      <WeatherSearch />
      <Footer />
    </div>
  );
}

export default App;
