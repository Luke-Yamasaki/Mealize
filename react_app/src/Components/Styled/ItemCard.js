import styled from "styled-components";
import { Bold, Medium, Regular, Paragraph } from './Fonts';
import { Link } from 'react-router-dom';

//container
export const CardContainer = styled.div`
    width: 285px;
    height: ${props => props.height};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.1s linear;
    &:hover {
        transform: scale(1.02);
        margin-top: -4.5px;
    }
`;

//exp banner
export const ExpBanner = styled.div`
    width: 280px;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
`;

export const BannerTextContainer = styled.div`
    width: 120px;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 3.5px;
    align-items: center;
    padding: 0px;
    margin: 0px;
`;

export const BannerText = styled(Paragraph)`
    color: ${props => props.theme === 'light' ? 'black' : 'white'};
    font-size: 0.7em;
    font-weight: ${props => props.theme === 'light' ? '800' : '500'};
    letter-spacing: ${props => props.theme === 'light' ? '0px' : '0.5px'};
`;

export const ExpText = styled(Paragraph)`
    color: ${props => props.theme === 'light' ? 'black' : 'white'};
    font-size: 0.6em;
    font-weight: ${props => props.theme === 'light' ? '700' : '400'};
    letter-spacing: 0.5px;
`;


//card
export const Card = styled.div`
    width: 280px;
    height: ${props => props.height};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    background: ${props => props.color['background']};
    border: ${props => props.color['border']};
`;

//title
export const TitleBox = styled(Link)`
    width: 280px;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-left: 10px;
    text-decoration: none;
`;

export const TitleTextContainer = styled(BannerTextContainer)`
    justify-content: flex-start;
    align-items: center;
    height: 30px;
    width: 220px;
`;

export const CompanyLogo = styled.img`
    width: ${props => props.width};
    height: ${props => props.height};
    background-color: ${props => props.backgroundColor};
    object-fit: cover;
    object-position: center;
    border-radius: 100%;
    border: 1px solid #E8E8E8;
    margin-top: -3px;
`;

export const CompanyName = styled(Bold)`
    color: black;
    width: 220px;
    height: 30px;
    font-size: 0.9em;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 10px;
    &:hover {
        text-decoration: underline;
    }
`;

// You can wrap functional component icons in a div and scale their size accordingly
export const PinContainer = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export const CompanyAddress = styled(Paragraph)`
    color: black;
    width: 110px;
    height: 35px;
    font-size: 0.7em;
`;

export const ItemDateText = styled(Medium)`
    color: black;
    font-size: 0.65em;
    max-width: 60px;
    margin-left: 5px;
`;

//image
export const ItemImage = styled.img`
    width: 278px;
    height: 210px;
    object-fit: cover;
    object-position: center;
    margin-top: 5px;
    & :hover {
        width: 40px;
        height: 40px;
    }
`;


//Info
export const InfoBox = styled(ExpBanner)`
    width: 260px;
    height: 35px;
    padding-left: 10px;
    padding-right: 10px;
    gap: 5px;
    margin-top: 5px;
`;

export const InfoContainer = styled(BannerTextContainer)`
    width: 230px;
    height: 27px;
    padding-top: 3px;
    justify-content: flex-start;
    gap: 5px;
`;

export const ItemTitle = styled(Bold)`
    max-width: 200px;
    font-size: 0.85em;
    color: ${props => props.theme === 'light' ? 'black' : 'white'};
    letter-spacing: ${props => props.theme === 'light' ? '0px' : '0.5px'};
    font-weight: ${props => props.theme === 'light' ? '700' : '500'};
`;

export const ItemQuantity = styled(Medium)`
    max-width: 75px;
    font-size: 0.65em;
    max-width: 75px;
    color: ${props => props.theme === 'light' ? 'black' : 'white'};
    letter-spacing: ${props => props.theme === 'light' ? '0px' : '0.5px'};
    font-weight: ${props => props.theme === 'light' ? '700' : '400'};
`;

export const DescriptionBox = styled.div`
    margin-top: 5px;
    width: 260px;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    line-height: 1em;
`;

export const DescriptionText = styled(Medium)`
    color: ${props => props.theme === 'light' ? 'black' : 'white'};
    font-weight: ${props => props.theme === 'light' ? '700' : '300'};
    letter-spacing: ${props => props.theme === 'light' ? '0px' : '0.5px'};
    font-size: 0.65em;
    width: 260px;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
`;

export const ButtonBox = styled(ExpBanner)`
    width: 260px;
    height: 35px;
    padding-left: 10px;
    padding-right: 10px;
    justify-content: space-between;
`;

export const ButtonText = styled(Medium)`
    font-size: 0.75em;
    color: black;
    max-width: 100px;
    max-height: 25px;
`;

export const QuestionText = styled(ButtonText)`
    color: ${props => props.theme === 'light' ? 'black' : 'white'};
    font-weight: ${props => props.theme === 'light' ? '700' : '300'};
`;
