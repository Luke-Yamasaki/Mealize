import React,{ useState } from 'react';
import { useSelector } from 'react-redux';

import { ItemCard } from '../../Components/ItemCard';
import { RequestCard } from '../../Components/RequestCard';

import styles from './Home.module.css';
import styled from 'styled-components';


const Wrapper = styled.div`
    width: 1600px;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: top;
    background-color: #F5F5F5;
    padding-top: 50px;
`;

const SideBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 15%;
    height: 1600px;
    position: sticky;
    gap: 5px;
`;

const SideBar = styled.aside`
    width: 200px;
    height: 300px;
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
    width: 800px;
    height: auto;
    min-height: 95vh;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;
`;

const Posts = styled.div`
    width: 240px;
    height: 336px;
    border-radius: 5px;
    background-color: white;
`;

export const Home = () => {
    const sessionUser = useSelector(state => state.session.user);
    const organizations = useSelector(state => state.organizations)
    const posts = Object.entries(useSelector(state => state.posts.posts));
    // let items = posts.filter(post => post[1].isItem === true);
    // let requests = posts.filter(post => post[1].isItem === false);

    if(sessionUser && sessionUser.isNonprofit) {
        return(
            <Wrapper>
                <SideBarContainer>
                    Filter
                    <SideBar>Categories</SideBar>
                    <SideBar>Categories</SideBar>
                    <SideBar>Categories</SideBar>
                </SideBarContainer>
                <div style={{display: 'flex', flexDirection: 'column', width: '60%', height: 'auto'}}> Posts
                    <FeedContainer>
                        {posts.reverse().map(post => <ItemCard key={post[1].id} post={post[1]} sessionUser={sessionUser} />)}
                    </FeedContainer>
                </div>
                <SideBarContainer>
                    Map
                <SideBar />
                </SideBarContainer>
        </Wrapper>

        )
    } else {
        return (
            <Wrapper>
                <SideBarContainer>
                    Filter
                <SideBar />
                <SideBar />
                <SideBar />
                </SideBarContainer>
                <div style={{display: 'flex', flexDirection: 'column', width: '60%', height: 'auto'}}> Posts
                    <FeedContainer>
                    {posts.map(post => <ItemCard key={post[1].id} post={post[1]} sessionUser={sessionUser} />)}
                    </FeedContainer>
                </div>
                <SideBarContainer>
                    Map
                <SideBar />
                </SideBarContainer>
            </Wrapper>
        )
    };
};
