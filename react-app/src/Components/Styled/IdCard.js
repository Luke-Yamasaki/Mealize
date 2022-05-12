import styled from "styled-components";
import { Black, ExtraBold, Bold, Paragraph } from "./Fonts";
import pattern from '../../Assets/Images/Pattern_10.png';

export const IdCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
    width: 456px;
    height: 260px;
    border: none;
    border-radius: 5px;
    background: ${props => props.theme === 'light' ? 'linear-gradient(#76D97E, #28A690)' : '#191919'};
    background-image: url(${pattern});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border: 1px solid rgba(255, 255, 255, 0.5);
`;

export const IdHeader = styled.section`
    width: 456px;
    height: 51px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin: 0px;
    padding: 0px;
`;

export const IdLogoType = styled(ExtraBold)`
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    font-size: 2em;
`;

export const SloganBox = styled.div`
    width: 270px;
    height: 51px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Slogan = styled(Black)`
    font-size: 18px;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

export const IdIconBackGround = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    background-color: white;
    border-radius: 100%;
`;

export const IdType = styled(Paragraph)`
    width: 415px;
    margin: -15px 0px 0px 18px;
    font-size: 12px;
    font-weight: ${props => props.theme === 'light' ? '500' : '700'};
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

export const IdContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: top;
    width: 456px;
    height: 175px;
`;

export const IdImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100px;
    height: 175px;
`;

export const IdImage = styled.img`
    width: 100px;
    height: 140px;
    border-radius: 5px;
    object-fit: cover;
    object-position: center;
`;

export const IdNumber = styled(IdType)`
    font-size: 10px;
    font-weight: 700;
    padding-top: 10px;
    margin: 0px;
    height: 15px;
    width: 100px;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

export const IssueDate = styled(IdNumber)`
    padding-top: 5px;
    padding-bottom: 5px;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

export const OrganizationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: left;
    gap: 5px;
    width: 100px;
    height: 11px;
`;

export const EmailBox = styled(OrganizationContainer)`
    width: 139px;
    height: 20px;
    gap: 0px;
`;

export const IdInfoLabel = styled(Bold)`
    font-size: 12px;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    height: 20px;
`;

export const IdInfoBox = styled.div`
    display: flex;
    line-break: auto;
    flex-direction: row;
    max-width: 139px;
    width: 139px;
    height: 30px;
    align-items: center;
    justify-content: flex-start;
    margin: 0px;
    padding: 0px;
    gap: 5px;
`;

export const IdInfoText = styled(Paragraph)`
    font-size: ${props => props.fontSize};
    color: #191919;
    font-weight: 500;
    font-size: 10px;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    margin: 0px;
    margin-top: ${props => props.marginTop ? props.marginTop : '0px' };
    padding: 0px;
    height: 20px;
`;

export const IdAddressBox = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 139px;
    width: 139px;
    height: 200px;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 5px;
`;

export const IdUserInfoContainer = styled(OrganizationContainer)`
    width: 130px;
    height: 141px;
`;
