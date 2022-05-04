import styled from 'styled-components';

export const AppBackGround = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow-x: hidden;
    overflow-y: scroll;
    background: ${props => props.theme === 'light' ? 'linear-gradient(rgba(40, 166, 144, 1), rgba(118, 217, 126, 1))' : '#191919' };
    background-image: ${props => props.background === true ? "url('./Assets/Images/Pattern_10.png')" : 'none'};
    background-size: contain;
    background-repeat: repeat;
  `;
