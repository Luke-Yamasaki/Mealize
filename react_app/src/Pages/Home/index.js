import React,{ useEffect } from 'react';
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
import styles from './Home.module.css';
import gmapImage from '../../Assets/Images/Foodbanks-Denver.png'


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
    width: 300px;
    height: 1000px;
    gap: 15px;
`;

const SideBar = styled.aside`
    width: 200px;
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
    padding-left: 5px;
`;

const SideBarInfoBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 10px;
    align-items: center;
    width: 200px;
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
    // const [categories, setCategories] = useState(Object.values(categoriesObj));
    // const [businesses, setBusinesses] = useState(Object.values(organizationsObj.businesses));
    // const [nonprofits, setNonprofits] = useState(Object.values(organizationsObj.nonprofits));
    const categories = Object.values(categoriesObj);
    const businesses = Object.values(organizationsObj.businesses);
    const threeBusinesses = businesses.slice(0, 3);
    const nonprofits = Object.values(organizationsObj.nonprofits);
    const threeNonprofits = nonprofits.slice(0, 3);

    const posts = Object.values(postsObj);

    useEffect(() => {
    },[posts])

    // if(sessionUser && sessionUser.isNonprofit) {
        return(
            <Wrapper>
                <SideBarContainer>
                    Filter
                    <SideBar>
                        Organization type
                    </SideBar>
                    <SideBar>Categories
                        {categories.map((category, idx) => (
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
                                <SideBarInfoText key={category.id}>{category.category}</SideBarInfoText>
                            </SideBarInfoBox>
                        ))}
                    </SideBar>
                    <SideBar>Nonprofits
                    {threeNonprofits.map((nonprofit, idx) => (
                        <SideBarInfoBox key={nonprofit.id}>
                            <SidebarInfoImage key={nonprofit.id}>
                                <img key={nonprofit.id} src={nonprofit.logoUrl} alt='' style={{width: '30px', height: '30px', borderRadius: '5px', objectFit: 'cover', backgroundColor: 'black'}} />
                            </SidebarInfoImage>
                            <SideBarInfoText key={nonprofit.id}>{nonprofit.name}</SideBarInfoText>
                        </SideBarInfoBox>
                        ))}
                    </SideBar>
                    <SideBar>Businesses
                    {threeBusinesses.map((business, idx) => (
                        <SideBarInfoBox key={business.id}>
                            <SidebarInfoImage key={business.id}>
                                <img key={business.id} src={business.logoUrl} alt='' style={{width: '30px', height: '30px', borderRadius: '5px', objectFit: 'cover', backgroundColor: 'black'}} />
                            </SidebarInfoImage>
                            <SideBarInfoText key={business.id}>{business.name}</SideBarInfoText>
                        </SideBarInfoBox>
                    ))}
                    </SideBar>
                </SideBarContainer>
                <div style={{display: 'flex', flexDirection: 'column', width: '60%', height: 'auto'}}> Posts
                    <FeedContainer>
                        {posts && Object.entries(posts).reverse().map(post => <ItemCard key={post[1].id} post={post[1]} sessionUser={sessionUser} />)}
                    </FeedContainer>
                </div>
                <SideBarContainer>
                    Events
                <SideBar>
                </SideBar>
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
