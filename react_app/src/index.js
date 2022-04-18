import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import styles from './Styles/index.module.css';
import App from './App';
import configureStore from './store';

import { setModalMount } from './store/modal';

const store = configureStore();

const Root = () => {
  const dispatch = useDispatch();
  const modalMountRef = useRef(null);

  useEffect(() => {
    dispatch(setModalMount(modalMountRef.current))
  }, [dispatch])

  return (
    <div className={styles.super}>
      <App />
      <div ref={modalMountRef} className='modal'/>
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
