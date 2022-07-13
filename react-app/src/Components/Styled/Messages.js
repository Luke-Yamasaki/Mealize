import styled from "styled-components";
import { Bold, ExtraBold } from "./Fonts";

export const MessagePageWrapper = styled.main`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: top;
    max-width: 1336px;
    width: 100vw;
    min-height: 900px;
    height: auto;
`;

export const MessageSideMenu = styled.section`
    width: 30%;
    min-height: 900px;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};

    &::-webkit-scrollbar {
        width: 17px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
    }

    &::-webkit-scrollbar-thumb {
        background: ${props => props.theme === 'light' ? 'white' : '#191919'};
        border-radius: 15px;
        border: ${props => props.theme === 'light' ? '1px solid rgba(0, 0, 0, 0.2)' : '1px solid rgba(255, 255, 255, 0.25)'};
    }
`;

export const MessageList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    list-style: none;
    padding: 0px;
    margin: 0px;
    margin-top: 20px;
    width: 400px;
    height: 30px;
    font-family: motiva-sans, sans-serif;
    font-weight: 800;
    font-size: 18px;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    border-bottom: ${props => props.theme === 'light' ? '1px solid rgba(0, 0, 0, 0.2)' : '1px solid rgba(255, 255, 255, 0.2)'};
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
    width: 380px;
    height: 100px;
    border-bottom: ${props => props.theme === 'light' ? '0.5px solid rgba(0, 0, 0, 0.2)' : props.theme === 'dark' ? '0.5px solid rgba(255, 255, 255, 0.2)' : 'none'};
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
    height: 30px;
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
    max-width: 936px;
    width: 70%;
    height: auto;
    display: flex;
    flex-direction: column;
    algin-items: flex-start;
    justify-content: flex-start;
    background-color: ${props => props.theme === 'light' ? '#F1F1F1' : '#191919'};
    border-left: ${props => props.theme === 'light' ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.1)'};
`;

export const MessageFeed = styled.div`
    max-width: 936px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
`;

export const MessengerBanner = styled.header`
    width: calc(100% - 37.5px);
    padding-left: 37.5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    height: 109px;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    border-bottom: ${props => props.theme === 'light' ? '1px solid rgba(0, 0, 0, 0.2)' : '1px solid rgba(255, 255, 255, 0.2)'};
`;

export const MessageWithImages = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: left;
    gap: 10px;
    width: 100%;
    height: auto;
`;

export const SingleMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    height: auto;
    width: 100%;
    background-color: ${props => props.theme === 'light' ? 'rgba(255, 255, 255, 0.75)' : 'none'};
    padding: 15px 0px 15px 0px;
    border-bottom: ${props => props.theme === 'light' ? '1px solid rgba(0, 0, 0, 0.25)' : '1px solid rgba(255, 255, 255, 0.1)'};
`;

export const MessageContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.direction};
    align-items: top;
    width: calc(100% - 80px);
    gap: 10px;
    padding: ${props => props.direction === 'row' ? '0px 40px 0px 40px' : '0px 45px 0px 35px'};
    min-height: 50px;
    height: auto;
`;

export const MessageBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 50px;
    height: auto;
`;

export const PostContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.direction};
    justify-content: flex-start;
    align-items: center;
    width: ${props => props.direction === 'row' ? 'calc(100% - 100px)' : 'calc(100% - 105px)'};
    padding: ${props => props.direction === 'row' ? '10px 0px 0px 100px' : '10px 105px 0px 0px'};
    max-height: 400px;
    min-height: 150px;
    height: auto;
`;

export const PostBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
    border: ${props => props.theme === 'light' ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.2)'};
    width: 310px;
    max-height: 410px;
    min-height: 150px;
    height: 410px;
    border-radius: 5px;
    margin-top: -10px;
`;

export const MessagesSpacer = styled.div`
    width: 100%;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
`;

export const MessageContent = styled.div`
    width: 495px;
    line-height: 24px;
    letter-spacing: 0.15px;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-direction: ${props => props.direction};
    justify-content: flex-start;
    align-items: top;
    padding-top: 10px;
    font-family: motiva-sans, sans-serif;
    font-size: 14px;
    word-break: break-all;
    font-weight: 700;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;


export const SelectMessageBox = styled.div`
    width: 100%;
    height: 900px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: ${props => props.marginTop ? props.marginTop : '0px'};
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
    height: ${props => props.height ? props.height : '150px'};
    padding-top: 25px;
    background-color: ${props => props.small === 'true' ? 'none' : props.theme === 'light' ? 'white' : '#191919'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const MessageInputBox = styled.div`
    width: ${props => props.edit === 'true' ? '70%' : '90%'};
    margin-left: ${props => props.edit === 'true' ? '265px' : '0px'};
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    border: ${props => props.theme === 'light' ? '1px solid #B7B7B7' : '1px solid white'};
    border-radius: 100px;
`;

export const MessageInput = styled.input`
    width: 97%;
    height: 25px;
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
    width: ${props => props.edit === 'true' ? '100%' : '90%'};
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 0px 20px 0px;
    gap: 19px;
    justify-content: flex-end;
`;

export const MessageFileLabel = styled.label`
    min-width: 175px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: motiva-sans, sans-serif;
    font-weight: 700;
    font-size: 16px;
    color: ${props => props.error ? 'red' : '#34AE8D'};
`;

export const MessageErrorBox = styled.div`
    width: 90%;
    height: 55px;
    margin-top: -20px;
    gap: 5px;
    display: flex;
    flex-direction: column;
    algin-items: center;
    justify-content: center;
`;

export const EditErrorBox = styled(MessageErrorBox)`
    width: 90%;
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
    width: calc(100% - 100px);
    height: 35px;
    gap: 10px;
    padding-right: 100px;
`;

const ItemButton = styled.div`
    width: 75px;
    height: 25px;
    padding: 5px 0px 0px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
`;

export const EditMessageButton = styled(ItemButton)`
    background-color: #D49524;
    filter: drop-shadow(${props => props.theme === 'light' ? '0px 0px 1px rgba(0, 0, 0, 0.75)' : '0px 0px 1px rgba(255, 255, 255, 0.75)'});
`;

export const DeleteMessageButton = styled(ItemButton)`
    background-color: #C2462A;
    filter: drop-shadow(${props => props.theme === 'light' ? '0px 0px 1px rgba(0, 0, 0, 0.75)' : '0px 0px 1px rgba(255, 255, 255, 0.75)'});
`;

export const CancelMessageButton = styled(ItemButton)`
    background-color: #28A690;
`;

export const SubmitMessageButton = styled(ItemButton)`
    background-color: #76D97E;
`;

export const AcceptButton = styled(ItemButton)`
    background: linear-gradient(#76D97E, #28A690);
    width: 100px;
    height: 30px;
    &:hover {
        transform: scale(1.05);
    }
`;

export const DeclineButton = styled(ItemButton)`
    background: linear-gradient(#c2462a, #e0a193);
    width: 100px;
    height: 30px;
    &:hover {
        transform: scale(1.05);
    }
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
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    cursor: pointer;
`;

export const PostDeletedText = styled(Bold)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 400px;
    width: 350px;
    font-size: 16px;
`;
