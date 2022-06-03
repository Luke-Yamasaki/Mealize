import styled, {css, keyframes} from "styled-components";
import { Black, Bold, ExtraBold } from "./Fonts";

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
    justify-content: flex-start;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    padding-top: 100px;
    gap: 50px;
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
    animation: ${props => props.animation ? reveal : ''};
    animation-delay: ${props => props.animation ? '3.5s' : '0s'};
    width: ${props => props.square};
    height: ${props => props.square};
    opacity: ${props => props.animation ? '0%' : '100%'};
`;

export const GreetingText = styled(Black)`
    width: 900px;
    height: 100px;
    font-size: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    animation: ${props => props.animation ? reveal : ''};
    animation-delay: ${props => props.animation ? '3.5s' : '0s'};
    opacity: ${props => props.animation ? '0%' : '100%'};
`;

export const Group = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
`;

export const SectionTitle = styled(Black)`
    width: 900px;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

export const SectionText = styled(ExtraBold)`
    width: 600px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: 0.1px;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

const scale = keyframes`
    from{
        opacity: 0%;
        margin-top: -50px;
    }
    to {
        opacity: 100%;
        margin-top: 50px;
    }
`;

const scroll = css`${scale} 2s ease-in-out 3 normal forwards`;

export const AnimationBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 400px;
`;

export const ArrowBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${scroll};
    animation-delay: ${props => props.delay ? '3.5s' : 'none'};
    width: 200px;
    height: 200px;
    position: absolute;
    opacity: 0%;
`;

export const WelcomeList = styled.ul`
    width: 600px;
    margin: 0px;
    padding: 0px;
`;

export const WelcomeItem = styled.li`
    width: 600px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    list-style-type: disc;
    font-family: motiva-sans, sans-serif;
    font-weight: 700;
    font-size: 18px;
`;

export const WelcomeLink = styled.a`
    width: 600px;
    font-family: motiva-sans, sans-serif;
    font-weight: 700;
    font-size: 18px;
`;

export const WelcomeImages = styled.img`
    object-fit: contain;
    object-position: center;
    width: 900px;
    height: 600px;
    border-radius: 5px;
`;
