import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import styles from './index.module.css';
import App from './App';
import configureStore from './store';

// Context
import ThemeProvider from './Context/ThemeContext';
import ColorProvider from './Context/ColorContext';
import ContrastProvider from './Context/ContrastContext';
import SaturationProvider from './Context/SaturationContext';
import BackGroundProvider from './Context/BackGroundContext';
import LocationProvider from './Context/LocationContext';

import { setModalMount } from './store/modal';

const store = configureStore();

const Root = () => {
  const dispatch = useDispatch();
  const modalMountRef = useRef(null);

  useEffect(() => {
    dispatch(setModalMount(modalMountRef.current))
  }, [dispatch])

  return (
    <ThemeProvider>
      <ColorProvider>
        <ContrastProvider>
          <SaturationProvider>
            <BackGroundProvider>
              <LocationProvider>
                <div className={styles.super}>
                  <App />
                  <div ref={modalMountRef} className='modal'/>
                </div>
              </LocationProvider>
            </BackGroundProvider>
          </SaturationProvider>
        </ContrastProvider>
      </ColorProvider>
    </ThemeProvider>

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
