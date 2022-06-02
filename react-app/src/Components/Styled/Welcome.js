import styled, {css, keyframes} from "styled-components";
import { Black } from "./Fonts";

const lockin = keyframes`
    0% {
        width: 100vw;
        height: 100vh;
    }
    50% {
        width: 100vw;
        height: 100vh;
    }
    75% {
        width: 1600px;
        height: 60px;
    }
    90% {
        width: 1600px;
        height: 60px;
    }
    100% {
        width: 1600px;
        height: 0px;
        display: none;
    }
`;

const lockinBG = () => css`${lockin} 4s ease-in-out 1 normal forwards`;

const shrink = keyframes`
    0% {
        width: 8357.219px;
        height: 7133.676px;
    }
    25%{
        width: 592.167px;
        height: 505.471px;
    }
    90% {
        width: 592.167px;
        height: 505.471px;
    }
    100% {
        width: 0px;
        height: 0px;
        display: none;
    }
`;

const shrinkLogo = () => css`${shrink} 4s ease-in-out 1 normal forwards`;

const shrinkTitle = keyframes`
    0% {
        opacity: 0%;
        width: 500px;
        height: 300px;
        font-size: 300px;
    }
    25% {
        opacity: 0%;
        width: 500px;
        height: 300px;
        font-size: 200px;
    }
    50%{
        opacity: 100%;
        width: 500px;
        height: 300px;
        font-size: 100px;
    }
    90% {
        opacity: 100%;
        width: 500px;
        height: 300px;
        font-size: 100px;
    }
    100% {
        opacity: 0%;
        width: 0px;
        height: 0px;
        font-size: 0px;
        display: none;
    }
`;

const shrinkLogotype = () => css`${shrinkTitle} 4s ease-in-out 1 normal forwards`;

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
`;

export const LogoType = styled(Black)`
    animation: ${shrinkLogotype};
    color: ${props => props.theme === 'light' ? 'white' : '#191919'};
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
