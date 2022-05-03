import styled from "styled-components";
import { Bold, Medium, Regular, Paragraph } from '../Fonts';

//container
export const CardContainer = styled.div`
    width: 255px;
    height: 390px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

//exp banner
export const ExpBanner = styled.div`
    width: 255px;
    height: 35px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 5px;
`;

export const BannerTextContainer = styled.div`
    width: 215px;
    height: 35px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const BannerText = styled(Paragraph)`
    color: ${props => props.color};
`;


//card
export const Card = styled.div`
    width: 255px;
    height: 355px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-around;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
    background: ${props => props.color['background']};
    border: ${props => props.color['border']};
`;

//title
export const TitleBox = styled(ExpBanner)`
    height: 40px;
`;

export const TitleTextContainer = styled(BannerTextContainer)`
    height: 40px;
`;

export const CompanyLogo = styled.img`
    width: 25px;
    height: 25px;
    object-fit: contain;
    object-position: center;
    border-radius: 100%;
    border: 1px solid #E8E8E8;
`;

export const CompanyName = styled(Medium)`
    color: black;
    width: 107.5px;
    height: 35px;
`;

export const CompanyAddress = styled(Paragraph)`
    color: black;
    width: 107.5px;
    height: 35px;
`;

//image
export const ItemImage = styled.img`
    width: 254px;
    height: 190px;
    object-fit: contain;
    object-position: center;
`;

//Info
export const InfoBox = styled(ExpBanner)`
    width: 235px;
    height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    justify-content: space-between;
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
    width: 255px;
    height: 45px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const DescriptionTextContainer = styled(DescriptionBox)`
    align-items: flex-start;
    width: 235px;
    overflow: hidden;
`;

export const DescriptionText = styled(Regular)`
    color: ${props => props.color};
    font-size: 0.5em;
    height: auto;
    max-height: 45px;
    width: 235px;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
    overflow: hidden;
`;

export const ButtonBox = styled(ExpBanner)`
    width: 235px;
    height: 35px;
    padding-left: 10px;
    padding-right: 10px;
    justify-content: space-between;
`;

export const ButtonText = styled(Medium)`
    font-size: 0.75em;
    color: black;
    max-width: 75px;
    max-height: 25px;
`;
