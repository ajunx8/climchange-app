import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import News from './components/News';
import Home from './pages/Home';
import Profile from './pages/Profile';


export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <BrowserRouter>
      <Switch>
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
    </BrowserRouter> 
  )
}