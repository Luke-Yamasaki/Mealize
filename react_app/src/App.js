import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// actions
import { authenticate } from './store/session';
import { getCategories } from './store/categories';
import { getBatchedOrganizations } from './store/organizations';
import { getBatchedUsers } from './store/users';
import { getAllPosts } from './store/posts';
// Components
import { Home } from './Pages/Home';
import { About } from './Pages/About';
import { Questions } from './Pages/Questions';
import { Nonprofits } from './Pages/Nonprofits';
import { Businesses } from './Pages/Businesses';
import { Categories } from './Pages/Categories';
import { Users } from './Pages/Users';
import { Settings } from './Pages/Settings';
import { Inbox } from './Pages/Inbox';
import { Background } from './Components/Styled/Background';
import { Navbar } from './Components/Navbar'
import { SessionNavbar } from './Components/SessionNavbar';
import Modal from './Components/Modal';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const allPosts = useSelector((state) => Object.values(state.posts))

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
      <Background>
        {sessionUser ? <SessionNavbar sessionUser={sessionUser} /> : <Navbar />}
        <Modal />
        <Switch>
          <Route exact path='/'>
            <Home allPosts={allPosts}/>
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/questions'>
            <Questions />
          </Route>
          <Route exact path='/nonprofits'>
            <Nonprofits />
          </Route>
          <Route exact path='/businesses'>
            <Businesses />
          </Route>
          <Route exact path='/categories'>
            <Categories />
          </Route>
          <Route exact path='/users'>
            <Users />
          </Route>
          <Route exact path='/settings'>
            <Settings />
          </Route>
          <Route exact path='/search/:searchword'>
            <h1>Search results</h1>
          </Route>
          <Route exact path='/inbox'>
            <Inbox />
          </Route>
        </Switch>
      </Background>
    </BrowserRouter>
  );
}

export default App;
