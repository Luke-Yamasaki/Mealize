import styled, {css, keyframes} from "styled-components";
import { Black } from "./Fonts";

const lockin = keyframes`
    0% {
        width: 100vw;
        height: 100vh;
    }
    20% {
        width: 100vw;
        height: 100vh;
    }
    30% {
        width: 100vw;
        height: 100vh;
    }
    40% {
        width: 100vw;
        height: 100vh;
    }
    70% {
        width: 1600px;
        height: 60px;
        opacity: 100%;
    }
    85%{
        width: 1600px;
        height: 60px;
        opacity: 0%;
    }
    100% {
        opacity: 0%;
        width: 1600px;
        height: 0px;
    }
`;

const lockinBG = () => css`${lockin} 5s ease-in-out 1 normal forwards`;

const shrink = keyframes`
    0% {
        width: 8357.219px;
        height: 7133.676px;
    }
    20%{
        width: 592.167px;
        height: 505.471px;
    }
    30% {
        width: 592.167px;
        height: 505.471px;
    }
    40% {
        width: 592.167px;
        height: 505.471px;
        margin-left: 0px;
    }
    70% {
        width: 45px;
        height: 45px;
        display: none;
        margin-left: -1455px;
        opacity: 100%;
    }
    85%{
        width: 45px;
        height: 45px;
        display: none;
        margin-left: -1455px;
        opacity: 0%;
    }
    100% {
        opacity: 0%;
        width: 0px;
        height: 0px;
        display: none;
        margin: 0px 0px 0px -1455px;
    }
`;

const shrinkLogo = () => css`${shrink} 5s ease-in-out 1 normal forwards`;

const shrinkTitle = keyframes`
    0% {
        opacity: 0%;
        width: 500px;
        height: 300px;
        font-size: 150px;
        margin: 900px 0px 0px -25px;
    }
    20% {
        opacity: 0%;
        width: 500px;
        height: 300px;
        font-size: 150px;
        margin: 900px 0px 0px -25px;
    }
    30%{
        opacity: 100%;
        width: 500px;
        height: 300px;
        font-size: 150px;
        margin: 900px 0px 0px -25px;
    }
    40%{
        opacity: 100%;
        width: 500px;
        height: 300px;
        font-size: 150px;
        margin: 900px 0px 0px -25px;
    }
    70% {
        width: 100px;
        height: 30px;
        font-size: 28px;
        margin: 10px 0px 0px -1278px;
        opacity: 100%;
    }
    85%{
        width: 100px;
        height: 30px;
        font-size: 28px;
        margin: 10px 0px 0px -1278px;
        opacity: 0%;
    }
    100% {
        opacity: 0%;
        width: 0px;
        height: 0px;
        font-size: 0px;
        margin: 10px 0px 0px -1278px;
    }
`;

const shrinkLogotype = () => css`${shrinkTitle} 5s ease-in-out 1 normal forwards`;

export const WelcomeAnimation = styled.div`
    background: linear-gradient(#76D97E, #28A690);
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    animation: ${lockinBG};
    position: absolute;
    z-index: 500;
`;

export const LogoVectorBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${shrinkLogo};
    position: absolute;
`;

export const LogoType = styled(Black)`
    animation: ${shrinkLogotype};
    color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    position: absolute;
`;

export const WelcomeContent = styled.div`
    width: 1600px;
    min-height: 900px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
`;

const changeOpacity = keyframes`
    from{
        opacity: 0%;
    }
    to {
        opacity: 100%;
    }
`;

const reveal = css`${changeOpacity} 1.5s ease-in-out 1 normal forwards`;


export const HandVectorBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${reveal};
    animation-delay: 4s;
    width: ${props => props.square};
    height: ${props => props.square};
    opacity: 0%;
`;

export const GreetingText = styled(Black)`
    width: 900px;
    height: 100px;
    font-size: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    animation: ${reveal};
    animation-delay: 4s;
    opacity: 0%;
`;
