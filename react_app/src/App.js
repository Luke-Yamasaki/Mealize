//imports
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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

//Pages
import { Home } from './Pages/Home';
import { FourOFour } from './Pages/FourOFour';
// import { About } from './Pages/About';
// import { Questions } from './Pages/Questions';
// import { Nonprofits } from './Pages/Nonprofits';
// import { Businesses } from './Pages/Businesses';
// import { Categories } from './Pages/Categories';
// import { Users } from './Pages/Users';
// import { Settings } from './Pages/Settings';
import { Deliveries } from './Pages/Deliveries';
//components
import { Customization } from './Components/Customization';
import Modal from './Components/Modal';
import { AppBackGround, AppContentContainer, BackGroundAside } from './Components/Styled/Layout';
//layouts
import { Navbar } from './Layout/Navbar';
import { SessionNavbar } from './Layout/Navbar/SessionNavbar';
import { Footer } from './Layout/Footer';


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
      setIsLoaded(true);
    })();
  },[dispatch]);

  if(!isLoaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <AppBackGround theme={theme} background={backGround}>
        <BackGroundAside />
        <AppContentContainer>
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
            <FourOFour />
          </Route>
        </Switch>
        <Footer />
        </AppContentContainer>
        <BackGroundAside>
            <Customization />
        </BackGroundAside>
      </AppBackGround>
    </BrowserRouter>
  );
}

export default App;
