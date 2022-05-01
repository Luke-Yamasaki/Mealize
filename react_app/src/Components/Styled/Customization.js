import styled from 'styled-components';

export const LightCustomizationContainer = styled.div`
    width: 300px;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: center;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    background-color: #FFFFFF;
    overflow: hidden;
    color: black;
    font-family: motiva-sans, sans-serif;
    font-style: normal;
    font-weight: 700;
`;

export const DarkCustomizationContainer = styled.div`
    width: 300px;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: center;
    border: 1px solid #616161;
    border-radius: 5px;
    background-color: #191919;
    overflow: hidden;
    color: white;
    font-family: motiva-sans, sans-serif;
    font-style: normal;
    font-weight: 700;
`;

export const LightContentContainer = styled.div`
    width: 300px;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    border-bottom: 1px solid #D5D5D5;
`;

export const DarkContentContainer = styled.div`
    width: 300px;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    border-bottom: 1px solid #616161;
`;

export const LightLabel = styled.p`
    margin: 0px;
    padding: 0px;
    font-size: 1em;
    color: black;
`;

export const DarkLabel = styled.p`
    margin: 0px;
    padding: 0px;
    font-size: 1em;
    color: white;
`;

export const IconBox = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
