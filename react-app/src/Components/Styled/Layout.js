import styled, {css, keyframes} from 'styled-components';
import { ExtraBold, Bold } from './Fonts';

const expand = keyframes`
    from { opacity: 0%; width: 0px; visibility: hidden; margin-right: 0px}
    to { opacity: 100%; width: 425px; visibility: visible; margin-right: 160px}
`;

export const expandField = () =>
    css`
    ${expand} 0.6s forwards;
`

const shrink = keyframes`
    0% { width: 300px; visibility: visible; margin-right: 120px;}
    99% { visibility: visible; margin-right: 20px;}
    100% { width: 0px; visibility: hidden; margin-right: 0px;}
`;

export const shrinkField = () =>
    css`
    ${shrink} 0.6s forwards;
    `


export const AppBackGround = styled.div`
    width: 100vw;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: top;
    background-image: ${
    props => props.theme === 'light' && props.background === 'true' ?
    'linear-gradient(rgba(118, 217, 126, 0.75), rgba(40, 166, 144, 0.75)), url("https://mealize.s3.amazonaws.com/Pattern_10.png")'
    : props.theme === 'light' && props.background === 'false' ?
    'linear-gradient(rgba(118, 217, 126, 0.75), rgba(40, 166, 144, 0.75))'
    : props.theme === 'dark' && props.background === 'true' ?
    'linear-gradient(rgba(25, 25, 25, 0.85), rgba(25, 25, 25, 0.85)), url("https://mealize.s3.amazonaws.com/Pattern_10.png")'
    : 'linear-gradient(rgba(25, 25, 25, 0.85), rgba(25, 25, 25, 0.85))'
    };
    background-size: contain;
    background-repeat: repeat;
`;

export const AppContentContainer = styled.div`
    max-width: 1336px;
    width: 100vw;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export const PageBackGround = styled.div`
    max-width: 1284px;
    width: calc(100vw - 50px);
    min-height: calc(100vh - 50px);
    background: ${props => props.background};
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.position ? props.position : 'space-around'};
    align-items: top;
    filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.35));
    padding: 20px 25px 50px 25px;
    gap: 75px;
    border: 1px solid;
    border-color: ${props => props.bordercolor};
`;

export const BackGroundAside = styled.aside`
    width: 100px;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    margin-left: -100px;
    will-change: transform;
`;

export const FilterTitle = styled(ExtraBold)`
    margin-bottom: -5px;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

export const SideBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-start;
    width: 150px;
    height: 870px;
    padding-top: 10px;
    gap: 25px;
`;

export const SideField = styled.fieldset`
    width: 120px;
    height: auto;
    border-radius: 5px;
    border: ${props => props.theme === 'light' ? '1px solid rgba(0, 0, 0, 0.2)' : '1px solid #616161'};
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-around;
    font-size: 16px;
    padding: 10px;
`;

export const SideLegend = styled.legend`
    font-family: motiva-sans, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 20px;
    font-size: 14px;
    background-color: ${props => props.theme === 'light' ? '#9AF2C0' : '#76D97E'};
    border: 1px solid;
    border-color: rgba(40, 166, 144, 0.5);
    border-radius: 3px;
    color: black;
    font-weight: 500;
`;

export const EventField = styled.fieldset`
    width: 200px;
    height: 400px;
    border-radius: 5px;
    border: 1px solid #B2B2B2;
    background-color: #E8E8E8;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-around;
    font-size: 1em;
    padding: 0px;
    margin: 0px;
`;

export const EventLegend = styled.legend`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 20px;
    font-size: 14px;
    background-color: #9AF2C0;
    border: 1px solid rgba(40, 166, 144, 0.5);
    border-radius: 3px;
    color: black;
    margin-left: 5px;
`;

export const SideBarInfoBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 10px;
    align-items: center;
    width: 125px;
    height: 50px;
    cursor: pointer;
`;

export const SideBarViewAll = styled(SideBarInfoBox)`
    height: 30px;
    cursor: pointer;
    text-decoration: underline;
`;

export const SideBarInfoText = styled(Bold)`
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    font-size: 12px;
    &:hover {
        text-decoration: underline;
    }
`;

export const FeedContainer = styled.div`
    max-width: 820px;
    width: calc(100vw - 350px);
    min-width: 350px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 25px;
    row-gap: 20px;
    flex-wrap: wrap;
`;

export const PostsTitle = styled(ExtraBold)`
    margin: 8px 0px 15px 0px;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

export const PostsSection = styled.section`
    max-width: 900px;
    width: calc(100vw - 125px);
    height: auto;
    display: flex;
    flex-direction: column;
`;

export const VectorBox = styled.div`
    width: ${props => props.square ? props.square : '30px'};
    height: ${props => props.square ? props.square : '30px'};
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${props => props.data?.length > 0 ? '1' : props.data?.length === 0 ? '0.25' : '1'};
    cursor: ${props => props.cursor ? props.cursor : 'default'};
    &:hover {
       width: ${props => props.resize ? props.resize : props.square ? props.square : '30px'};
       height: ${props => props.resize ? props.resize : props.square ? props.square : '30px'};
       transform: ${props => props.resize ? 'scale(1.1)' : ''};
    }
`;

export const MealizeLogoBox = styled(VectorBox)`
    object-fit: contain;
`;

export const ImageBox = styled.img`
    width: ${props => props.square ? props.square : '30px'};
    height: ${props => props.square ? props.square : '30px'};
    border-radius: 5px;
    object-fit: cover;
    object-position: center;
    background-color: black;
    &:hover {
        width: ${props => props.resize ? props.resize : props.square ? props.square : '30px'};
        height: ${props => props.resize ? props.resize : props.square ? props.square : '30px'};
        transform: ${props => props.resize ? 'scale(1.1)' : ''};
        opacity: ${props => props.opacity ? props.opacity : '100%'};
     }
`;

export const SettingsField = styled.div`
    width: 0px;
    height: 650px;
    visibility: hidden;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    animation: ${props => props.animation};
    animation-delay: ${props => props.animation === expandField ? '0.3s' : '0s'};
`;

export const NoFavoritesBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1000px;
    height: 300px;
`;

export const NoFavoritesMessage = styled(Bold)`
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1000px;
`;

export const MealizeItalic = styled.i`
     font-family: motiva-sans, sans-serif;
     font-weight: 800;
     font-size: 19px;
     margin: 0px 5px 0px 5px;
     color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

export const ExampleImages = styled.img`
    object-fit: ${props => props.fit ? props.fit : 'contain'};
    object-position: center;
    width: ${props => props.width ? props.width : '350px'};
    height: ${props => props.height ? props.height : '400px'};
    border-radius: 5px;
    margin: ${props => props.margin ? props.margin : 'none'};
`;

export const ExampleBox = styled.div`
     display: flex;
     flex-direction: row;
     align-items: center;
     justify-content: space-between;
     width: 810px;
     height: 500px;
     margin: -100px 0px 100px 72px;
`;
