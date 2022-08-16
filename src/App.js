import './index.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Account from './Account'
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


  // {/* {!session ? <Auth /> : <Account key={session.user.id} session={session} />} */}
  //     <BrowserRouter>
  //   <div className="container" style={{ padding: '50px 0 100px 0' }}>
  //       <Switch>
  //         <Route index element={<App />}/>
  //         <Route path="/profile" >
  //           {!session ? <Auth /> : <News />}
  //         </Route>
  //       </Switch>
  //   </div>
  //     </BrowserRouter>
  // )



//////////////////////////////////////////////

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
