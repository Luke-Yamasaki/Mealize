import React,{ useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

//components
import { ItemCard } from '../../Components/ItemCard';
import { DairyIcon } from '../../Assets/Icons/FoodGroups/Dairy';
import { VegetablesIcon } from '../../Assets/Icons/FoodGroups/Vegetables';
import { FruitsIcon } from '../../Assets/Icons/FoodGroups/Fruits';
import { GrainsIcon } from '../../Assets/Icons/FoodGroups/Grains';
import { ProteinIcon } from '../../Assets/Icons/FoodGroups/Protein';
// import styles from './Home.module.css';
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
    align-items: left;
    justify-content: flex-start;
    width: 200px;
    height: 1000px;
    gap: 15px;
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

const SideBarInfoBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 175px;
    height: 50px;
`;

const SideBarInfoText = styled.div`
    font-size: 12px;
    color: black;
    font-weight: bold;
`;

const SidebarInfoImage = styled.div`
    overflow: hidden;
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

export const Home = () => {
    const sessionUser = useSelector(state => state.session.user);
    const categoriesObj = useSelector(state => state.categories)
    const organizationsObj = useSelector(state => state.organizations)
    const postsObj = useSelector(state => state.posts.posts)
    const [categories, setCategories] = useState(Object.values(categoriesObj));
    const [businesses, setBusinesses] = useState(Object.values(organizationsObj.businesses));
    const [nonprofits, setNonprofits] = useState(Object.values(organizationsObj.nonprofits));
    const [posts, setPosts] = useState(Object.values(postsObj));
    console.log(categories)
    useEffect(() => {
        console.log('hello')
    },[posts, businesses, nonprofits])

    // if(sessionUser && sessionUser.isNonprofit) {
        return(
            <Wrapper>
                <SideBarContainer>
                    Filter
                    <SideBar>Categories
                        {categories.map(category => (
                            <SideBarInfoBox key={category.id}>
                                <SidebarInfoImage key={category.id}>
                                    {category.category === 'Dairy' ?
                                    <DairyIcon dimension={'small'}/>
                                    : category.category === 'Vegetables' ?
                                    <VegetablesIcon dimension={'small'}/>
                                    : category.category === 'Fruits' ?
                                    <FruitsIcon dimension={'small'}/>
                                    : category.category === 'Grains' ?
                                    <GrainsIcon />
                                    : <ProteinIcon dimension={'small'}/>
                                    }
                                </SidebarInfoImage>

                                <SideBarInfoText key={category.id}>[{category.category}]</SideBarInfoText>
                            </SideBarInfoBox>
                        ))}
                    </SideBar>
                    <SideBar>Categories</SideBar>
                    <SideBar>Categories</SideBar>
                </SideBarContainer>
                <div style={{display: 'flex', flexDirection: 'column', width: '60%', height: 'auto'}}> Posts
                    <FeedContainer>
                        {posts && Object.entries(posts).reverse().map(post => <ItemCard key={post[1].id} post={post[1]} sessionUser={sessionUser} />)}
                    </FeedContainer>
                </div>
                <SideBarContainer>
                    Map
                <SideBar />
                </SideBarContainer>
        </Wrapper>

        )
    // } else {
    //     return (
    //         <Wrapper>
    //             <SideBarContainer>
    //                 Filter
    //             <SideBar />
    //             <SideBar />
    //             <SideBar />
    //             </SideBarContainer>
    //             <div style={{display: 'flex', flexDirection: 'column', width: '60%', height: 'auto'}}> Posts
    //                 <FeedContainer>
    //                 {posts && Object.entries(posts).map(post => <ItemCard key={post[1].id} post={post[1]} sessionUser={sessionUser} />)}
    //                 </FeedContainer>
    //             </div>
    //             <SideBarContainer>
    //                 Map
    //             <SideBar />
    //             </SideBarContainer>
    //         </Wrapper>
    //     )
    // };
};
