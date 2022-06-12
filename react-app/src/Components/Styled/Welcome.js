import styled, {css, keyframes} from "styled-components";
import { Black, ExtraBold, Medium } from "./Fonts";

const lockin = (width) => keyframes`
    0% {
        width: 115vw;
        height: 110vh;
    }
    40% {
        width: 115vw;
        height: 110vh;
    }
    70% {
        width: ${width};
        height: 50px;
        opacity: 100%;
    }
    85%{
        width: ${width};
        height: 50px;
        opacity: 0%;
    }
    100% {
        opacity: 0%;
        width: ${width};
        height: 0px;
    }
`;

const lockinBG = (width) => css`${lockin(width)} 5s ease-in-out 1 normal forwards`;

const shrink = (margin) => keyframes`
    0% {
        width: 326.45vw;
        height: 495.39vh;
        max-width: 8357.219px;
        max-height: 7133.676px;
    }
    20%{
        width: 23.13vw;
        height: 35.1vh;
        min-width: 200px;
        min-height: 200px;
        max-width: 592.167px;
        max-height: 505.471px;
    }
    30% {
        width: 23.13vw;
        height: 35.1vh;
        min-width: 200px;
        min-height: 200px;
        max-width: 592.167px;
        max-height: 505.471px;
    }
    40% {
        width: 23.13vw;
        height: 35.1vh;
        min-width: 200px;
        min-height: 200px;
        max-width: 592.167px;
        max-height: 505.471px;
        margin-left: 0px;
    }
    70% {
        width: 45px;
        height: 45px;
        min-width: 45px;
        min-height: 45px;
        max-width: 45px;
        max-height: 45px;
        display: none;
        margin-left: ${margin};
        opacity: 100%;
    }
    85%{
        width: 45px;
        height: 45px;
        min-width: 45px;
        min-height: 45px;
        max-width: 45px;
        max-height: 45px;
        display: none;
        margin-left: ${margin};
        opacity: 0%;
    }
    100% {
        opacity: 0%;
        width: 0px;
        height: 0px;
        min-width: 0px;
        min-height: 0px;
        max-width: 0px;
        max-height: 0px;
        display: none;
        margin-left: ${margin};
    }
`;

const shrinkLogo = (margin) => css`${shrink(margin)} 5s ease-in-out 1 normal forwards`;

const shrinkTitle = (startW, endW, startH, endH, startF, endF, startM, endM) => keyframes`
    0% {
        opacity: 0%;
        width: ${startW};
        height: ${startH};
        font-size: ${startF};
        margin: ${startM};
    }
    20%{
        opacity: 0%;
        width: ${startW};
        height: ${startH};
        font-size: ${startF};
        margin: ${startM};
    }
    40%{
        opacity: 100%;
        width: ${startW};
        height: ${startH};
        font-size: ${startF};
        margin: ${startM};
    }
    70% {
        width: ${endW};
        height: ${endH};
        font-size: ${endF};
        margin: ${endM};
        opacity: 100%;
    }
    85%{
        width: ${endW};
        height: ${endH};
        font-size: ${endF};
        margin: ${endM};
        opacity: 0%;
    }
    100% {
        opacity: 0%;
        width: 0px;
        height: 0px;
        font-size: 0px;
        margin: ${endM};
    }
`;

const shrinkLogotype = (startW, endW, startH, endH, startF, endF, startM, endM) => css`${shrinkTitle(startW, endW, startH, endH, startF, endF, startM, endM)} 5s ease-in-out 1 normal forwards`;

export const WelcomeAnimation = styled.div`
    background: linear-gradient(#76D97E, #28A690);
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    position: absolute;
    z-index: 500;
    @media only screen and (min-width: 1337px) {
        animation: ${lockinBG('1336px')};
    }
    @media only screen and (max-width: 1336px) {
        animation: ${lockinBG('100vw')};
    }
`;

export const LogoVectorBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    @media only screen and (min-width: 1337px) {
        animation: ${shrinkLogo('-1190px')};
    }
    @media only screen and (max-width: 1336px) {
        animation: ${shrinkLogo('calc(-100vw + 145px)')};
    }
`;

export const LogoType = styled(Black)`
    color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    position: absolute;
    @media only screen and (min-width: 1337px) {
        animation: ${shrinkLogotype('500px', '100px', '300px', '30px', '150px', '28px', '900px 0px 0px -25px', '4px 0px 0px -1023px')};
    }
    @media only screen and (max-width: 1336px) {
        animation: ${shrinkLogotype('500px', '100px', '300px', '30px', '100px', '28px', '900px 0px 0px 325px', '4px 0px 0px -1023px')};
    }
`;

export const WelcomeContent = styled.div`
    max-width: 1336px;
    width: 100vw;
    min-height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    padding-top: 50px;
    gap: 25px;
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
    animation-delay: 3.5s;
    max-width: 550px;
    width: 90vw;
    max-height: 550px;
    height: 90vw;
    opacity: 0%;
`;

export const GreetingText = styled(Black)`
    max-width: 900px;
    width: 90vw;
    height: 100px;
    font-size: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    animation: ${reveal};
    animation-delay: 3.5s;
    opacity: 0%;
    @media only screen and (max-width: 841px) {
        font-size: 60px;
    }
    @media only screen and (max-width: 671px) {
        font-size: 40px;
        margin-bottom: 50px;
    }
`;

export const Group = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
`;

export const MealizeTitle = styled(Black)`
    width: 600px;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

export const MealizeText = styled(ExtraBold)`
    width: 600px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: 0.1px;
    margin-bottom: 20px;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

export const SectionTitle = styled(Black)`
    width: 600px;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    font-size: 48px;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

export const LinkText = styled(Medium)`
    width: ${props => props.list ? '570px' : '600px'};
    height: auto;
    font-size: 21px;
    line-height: 30px;
    letter-spacing: 0.1px;
    margin-bottom: 20px;
    display: ${props => props.list ? 'list-item' : 'block'};
    list-style-position: ${props => props.list ? 'outside' : 'none'};
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

export const SectionText = styled(LinkText)`
    display: flex;
    align-items: center;
    justify-content: center;
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
    animation-delay: 3.5s;
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
    font-family: motiva-sans, sans-serif;
    font-weight: 700;
    font-size: 21px;
    margin: 0px 5px 0px 5px;
`;

export const WelcomeImages = styled.img`
    object-fit: ${props => props.fit ? props.fit : 'contain'};
    object-position: center;
    width: 600px;
    height: ${props => props.height ? props.height : '400px'};
    border-radius: 5px;
    margin-bottom: 25px;
`;

export const WelcomeDiagram = styled(WelcomeImages)`
    height: 600px;
    margin: 30px 0px 30px 0px;
`;
