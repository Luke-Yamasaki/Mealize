import styled from 'styled-components';
import image from '../../Assets/Images/Pattern_10.png';
import { ExtraBold } from './Fonts';

export const AppBackGround = styled.div`
    width: 100vw;
    min-height: 100vh;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: top;
    background: ${props => props.theme === 'light' ? 'linear-gradient(rgba(40, 166, 144, 1), rgba(118, 217, 126, 1))' : '#191919' };
    background-image: ${props => props.background === true ? `url(${image})` : 'none'};
    background-size: contain;
    background-repeat: repeat;
`;

export const AppContentContainer = styled.div`
    width: 57.1w;
    min-height: 100vh;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export const PageBackGround = styled.div`
  max-width: 1548px;
  width: 100em;
  min-height: 80vh;
  height: auto;
  background: ${props => props.background};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: top;
  filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.35));
  padding-top: 50px;
  padding-left: 50px;
  gap: 100px;
  border: 1px solid;
  border-color: ${props => props.bordercolor};
`;

export const BackGroundAside = styled.aside`
    width: 21.45vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    will-change: transform;
    margin-top: - 1000px;
`;

export const FilterTitle = styled(ExtraBold)`
    margin-bottom: -5px;
    color: ${props => props.theme === 'light' ? '#000000' : '#FFFFFF'};
`;

export const SideBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-around;
    width: 200px;
    height: 1200px;
    gap: 15px;
`;

export const SideField = styled.fieldset`
    width: 150px;
    height: auto;
    border-radius: 5px;
    border: 1px solid #616161;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-around;
    font-size: 1em;
    padding: 10px 0px 10px 10px;
`;

export const SideLegend = styled.legend`
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
    width: 150px;
    height: 50px;
`;

export const SideBarInfoText = styled.div`
    font-size: 12px;
    color: ${props => props.theme === 'light' ? 'black' : 'white'};
    font-weight: bold;
`;

export const FeedContainer = styled.div`
    max-width: 1100px;
    width: 40vw;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 25px;
    row-gap: 0px;
    flex-wrap: wrap;
`;

export const PostsTitle = styled(ExtraBold)`
    margin-top: 10px;
    color: ${props => props.theme === 'light' ? '#000000' : '#FFFFFF'};
`;

export const PostsSection = styled.section`
    max-width: 1100px;
    width: 40vw;
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
    &:hover {
       width: ${props => props.resize ? props.resize : props.square ? props.square : '30px'};
       height: ${props => props.resize ? props.resize : props.square ? props.square : '30px'};
       transform: ${props => props.resize ? 'scale(1.1)' : ''};
       opacity: ${props => props.opacity ? props.opacity : '100%'};
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
`;
