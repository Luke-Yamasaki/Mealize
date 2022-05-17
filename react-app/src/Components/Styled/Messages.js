import styled from "styled-components";
import { Bold, ExtraBold } from "./Fonts";

export const MessagePageWrapper = styled.main`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: top;
    width: 1600px;
    min-height: 65vh;
    height: auto;
`;

export const MessageSideMenu = styled.section`
    width: 25%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    border: ${props => props.theme === 'light' ? '#B7B7B7' : 'white'};
`;

export const MessageList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    list-style: none;
    margin-top: 20px;
    padding: 0px;
    width: 395px;
    height: 45px;
    font-family: motiva-sans, sans-serif;
    font-weight: 800;
    font-size: 18px;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

export const MessageSpacer = styled.div`
    width: 395px;
    height: 100px;
    background-color: wblack;
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
    height: 100px;
    border: ${props => props.theme === 'light' ? '0.1px solid #B7B7B7' : props.theme === 'dark' ? '0.1px solid rgba(255, 255, 255, 0.1)' : 'none'};
`;

export const MessageProfileIcon = styled.img`
    width: ${props => props.size ? props.size : '40px'};
    height: ${props => props.size ? props.size : '40px'};
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

export const UserAndTime = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
`;

export const MessageContentPreview = styled(MessageUserBox)`
    width: 250px;
    height: 15px;
    flex-direction: ${props => props.direction};
    justify-content: flex-start;
    font-family: motiva-sans, sans-serif;
    font-size: 16px;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

export const MessageUserName = styled(Bold)`
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    width: 250px;
    height: 15px;
    font-size: ${props => props.size ? props.size : '14px'};
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
    justify-content: flex-start;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: ${props => props.theme === 'light' ? '#F1F1F1' : '#191919'};
    border-left: ${props => props.theme === 'light' ? '1px solid #B7B7B7' : '1px solid #F1F1F1'};
`;

export const MessengerBanner = styled.header`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 100px;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    border-bottom: ${props => props.theme === 'light' ? '1px solid #B7B7B7' : '1px solid white'};
`;

export const MessageContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.direction};
    justify-content: flex-start;
    width: 93%;
    padding: 5%;
    height: auto;
`;


export const MessagesContent = styled.div`
    display: flex;
    flex-direction: row;
`;


export const SelectMessageBox = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SelectMessageText = styled(ExtraBold)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 700px;
    height: 200px;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;



export const MessageInputForm = styled.form`
    width: 99%;
    height: auto;
    min-height: 50px;
    padding: 5px;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    display: flex;
    flex-direction: column;
    justify-content: right;
    align-items: center;
`;

export const MessageInputBox = styled.div`
    width: 90%;
    height: auto;
    min-height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: right;
    align-items: center;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    border: ${props => props.theme === 'light' ? '1px solid #F1F1F1' : '1px solid white'};
`;

export const MessageInput = styled.input`
    width: 90%;
    min-height: 25px;
    height: auto;
    outline: none;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    font-family: motiva-sans, sans-serif;
`;
