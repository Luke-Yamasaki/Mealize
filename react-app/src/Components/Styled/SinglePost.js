import styled from 'styled-components';
import { Black, Bold, ExtraBold, Medium } from './Fonts';

//Background
export const OrgWrapper = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

//Banner
export const OrgBannerBox = styled.div`
    width: 100%;
    height: auto;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-start;

`;

export const OrgBannerImage = styled.img`
    width: 100%;
    height: auto;
    max-height: 250px;
    object-fit: cover;
    object-position: center;
`;

export const OrgBannerInfoBox = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 50px;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
`;

export const OrgProfileImage = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 200px;
    position: abolute;
    margin: -100px 0px 0px 50px;
`;

export const OrgName = styled(Black)`
    position: abolute;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

export const OrgBannerText = styled(Medium)`
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

//Main content
export const OrgContentBox = styled.section`
    width: 90%;
    height: auto;
    padding: 5%;
    background-color: ${props => props.theme === 'light' ? '#F1F1F1' : '#191919'};
    display: flex;
    flex-direction: row;
    align-items: top;
    justify-content: space-between;
`;

//Manager picture section
export const ManagerSection = styled.aside`
    width: 10%;
    height: auto;
    padding: 1% 0% 1% 2.5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

export const ManagerContainer = styled.div`
    width: 300px;
    height: 500px;
    display: flex;
    border-radius: 5px;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #191919;
`;

export const ManagerForeground = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-between;
    box-shadow: inset 0 0 125px black;
`;

export const ManagerInfoBox = styled.div`
    width: 98%;
    height: 20%;
    display: flex;
    padding-left: 2%;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    gap: 10px;
`;

export const ManagerName = styled(Bold)`
    color: white;
    margin-top: -20px;
`;

export const ManagerInfoText = styled(Medium)`
    color: white;
    font-size: 14px;
`;

export const ManagerButton = styled.div`
    width: 77%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #D49524;
    border-radius: 5px;
    cursor: pointer;
`;

export const QuestionText = styled(Bold)`
    color: #191919;
    font-size: 14px;
    font-weight: 700;
`;

//Items section
export const OrgSection = styled.section`

`;

//Items filter
export const OrgFilters = styled.div`

`;

export const FilterTitle = styled(ExtraBold)`

`;

export const FilterBox = styled.div`

`;

export const FilterText = styled(Bold)`

`;

//Items feed
export const OrgPostFeed = styled.div`

`;
