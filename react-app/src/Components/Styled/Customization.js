import styled, { css, keyframes } from 'styled-components';
import { VectorBox } from './Layout';
import { expandField } from './Layout';

const up = keyframes`
    0% { opacity: 35%; transform: rotate(0deg);}
    50% { opcaity: 75%; margin-top: -500px; margin-left: 0px;}
    100% { opacity: 100%; transform: rotate(360deg); margin-top: -500px; margin-left: 350px;}
`;

export const goUp = () =>
    css`
    ${up} 0.85s forwards;
    `

const down = keyframes`
    0% { opacity: 35%; transform: rotate(0deg); margin-top: -500px; margin-left: 400px;}
    50% { opcaity: 75%; margin-top: -500px; margin-left: 0px;}
    100% { opacity: 100%; margin-top: 0px; transform: rotate(360deg); margin-left: 0px;}
`;

export const goDown = () =>
    css`
    ${down} 1.1s forwards;
`

export const CustomizationContainer = styled.div`
    margin-left: -25px;
    margin-top: -250px;
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: center;
    border: 1px solid;
    border-color: ${props => props.theme === 'light' ? '#D5D5D5' :  '#616161'};
    border-radius: 5px;
    background-color: ${props => props.theme === 'light' ? '#FFFFFF' : '#191919'};
    font-family: motiva-sans, sans-serif;
    font-style: normal;
    font-weight: 700;
    position: -webkit-sticky;
    position: sticky;
    will-change: transform;
    top: 0px;
    color: ${props => props.theme === 'light' ? '#000000' : '#FFFFFF'};
    animation: ${props => props.animation};
    animation-delay: ${props => props.animation === expandField ? '0.3s' : '0s'};
    overflow: hidden;
`;

export const ContentContainer = styled.div`
    width: 300px;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    border-bottom: ${props => props.theme === 'light' ? '1px solid #D5D5D5' : '1px solid #616161'};
`;

export const Label = styled.p`
    margin: 0px;
    padding: 0px;
    font-size: 16px;
    margin-left: ${props => props.margin ? props.margin : '5px'};
    color: ${props => props.theme === 'light' ? '#000000' : '#FFFFFF'};
`;

export const IconContainer = styled(VectorBox)`
    width: 50px;
    height: 50px;
    border-radius: 5px;
    margin-left: 10px;
    background-color: ${props => props.background};
    &:hover {
        transform: none;
        width: 50px;
        height: 50px;
    }
`;

export const SettingsBox = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    background-color: ${props => props.theme === 'light' ? '#327647' : '#76D97E' };
    animation: ${props => props.animation};
`;

export const LabelToggleBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    width: 200px;
`;

export const ToggleBox = styled.div`
    width: 50px;
    height: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: ${props => props.direction};
    padding: 2px;
    border: ${props => props.theme === 'light' ? '2px solid rgba(0, 0, 0, 0.5)' : '1px solid rgba(255, 255, 255, 0.25)'};
    border-radius: 30px;
    background-color: ${props => props.selected ? '#76D97E' : 'none'};
`;

export const ToggleCircle = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 30px;
    background-color: ${props => props.type !== 'theme' && props.theme === 'dark' && !props.selected ? 'white' : '#191919'};
`;
