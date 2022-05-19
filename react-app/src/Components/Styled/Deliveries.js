import styled from "styled-components";
import { Bold, ExtraBold } from "./Fonts";

export const DeliveryPageWrapper = styled.main`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: top;
    width: 1600px;
    height: 900px;
`;

export const DeliverySideMenu = styled.section`
    width: 400px;
    height: 900px;
    overflow-x: hidden;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    border: ${props => props.theme === 'light' ? '#B7B7B7' : 'white'};
`;

export const DeliveryList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    list-style: none;
    margin-top: 20px;
    padding: 0px;
    width: 100%;
    height: 45px;
    font-family: motiva-sans, sans-serif;
    font-weight: 800;
    font-size: 18px;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;


export const DeliveryItem = styled.li`
    list-style: none;
    padding: 0px;
    cursor: pointer;
    margin: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    padding: 5px 5px 5px 15px;
    width: 100%;
    height: 180px;
    border: ${props => props.theme === 'light' ? '0.1px solid #B7B7B7' : props.theme === 'dark' ? '0.1px solid rgba(255, 255, 255, 0.1)' : 'none'};
`;

export const DeliveryTime = styled(Bold)`
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: left;
    width: 90%;
    height: 20px;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

export const DeliveryField = styled.section`
    width: 75%;
    height: 100%;
    display: flex;
    flex-direction: column;
    algin-items: flex-start;
    justify-content: space-between;
    background-color: ${props => props.theme === 'light' ? '#F1F1F1' : '#191919'};
    border-left: ${props => props.theme === 'light' ? '1px solid #B7B7B7' : '1px solid #F1F1F1'};
`;

export const SelectDeliveryBox = styled.div`
    width: 1200px;
    height: 900px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SelectDeliveryText = styled(ExtraBold)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 700px;
    height: 200px;
    line-height: 50px;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;
