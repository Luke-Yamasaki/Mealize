import styled from 'styled-components';

export const FourOFourContainer = styled.div`
    font-family: motiva-sans, sans-serif;
    font-weight: 900;
    padding-top: 20px;
    font-size: 3em;
    color: ${props => props.theme === 'light' ?'#191919' : 'white'};
    width: 1600px;
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
    width: 600px;
    height: 700px;
    margin-left: ${props => props.margin ? props.margin : '150px'};
`;
