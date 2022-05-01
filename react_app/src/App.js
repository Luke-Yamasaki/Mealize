//imports
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css'

//Context
import { useTheme } from './Context/ThemeContext';
import { useBackGround } from './Context/BackGroundContext';

// actions
import { authenticate } from './store/session';
import { getCategories } from './store/categories';
import { getBatchedOrganizations } from './store/organizations';
import { getBatchedUsers } from './store/users';
import { getAllPosts } from './store/posts';
import { getAllDeliveries } from './store/deliveries';

// Components
import { Home } from './Pages/Home';
// import { About } from './Pages/About';
// import { Questions } from './Pages/Questions';
// import { Nonprofits } from './Pages/Nonprofits';
// import { Businesses } from './Pages/Businesses';
// import { Categories } from './Pages/Categories';
// import { Users } from './Pages/Users';
// import { Settings } from './Pages/Settings';
import { Deliveries } from './Pages/Deliveries';
import { Customization } from './Components/Customization';
import { Navbar } from './Components/Navbar'
import { SessionNavbar } from './Components/SessionNavbar';
import { Footer } from './Components/Footer';
import Modal from './Components/Modal';

function App() {
  const { theme } = useTheme();
  const { backGround } = useBackGround();
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const className = backGround === true ? theme + 'Pattern' : theme;

  useEffect(() => {
    (async () => {
      await dispatch(authenticate())
      await dispatch(getCategories())
      await dispatch(getBatchedOrganizations())
      await dispatch(getAllPosts())
      await dispatch(getBatchedUsers())
      await dispatch(getAllDeliveries())
      setIsLoaded(true);
    })();
  },[dispatch]);

  if(!isLoaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <div className={[styles.bg, styles[`${className}`]].join(' ')}
      >
        <Customization />
        {sessionUser ? <SessionNavbar sessionUser={sessionUser} /> : <Navbar />}
        <Modal />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          {/* <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/questions'>
            <Questions />
          </Route> */}
          {/* <Route exact path='/nonprofits'>
            <Nonprofits />
          </Route>
          <Route exact path='/businesses'>
            <Businesses />
          </Route>
          <Route exact path='/categories'>
            <Categories />
          </Route> */}
          {/* <Route exact path='/users'>
            <Users />
          </Route>
          <Route exact path='/settings'>
            <Settings />
          </Route> */}
          {/* <Route exact path='/search/:searchword'>
            <h1>Search results</h1>
          </Route> */}
          {sessionUser &&
            <Route exact path='/deliveries'>
              <Deliveries />
            </Route>
          }
          <Route>
            <div style={{fontFamily: 'motiva-sans, sans-serif', fontWeight: '900', paddingTop: '20px', fontSize: '48px', width: '1600px', height: '60vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}> 404 Not Found. <img style={{objectFit: 'cover', objectPosition: 'center', width: '600px', height: '700px'}}src='https://live.staticflickr.com/2080/1576740677_c983d27842_b.jpg' alt='404 error' /></div>
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
