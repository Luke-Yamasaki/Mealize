import styled from "styled-components";
import { ExtraBold } from "./Fonts";



export const SearchSection = styled.section`
    max-width: 1125px;
    width: calc(100vw - 100px);
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 25px;
    padding: 0px 50px 0px 50px;
`;

export const SearchTitle = styled(ExtraBold)`
    margin-top: 10px;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    font-size: ${props => props.filter ? '21px' : '1rem'};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: ${props => props.filter ? 'center' : 'flex-start'};
    gap: 10px;
    height: 30px;
`;

export const SearchWord = styled(SearchTitle)`
    display: flex;
    align-items:center;
    justify-content: center;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    font-weight: 700;
    font-style: italic;
    font-size: clamp(14px, 1rem, 24px);
    margin: 0px;
`;

export const SearchFeed = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 25px;
`;

export const NoSearchTitle = styled(SearchTitle)`
    justify-content: center;
    font-size: 15px;
`;

export const NoResults = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 10px;
`;

export const NoResultsImage = styled.img`
    object-fit: contain;
    object-position: center;
    width: 105%;
    max-height: 700px;
    height: 60vh;
`;
