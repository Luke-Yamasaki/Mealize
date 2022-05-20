import styled from "styled-components";
import { ExtraBold } from "./Fonts";



export const SearchSection = styled.section`
    width: 1100px;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 25px;
`;

export const SearchTitle = styled(ExtraBold)`
    margin-top: 10px;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
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
    font-size: 24px;
    margin: 0px;
`;

export const SearchFeed = styled.div`
    width: 1100px;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 25px;
`;
