import styled from 'styled-components';
import { Black, Bold, ExtraBold, Medium } from './Fonts';

//Background
export const OrgWrapper = styled.main`
    width: 1600px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

//Banner
export const OrgBannerBox = styled.div`
    width: 1600px;
    height: auto;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-start;

`;

export const OrgBannerImage = styled.img`
    width: 1600px;
    height: 250px;
    object-fit: cover;
    object-position: center;
`;

export const OrgBannerInfoBox = styled.div`
    width: 1600px;
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
    margin: -100px 0px 0px 50px;
    background-color: black;
`;

export const OrgName = styled(Black)`
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

export const OrgBannerText = styled(Medium)`
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

//Main content
export const OrgContentBox = styled.section`
    width: 1440px;
    height: auto;
    padding: 80px;
    background-color: ${props => props.theme === 'light' ? '#F1F1F1' : '#191919'};
    display: flex;
    flex-direction: row;
    align-items: top;
    justify-content: space-between;
`;

//Manager picture section
export const ManagerSection = styled.aside`
    width: 300px;
    height: auto;
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
    width: 300px;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-between;
    box-shadow: inset 0 0 125px black;
`;

export const ManagerInfoBox = styled.div`
    width: 290px;
    height: 100px;
    display: flex;
    padding-left: 10px;
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
    width: 200px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #D49524;
    border-radius: 5px;
    cursor: pointer;
`;

export const OrgQuestionText = styled(Bold)`
    color: #191919;
    font-size: 14px;
    font-weight: 700;
`;

//Items section
export const OrgSection = styled.section`
    width: 1100px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-start;
    gap: 20px;
`;

//Items filter
export const OrgFilters = styled.div`
    width: 1100px;
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

export const OrgFilterTitle = styled(ExtraBold)`
    width: 100px;
    height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

export const OrgFilterBox = styled(OrgFilters)`
    width: 1000px;
    height: 30px;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

export const OrgFilterText = styled(Bold)`
    width: ${props => props.width};
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: ${props =>
        props.theme === 'light' && props.color === 'true' ?
        '#191919'
        : props.theme === 'light' && props.color === 'false' ?
        'rgba(0, 0, 0, 0.25)'
        : props.theme === 'dark' && props.color === 'true' ?
        'white'
        :
        'rgba(255, 255, 255, 0.25)'
    };
`;

export const OrgFilterSlash = styled(Bold)`
    width: 10px;
    height: 20px;
    margin-right: -5px;
    color: ${props =>
        props.theme === 'light' && props.color === 'true' ?
        '#191919'
        : props.theme === 'light' && props.color === 'false' ?
        'rgba(0, 0, 0, 0.25)'
        : props.theme === 'dark' && props.color === 'true' ?
        'white'
        :
        'rgba(255, 255, 255, 0.25)'
    };
`;

//Items feed
export const OrgPostFeed = styled.div`
    width: 1100px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
`;
