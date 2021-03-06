import styled from 'styled-components';

export const NotificationSection = styled.section`
    max-width: 1336px;
    width: 100vw;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color: ${props => props.theme === 'light' ? '#9AF2C0' : '#76D97E'};
    border-bottom: 0.2px solid #608F41;
`;

export const NotificationContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: ${props => props.theme === 'light' ? '#9AF2C0' : '#76D97E'};
    gap: 5px;
`;

export const NotificationTextBox = styled(NotificationContainer)`
    width: 300px;
`;


export const NotificationText = styled.p`
    display: flex;
    justify-centent: center;
    align-items: center;
    margin: 0px;
    padding: 0px;
    font-family: motiva-sans, sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    color: black;
    height: 25px;
    width: auto;
`;
