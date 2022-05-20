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
import { Home } from './Pages/Home';
import { FourOFour } from './Pages/FourOFour';
import { Deliveries } from './Pages/Deliveries';
import { MessagesPage } from './Pages/Messages';
import { OrganizationPage } from './Pages/Organization';
import { SinglePostPage } from './Pages/SinglePost';
import { SearchPage } from './Pages/Search';

//Components
import { Settings } from './Assets/Icons/Settings';
import { SettingsBox } from './Components/Styled/Customization';
import Modal from './Components/Modal';
import { AppBackGround, AppContentContainer, BackGroundAside } from './Components/Styled/Layout';

//layouts
import { Navbar } from './Components/Navbar';
import { SessionNavbar } from './Components/Navbar/SessionNavbar';
import { Footer } from './Components/Footer';
import { CustomizationBox } from './Components/Customization/CustomizationField';

//Animation
import { goUp, goDown } from './Components/Styled/Customization';
import { expandField, shrinkField} from './Components/Styled/Layout';


function App() {
  const { theme } = useTheme();
  const { backGround } = useBackGround();
  const [isLoaded, setIsLoaded] = useState(false);
  const [count, setCount] = useState(0);
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
},[sessionUser])

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
        <BackGroundAside>
            <CustomizationBox animation={count > 0 && count % 2 === 1 ? expandField : count > 0 && count % 2 === 0 ? shrinkField : ''}/>
            <SettingsBox animation={count > 0 && count % 2 === 1 ? goUp : count > 0 && count % 2 === 0 ? goDown : ''} theme={theme} onClick={() => setCount(count + 1)}>
              <Settings theme={theme} />
            </SettingsBox>
        </BackGroundAside>
      </AppBackGround>
    </BrowserRouter>
  )
};

export default App;
