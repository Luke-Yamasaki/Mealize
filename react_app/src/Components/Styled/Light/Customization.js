import styled from 'styled-components';

export const CustomizationContainer = styled.div`
    width: 300px;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: center;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    background-color: #FFFFFF;
    color: black;
    font-family: motiva-sans, sans-serif;
    font-style: normal;
    font-weight: 700;
    position: -webkit-sticky;
    position: sticky;
    will-change: transform;
    top: 0;
`;

export const ContentContainer = styled.div`
    width: 300px;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    border-bottom: 1px solid #D5D5D5;
`;

export const Label = styled.p`
    margin: 0px;
    padding: 0px;
    font-size: 1em;
    color: black;
    margin-left: 3.4em;
`;

export const IconBox = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
