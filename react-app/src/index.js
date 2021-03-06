//Hooks
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';

//Components
import App from './App';
import { RootContainer, ModalContainer } from './Components/Styled/Root';

// Context
import ThemeProvider from './Context/ThemeContext';
import ColorProvider from './Context/ColorContext';
import ContrastProvider from './Context/ContrastContext';
import SaturationProvider from './Context/SaturationContext';
import BackGroundProvider from './Context/BackGroundContext';
import LocationProvider from './Context/LocationContext';
import FilterProvider from './Context/FilterContext';
import DyslexicProvider from './Context/DyslexicContext';
//GlobalStyles
import GlobalFontStyle from './Fonts/fonts';

//Store
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
    <ThemeProvider>
      <ColorProvider>
        <ContrastProvider>
          <SaturationProvider>
            <BackGroundProvider>
              <LocationProvider>
                <FilterProvider>
                  <DyslexicProvider>
                    <GlobalFontStyle />
                      <RootContainer>
                        < App />
                        <ModalContainer ref={modalMountRef} />
                      </RootContainer>
                  </DyslexicProvider>
                </FilterProvider>
              </LocationProvider>
            </BackGroundProvider>
          </SaturationProvider>
        </ContrastProvider>
      </ColorProvider>
    </ThemeProvider>
  )
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
