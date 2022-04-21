import styled from 'styled-components';
import pattern from '../../Assets/Images/Pattern.png';

export const Background = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url(${pattern});
    background-size: 60%;
    background-color: #005C4D;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow-x: hidden;
    overflow-y: scroll;

`;
