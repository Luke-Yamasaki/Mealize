import styled from "styled-components";
import { Bold } from "./Fonts";

export const MessagePageWrapper = styled.main`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: top;
    width: 1600px;
    height: 95vh;
`;

export const MessageSideMenu = styled.section`
    width: 25%;
    max-height: 95vh;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    border: ${props => props.theme === 'light' ? '#B7B7B7' : 'white'};
`;

export const MessageList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    list-style: none;
    padding: 0px;
    margin: 0px;
    padding: 5px;
    width: 395px;
    height: 45px;
`;

export const MessageItem = styled.li`
    list-style: none;
    padding: 0px;
    margin: 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 5px;
    width: 375px;
    height: 45px;
    border: ${props => props.theme === 'light' ? '1px solid #B7B7B7' : '1px solid white'};
`;

export const MessageProfileIcon = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 100%;
    object-fit: cover;
    object-position: center;
`;

export const MessageUserBox = styled.div`
    width: 300px;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const MessagePreviewBox = styled(MessageUserBox)`
    flex-direction: column;
    width: 250px;
    gap: 5px;
`;

export const MessageContentPreview = styled(MessageUserBox)`
    width: 250px;
    height: 15px;
    justify-content: flex-start;
    font-family: motiva-sans, sans-serif;
    font-size: 14px;
`

export const MessageUserName = styled(Bold)`
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    width: 250px;
    height: 15px;
    font-size: 14px;
`;

export const MessageTime = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    font-size: 14px;
`;

export const MessageThreadField = styled.section`
    width: 75%;
    height: 100%;
    display: flex;
    flex-direction: column;
    algin-items: flex-start;
    justify-content: center;
    background-color: ${props => props.theme === 'light' ? '#F1F1F1' : '#191919'};
    border-left: ${props => props.theme === 'light' ? '1px solid #191919' : '1px solid #F1F1F1'};
`;

export const MessengerBanner = styled.header`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: enter;
    justify-content: flex-start;
    height: 75px;
    border: ${props => props.theme === 'light' ? '1px solid #191919' : '1px solid white'};
`;

export const MessageContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.alignment};
    width: 95%;
    padding: 5%;
    height: auto;
`;


export const MessagesContent = styled.div`
    display: flex;
    flex-direction: row;

`;
