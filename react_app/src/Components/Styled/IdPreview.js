import styled from "styled-components";
import { Black, Paragraph } from "./Fonts";

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
