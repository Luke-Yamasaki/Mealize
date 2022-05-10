import styled from "styled-components";
import { Black, Bold, Paragraph } from "./Fonts";

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
    background-image: linear-gradient(#76D97E, #28A690),
        url('../../Assets/Images/Pattern_10.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
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

export const SloganBox = styled.div`
    width: 270px;
    height: 51px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Slogan = styled(Black)`
    font-size: 18px;
    color: black;
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
    padding: 0px;
    margin: -10px 0px 0px 10px;
    font-size: 12px;
    font-weight: 700';
    color: black;
`;

export const IdContent = styled.section`
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

export const IdNumber = styled(IdType)`
    font-size: 10px;
    font-weight: 700;
    padding-top: 10px;
    height: 15px;
`;

export const IssueDate = styled(IdNumber)`
    padding-top: 5px;
    padding-bottom: 5px;
`;

export const OrganizationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: left;
    gap: 5px;
    width: 170px;
    height: 141px;
`;

export const IdInfoLabel = styled(Bold)`
    font-size: 12px;
    color: black;
    height: 20px;
`;

export const IdInfoBox = styled.div`
    display: flex;
    flex-direction: row;
    width: 150px;
    height: 20px;
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
    color: black;
    margin: 0px;
    margin-top: ${props => props.marginTop ? props.marginTop : '0px' }
    padding: 0px;
    height: 20px;
`;

export const IdAddressBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 150px;
    height: 200px;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 5px;
`;

export const IdUserInfoContainer = styled(OrganizationContainer)`
    width: 130px;
    height: 141px;
`;
