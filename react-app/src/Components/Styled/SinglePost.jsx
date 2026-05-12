import styled from 'styled-components';
import { Black, Medium } from './Fonts';

//Background
export const SinglePostWrapper = styled.main`
    max-width: 1336px;
    width: 100vw;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

//Banner
export const SinglePostBannerBox = styled.div`
    max-width: 1336px;
    width: 100vw;
    height: auto;
    max-height: 400px;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-start;

`;

export const SinglePostBannerImage = styled.img`
    max-width: 1336px;
    width: 100vw;
    height: 250px;
    object-fit: cover;
    object-position: center;
`;

export const SinglePostBannerInfoBox = styled.div`
    max-width: 1336px;
    width: 100vw;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 50px;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
`;

export const SinglePostProfileImage = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 200px;
    margin: -100px 0px 0px 50px;
    background-color: black;
    cursor: pointer;
`;

export const SinglePostName = styled(Black)`
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

export const SinglePostBannerText = styled(Medium)`
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

export const SinglePostPinBox = styled.div`
    max-width: 600px;
    height: 30px;
    gap: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

//Main content
export const SinglePostContentBox = styled.section`
    max-width: 1336px;
    width: 100vw;
    height: 600px;
    display: flex;
    justify-content: center;
    align-items: space-around;
    padding-top: 100px;
    background: ${props => props.style};
`;
