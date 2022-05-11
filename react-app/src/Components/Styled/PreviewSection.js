import styled from "styled-components";

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

export const PreviewBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 600px;
    height: 900px;
`;

export const UploadingBox = styled.div`
    width: 400px;
    height: 100px;
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
