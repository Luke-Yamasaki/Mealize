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
// import { getAllDeliveries } from './store/deliveries';

//Pages
import { Home } from './Pages/Home';
import { FourOFour } from './Pages/FourOFour';
import { Deliveries } from './Pages/Deliveries';
//components
import { Customization } from './Components/Customization';
import Modal from './Components/Modal';
import { AppBackGround, AppContentContainer, BackGroundAside } from './Components/Styled/Layout';
//layouts
import { Navbar } from './Components/Navbar';
import { SessionNavbar } from './Components/Navbar/SessionNavbar';
import { Footer } from './Components/Footer';


function App() {
  const { theme } = useTheme();
  const { backGround } = useBackGround();
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate())
      await dispatch(getCategories())
      await dispatch(getBatchedOrganizations())
      await dispatch(getAllPosts())
      await dispatch(getBatchedUsers())
    })().then(() => setIsLoaded(true))
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
              <Home/>
          </Route>
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
  )
};

export default App;
