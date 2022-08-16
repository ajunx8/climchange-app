import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import News from './components/News';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from './components/Footer';
import Profile from './pages/Profile';

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
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile">
              { !session ? <Auth /> : <Profile /> }
            </Route>
          <Route path="/news">
            <News />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>

      <Footer />

    </div>
  );
}

export default App;
