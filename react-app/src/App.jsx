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
import { getBatchedOrganizations, getOneOrganization } from './store/organizations';
import { getBatchedUsers } from './store/users';
import { getAllPosts } from './store/posts';
import { getAllDeliveries } from './store/deliveries';

//Pages
import { Welcome } from './Pages/Welcome';
import { Home } from './Pages/Home';
import { FourOFour } from './Pages/FourOFour';
import { Deliveries } from './Pages/Deliveries';
import { MessagesPage } from './Pages/Messages';
import { OrganizationPage } from './Pages/Organization';
import { SinglePostPage } from './Pages/SinglePost';
import { SearchPage } from './Pages/Search';

//Components
import Modal from './Components/Modal';
import { AppBackGround, AppContentContainer } from './Components/Styled/Layout';

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
      setIsLoaded(true)
    })()
  },[dispatch]);

  useEffect(() => {
    if(sessionUser) {
        dispatch(getOneOrganization(sessionUser.organizationId));
        dispatch(getAllDeliveries())
    }
},[sessionUser, dispatch])

  if(!isLoaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <AppBackGround theme={theme} background={backGround}>
        <AppContentContainer>
          {sessionUser ? <SessionNavbar sessionUser={sessionUser} /> : <Navbar theme={theme} />}
          <Modal />
          <Switch>
          <Route exact path='/welcome'>
            <Welcome/>
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path={['/deliveries', '/deliveries/:id']}>
            <Deliveries />
          </Route>
          <Route exact path={['/messages', '/messages/:id']}>
            <MessagesPage />
          </Route>
          <Route exact path='/organizations/:id'>
            <OrganizationPage />
          </Route>
          <Route exact path='/posts/:id'>
            <SinglePostPage />
          </Route>
          <Route exact path='/search/:searchword'>
            <SearchPage />
          </Route>
          <Route>
            <FourOFour />
          </Route>
          </Switch>
          <Footer />
        </AppContentContainer>
      </AppBackGround>
    </BrowserRouter>
  )
};

export default App;
