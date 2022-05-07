import styled from "styled-components";
import { Bold, Medium, Regular, Paragraph } from './Fonts';

//container
export const CardContainer = styled.div`
    width: 300px;
    height: 450px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

//exp banner
export const ExpBanner = styled.div`
    width: 290px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
`;

export const BannerTextContainer = styled.div`
    width: 260px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const BannerText = styled(Paragraph)`
    color: ${props => props.color};
    font-size: 0.9em;
    font-weight: 700;
`;


//card
export const Card = styled.div`
    width: 290px;
    height: 400px;
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
export const TitleBox = styled(ExpBanner)`
    justify-content: space-around;
    height: 30px;
`;

export const TitleTextContainer = styled(BannerTextContainer)`
    justify-content: flex-start;
    align-items: center;
    height: 30px;
    width: 200px;
`;

export const CompanyLogo = styled.img`
    width: ${props => props.width};
    height: ${props => props.height};
    background-color: ${props => props.backgroundColor};
    object-fit: cover;
    object-position: center;
    border-radius: 100%;
    border: 1px solid #E8E8E8;
`;

export const CompanyName = styled(Bold)`
    color: black;
    width: 250px;
    height: 30px;
    font-size: 0.9em;
    display: flex;
    justify-content: flex-start;
    align-items: center;
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

//image
export const ItemImage = styled.img`
    width: 288px;
    height: 230px;
    object-fit: cover;
    object-position: center;
`;


//Info
export const InfoBox = styled(ExpBanner)`
    width: 235px;
    height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    justify-content: space-between;
    gap: 5px;
`;

export const InfoContainer = styled(BannerTextContainer)`
    width: 200px;
    height: 35px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
`;

export const ItemTitle = styled(Bold)`
    font-size: 0.875em;
    color: ${props => props.color};
`;

export const ItemQuantity = styled(Medium)`
    font-size: 0.5em;
    color: ${props => props.color};
`;

export const DescriptionBox = styled.div`
    width: 260px;
    height: 45px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1em;
`;

export const DescriptionText = styled(Medium)`
    color: ${props => props.color};
    font-size: 0.65em;
    height: auto;
    max-height: 45px;
    width: 240px;
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
