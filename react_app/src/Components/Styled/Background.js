import styled from 'styled-components';
import pattern from '../../Assets/Images/Pattern_5.png';

export const Background = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url(${pattern}),
    linear-gradient(rgba(40, 166, 144, 1), rgba(118, 217, 126, 1));
    background-size: 60%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow-x: hidden;
    overflow-y: scroll;

`;
