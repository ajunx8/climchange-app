// import { Doughnut } from 'react-chartjs-2';
import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import News from './components/News';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Posts from './pages/Posts';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from './components/Footer';
import Account from './Account';
import './styles/Navbar.css';


function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
  setSession(supabase.auth.session())

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
          <Route path="/news" element={<News />}/>
          <Route path="/posts" element={ !session ? <Auth /> : <Posts key={session.user.id} session={session} /> }/>
          <Route path="/" element={<Home />}/>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
