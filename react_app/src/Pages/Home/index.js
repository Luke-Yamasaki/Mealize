import styles from './Home.module.css';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 80vw;
    height: auto;
    min-height: 94vh;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: top;
    background-color: #327647;
`;

const SideBar = styled.aside`
    width: 15%;
    height: 500px;
    border-radius: 5px;
    border: 1px solid #B2B2B2;
    background-color: #E8E8E8;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-around;
    font-size: 16px;
    color: black;
`;

const FeedContainer = styled.div`
    width: 60%;
    height: auto;
    min-height: 95vh;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: blue;
`;



export const Home = () => {
    return (
        <Wrapper>
            <SideBar />
            <FeedContainer />
            <SideBar />
        </Wrapper>
    )
};
