import React,{ useState } from 'react';
import { useSelector } from 'react-redux';

import { ItemCard } from '../../Components/ItemCard';
import { RequestCard } from '../../Components/RequestCard';

import styles from './Home.module.css';
import styled from 'styled-components';


const Wrapper = styled.div`
    width: 80vw;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: top;
    background-color: #327647;
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
    width: 250px;
    height: 400px;
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
    width: 100%;
    height: auto;
    min-height: 95vh;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: blue;
    gap: 7px;
`;

const Posts = styled.div`
    width: 240px;
    height: 336px;
    border-radius: 5px;
    background-color: white;
`;

export const Home = ({posts}) => {
    const sessionUser = useSelector(state => state.session.user);
    const [isItem, setIsItem] = useState(sessionUser && sessionUser.isNonprofit ? true : false);
    const postsArr = Object.entries(posts)
    const items = postsArr.filter(post => post[1].isItem === true);
    console.log(items)
    const requests = postsArr.filter(post => post[1].isItem === false);
    console.log(requests)
    if(!sessionUser) {
        return(
            <Wrapper>
                <SideBarContainer>
                    Filter
                <SideBar />
                <SideBar />
                <SideBar />
                </SideBarContainer>
                <div style={{display: 'flex', flexDirection: 'column', width: '60%', height: 'auto'}}> Posts
                    <FeedContainer>
                        {postsArr?.forEach(post => (post.isItem ? <ItemCard key={post.id} post={post} /> : <RequestCard key={post.id} post={post} /> ))}
                    </FeedContainer>
                </div>

                <SideBarContainer>
                    Map
                <SideBar />
                </SideBarContainer>
        </Wrapper>

        )
    }

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
                    {postsArr?.forEach(post => (post.isItem ? <ItemCard key={post.id} post={post} /> : <RequestCard key={post.id} post={post} /> ))}
                </FeedContainer>
            </div>

            <SideBarContainer>
                Map
              <SideBar />
            </SideBarContainer>
        </Wrapper>
    )
};
