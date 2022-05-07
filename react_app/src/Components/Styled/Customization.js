import styled, { css, keyframes } from 'styled-components';
import { IconBox } from './Light/Layout';

const up = keyframes`
    0% { opacity: 35%; transform: rotate(0deg);}
    50% { opcaity: 75%;}
    100% { opacity: 100%; margin-top: -500px; transform: rotate(360deg);}
`;

const goUp = () =>
    css`
    ${up} 0.5s forwards;
    `

const down = keyframes`
    0% { opacity: 35%; margin-top: -500px; transform: rotate(0deg);}
    50% { opcaity: 75%;}
    100% { opacity: 100%; margin: 0px; transform: rotate(-360deg);}
`;

const goDown = () =>
    css`
    ${down} 0.5s forwards;
    `

export const CustomizationContainer = styled.div`
    margin-left: -25px;
    width: 300px;
    height: 600px;
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
    top: 0;
    color: ${props => props.theme === 'light' ? '#000000' : '#FFFFFF'};
`;

export const ContentContainer = styled.div`
    width: 300px;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    border-bottom: ${props => props.theme === 'light' ? '1px solid #D5D5D5' : '1px solid #616161'};
`;

export const Label = styled.p`
    margin: 0px;
    padding: 0px;
    font-size: 1em;
    color: ${props => props.theme === 'light' ? '#000000' : '#FFFFFF'};
    margin-left: 3.4em;
`;

export const IconContainer = styled(IconBox)`
    width: 100px;
    height: 50px;
    margin-left: -50px;
`;

export const SettingsBox = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    background-color: ${props => props.theme === 'light' ? '#327647' : '#76D97E' };
    animation: ${props => props.shown === 'goUp' ? goUp : props.shown === 'goDown' ? goDown : 'none'};
`;
