import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import styles from './Styles/index.module.css';
import App from './App';
import configureStore from './store';

const store = configureStore();

const Root = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <App />
      <div />
    </div>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
