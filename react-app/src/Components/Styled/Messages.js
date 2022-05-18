import styled from "styled-components";
import { Bold, ExtraBold } from "./Fonts";

export const MessagePageWrapper = styled.main`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: top;
    width: 1600px;
    height: 62%;
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
    cursor: pointer;
    margin: 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 5px 5px 5px 15px;
    width: 370px;
    height: 100px;
    border: ${props => props.theme === 'light' ? '0.1px solid #B7B7B7' : props.theme === 'dark' ? '0.1px solid rgba(255, 255, 255, 0.1)' : 'none'};
`;

export const BannerTextBox = styled.div`
    width: 500px;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-contenet: flex-start;
    align-items: center;
    gap: 5px;
`;

export const MessageProfileIcon = styled.img`
    width: ${props => props.square ? props.square : '40px'};
    height: ${props => props.square ? props.square : '40px'};
    border-radius: 60px;
    object-fit: cover;
    object-position: center;
`;

export const MessageUserBox = styled.div`
    width: 350px;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 25px;
`;

export const MessagePreviewBox = styled(MessageUserBox)`
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    width: 260px;
    gap: 5px;
`;

export const UserAndTime = styled.div`
    width: 50px;
    height: 60px;
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
    font-size: 14px;
    font-weight: 700;
    opacity: 60%;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

export const MessageUserName = styled(Bold)`
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    width: ${props => props.width? props.width : 'auto'};
    height: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-style: ${props => props.font ? props.font : 'normal'};
    font-size: ${props => props.size ? props.size : '14px'};
`;

export const PreviewMessageTime = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: 40px;
    width: 30px;
    height: 30px;
    justify-content: flex-end;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    font-family: motiva-sans, sans-serif;
    font-size: 12px;
    font-weight: 600;
`;

export const MessageTime = styled(PreviewMessageTime)`
    justify-content: center;
`;

export const MessageThreadField = styled.section`
    width: 75%;
    height: 100%;
    display: flex;
    flex-direction: column;
    algin-items: flex-start;
    justify-content: space-between;
    background-color: ${props => props.theme === 'light' ? '#F1F1F1' : '#191919'};
    border-left: ${props => props.theme === 'light' ? '1px solid #B7B7B7' : '1px solid #F1F1F1'};
`;

export const MessageFeed = styled.div`
    width: 100%;
    height: 80%;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
`;

export const MessengerBanner = styled.header`
    width: 98%;
    padding-left: 2%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    height: 100px;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    border-bottom: ${props => props.theme === 'light' ? '1px solid #B7B7B7' : '1px solid white'};
`;

export const MessageContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-direction: ${props => props.direction};
    align-items: center;
    width: 100%;
    gap: 10px;
    padding: 20px;
    min-height: 30px;
    height: auto;
`;

export const MessageBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 98%;
    padding: 20px;
    min-height: 50px;
    height: auto;
`;

export const PostContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.direction};
    justify-content: flex-start;
    align-items: center;
    width: 95%;
    max-height: 450px;
    height: auto;
    padding: ${props => props.direction === 'row' ? '0% 0% 0% 5%' : '0% 5% 0% 0%'};
`;

export const PostBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
    border: ${props => props.theme === 'light' ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.2)'};
    width: 310px;
    max-height: 450px;
    min-height: 150px;
    height: auto;
    border-radius: 5px;
`;

export const MessageContent = styled.div`
    width: 60%;
    min-height: 25px;
    line-height: 24px;
    letter-spacing: 0.15px;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-direction: ${props => props.direction};
    justify-content: flex-start;
    align-items: center;
    font-family: motiva-sans, sans-serif;
    font-size: 14px;
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
    width: 99%;
    height: ${props => props.height ? props.height : '15%'};
    padding: 5px;
    padding-top: 20px;
    background-color: ${props => props.small === 'true' ? 'none' : props.theme === 'light' ? 'white' : '#191919'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: ${props => props.small === 'true' ? 'flex-end' : 'center'};
`;

export const MessageInputBox = styled.div`
    width: ${props => props.edit === 'true' ? '53%' : '87%'};
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
    height: 100%
    outline: none;
    border: none;
    padding: 5px;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    font-family: motiva-sans, sans-serif;
    font-size: 14px;
    border-radius: 100px;
    &:focus {
        outline: none;
    }
`;


export const MessageFileAndButtons = styled.div`
    width: 87%;
    height: 75px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
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

export const ImageMessage = styled.img`
    max-width: 300px;
    max-height: 500px;
    height: auto;
    width: auto;
    object-fit: contain;
    object-position: center;
    object-repeat: no-repeat;
`;

export const MessageEditDelete = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: right;
    width: 95%;
    height: 35px;
    gap: 15px;
    padding: 0px 5% 0px 0px;
`;

const ItemButton = styled.div`
    width: 75px;
    height: 25px;
    padding: 5px 0px 0px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`;

export const EditMessageButton = styled(ItemButton)`
    background-color: #D49524;
    filter: drop-shadow(${props => props.theme === 'light' ? '0px 0px 1px rgba(0, 0, 0, 0.75)' : '0px 0px 1px rgba(255, 255, 255, 0.75)'});
`;

export const DeleteMessageButton = styled(ItemButton)`
    background-color: #C2462A;
`;

export const FileBox = styled.div`
    width: 250px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const MessageFileInput = styled.input`
    height: 25px;
    width: 250px;
    background-color: none;
    font-family: motiva-sans, sans-serif;
    text-align: center;
    font-size: 16px;
`;
