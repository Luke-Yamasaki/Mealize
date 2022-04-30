import styled from 'styled-components';

export const NotificationSection = styled.section`
    background-color: #76D97E;
    width: 1600px;
    height: 40px;
    border-bottom: 4px solid #608F41;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const NotificationContainer = styled.div`
    width: 350px;
    height: 25px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
`;

export const NotificationText = styled.p`
    margin: 0px;
    padding: 0px;
    font-family: motiva-sans, sans-serif;
    font-style: normal;
    font-weigth: 700;
    font-size: 1em;
    color: black;
    height: 25px;
`;
