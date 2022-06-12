import styled from 'styled-components';

export const FourOFourContainer = styled.div`
    font-family: motiva-sans, sans-serif;
    font-weight: 900;
    padding-top: 20px;
    font-size: 3em;
    color: ${props => props.theme === 'light' ?'#191919' : 'white'};
    max-width: 1336px;
    width: 100vw;
    height: 900px;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
`;

export const FourOFourImage = styled.img`
    object-fit: contain;
    object-position: center;
    max-width: 600px;
    width: 70vw;
    max-height: 700px;
    height: 45vh;
`;
