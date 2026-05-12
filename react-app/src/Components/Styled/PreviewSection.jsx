import styled from "styled-components";
import { ExtraBold } from "./Fonts";

export const PreviewWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: ${props => props.width};
    height: ${props => props.height};
    background: linear-gradient(#28A690,#76D97E);
    border-radius: 5px;
`;
//push

export const PreviewBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 600px;
    height: 600px;
    cursor: default;
`;

export const PrintId = styled.div`
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 480px;
    height: 270px;
    border-radius: 5px;
`;

export const UploadingBox = styled.div`
    width: 280px;
    height: 75px;
    background-color: white;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const UploadingMessage = styled.div`
    font-family: motiva-sans, sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 900;
    color: black;
`;

export const PreviewMessageBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 500px;
    width: 300px;
`;

export const PreviewMessageText = styled(ExtraBold)`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    width: 300px;
    height: 100px;
    font-size: 18px;
    letter-spacing: 0.25px;
    line-height: 28px;
    color: black;
`;

export const PreviewSmallText = styled(PreviewMessageText)`
font-size: 14px;
margin-top: -15px;
`;
