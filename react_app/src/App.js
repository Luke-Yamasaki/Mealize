import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <Background>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Home />
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
          <Route exact path='/inbox'>
            <Inbox />
          </Route>
        </Switch>
      </Background>
    </BrowserRouter>
  );
}

export default App;
