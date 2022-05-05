import styled from 'styled-components';
import image from '../../../Assets/Images/Pattern_10.png';

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

export const PageBackGround = styled.div`
  max-width: 1549px;
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
  border: '1px solid';
  border-color: ${props => props.bordercolor};
`;

export const SideBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-around;
    width: 200px;
    height: 750px;
    gap: 15px;
`;

export const PostField = styled.fieldset`
    width: 150px;
    height: 125px;
    border-radius: 5px;
    border: 1px solid #B2B2B2;
    background-color: #E8E8E8;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-around;
    font-size: 1em;
`;

export const CategoryField = styled.fieldset`
    width: 150px;
    height: 285px;
    border-radius: 5px;
    border: 1px solid #B2B2B2;
    background-color: #E8E8E8;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-end;
    font-size: 1em;
    gap: 5px;
`;

export const OrganizationField = styled.fieldset`
    width: 150px;
    height: 155px;
    border-radius: 5px;
    border: 1px solid #B2B2B2;
    background-color: #E8E8E8;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    font-size: 1em;
    padding-bottom: 25px;
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

export const SideLegend = styled.legend`
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
`;

export const OrganizationLegend = styled.legend`
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
    margin-bottom: 5px
`;

export const SideBarInfoBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 10px;
    align-items: center;
    width: 200px;
    height: 50px;
`;

export const SideBarInfoText = styled.div`
    font-size: 12px;
    color: black;
    font-weight: bold;
`;

export const SideBarInfoIcon = styled.div`
`;

export const FeedContainer = styled.div`
    width: 870px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 25px;
`;
