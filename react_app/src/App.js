import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import logo from './logo.svg';
import styles from './Styles/App.module.css'

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <h1>Home</h1>
        </Route>
        <Route exact path='/about'>
          <h1>About</h1>
        </Route>
        <Route exact path='/questions'>
          <h1>Questions</h1>
        </Route>
        <Route exact path='/nonprofits'>
          <h1>All nonprofits</h1>
        </Route>
        <Route exact path='/businesses'>
          <h1>All businesses</h1>
        </Route>
        <Route exact path='/categories'>
          <h1>All categories</h1>
        </Route>
        <Route exact path='/users'>
          <h1>All users</h1>
        </Route>
        <Route exact path='/settings'>
          <h1>Settings</h1>
        </Route>
        <Route exact path='/inbox'>
          <h1>Messages</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
