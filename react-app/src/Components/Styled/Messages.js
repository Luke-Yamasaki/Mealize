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
    font-weight: 700;
    opacity: 60%;
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
    justify-content: space-between;
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
    padding: 20px;
    height: 30px;
`;

export const PostContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.direction};
    justify-content: flex-start;
    align-items: center;
    width: 93%;
    height: 450px;
    padding-left: 8%;
`;

export const PostBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
    border: ${props => props.theme === 'light' ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.2)'};
    width: 310px;
    height: 450px;
    border-radius: 5px;
`;


export const MessageContent = styled.div`
    width: 90%;
    height: auto;
    flex-direction: ${props => props.direction};
    justify-content: flex-start;
    align-items: center;
    font-family: motiva-sans, sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
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
    width: 100%;
    height: auto;
    padding: 5px;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const MessageInputBox = styled.div`
    width: 95%;
    height: auto;
    min-height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    border: ${props => props.theme === 'light' ? '1px solid #B7B7B7' : '1px solid white'};
    border-radius: 100px;
`;

export const MessageInput = styled.input`
    width: 97%;
    min-height: 25px;
    height: auto;
    outline: none;
    border: none;
    padding: 5px;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    font-family: motiva-sans, sans-serif;
    font-size: 14px;
    border-radius: 100px;
`;


export const MessageFileAndButtons = styled.div`
    width: 70%;
    height: 75px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;

export const MessageFileLabel = styled.label`
    width: 175px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: motiva-sans, sans-serif;
    font-weight: 700;
    font-size: 16px;
    color: #34AE8D;
`;

export const MessageErrorBox = styled.div`
    width: 95%;
    height: 65px;
    display: flex;
    flex-direction: column;
    algin-items: center;
    justify-content: center;
`;
