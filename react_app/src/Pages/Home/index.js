import { useSelector } from 'react-redux';
import { useState } from 'react';
//components
import { ItemCard } from '../../Components/ItemCard';
import { DairyIcon } from '../../Assets/Icons/FoodGroups/Dairy';
import { VegetablesIcon } from '../../Assets/Icons/FoodGroups/Vegetables';
import { FruitsIcon } from '../../Assets/Icons/FoodGroups/Fruits';
import { GrainsIcon } from '../../Assets/Icons/FoodGroups/Grains';
import { ProteinIcon } from '../../Assets/Icons/FoodGroups/Protein';
import { Business } from '../../Assets/Icons/Business';
import { Nonprofit } from '../../Assets/Icons/Nonprofit';
// import styles from './Home.module.css';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 1500px;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: top;
    background-color: #F5F5F5;
    padding-top: 50px;
    padding-left: 100px;
    gap: 100px;
`;

const SideBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-around;
    width: 200px;
    height: 500px;
    gap: 15px;
`;

const PostField = styled.fieldset`
    width: 150px;
    height: 125px;
    border-radius: 5px;
    border: 1px solid #B2B2B2;
    background-color: #E8E8E8;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-around;
    font-size: 16px;
`;

const CategoryField = styled.fieldset`
    width: 150px;
    height: 285px;
    border-radius: 5px;
    border: 1px solid #B2B2B2;
    background-color: #E8E8E8;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-end;
    font-size: 16px;
    gap: 5px;
`;

// const OrganizationField = styled.fieldset`
//     width: 150px;
//     height: 155px;
//     border-radius: 5px;
//     border: 1px solid #B2B2B2;
//     background-color: #E8E8E8;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-end;
//     justify-content: flex-start;
//     font-size: 16px;
//     padding-bottom: 25px;
// `;

// const EventField = styled.fieldset`
//     width: 200px;
//     height: 400px;
//     border-radius: 5px;
//     border: 1px solid #B2B2B2;
//     background-color: #E8E8E8;
//     display: flex;
//     flex-direction: column;
//     align-items: left;
//     justify-content: space-around;
//     font-size: 16px;
//     padding: 0px;
//     margin: 0px;
// `;

// const EventLegend = styled.legend`
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 100px;
//     height: 20px;
//     font-size: 14px;
//     background-color: #9AF2C0;
//     border: 1px solid rgba(40, 166, 144, 0.5);
//     border-radius: 3px;
//     color: black;
//     margin-left: 5px;
// `;

const SideLegend = styled.legend`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 20px;
    font-size: 14px;
    background-color: #9AF2C0;
    border: 1px solid rgba(40, 166, 144, 0.5);
    border-radius: 3px;
    color: black;
`;

// const OrganizationLegend = styled.legend`
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 100px;
//     height: 20px;
//     font-size: 14px;
//     background-color: #9AF2C0;
//     border: 1px solid rgba(40, 166, 144, 0.5);
//     border-radius: 3px;
//     color: black;
//     margin-bottom: 5px
// `;

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
    width: 870px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 25px;
`;

export const Home = () => {
    const sessionUser = useSelector(state => state.session.user);
    const categoriesObj = useSelector(state => state.categories)
    // const organizationsObj = useSelector(state => state.organizations)
    const categories = Object.values(categoriesObj);
    const postsObj = useSelector(state => state.posts.posts);
    const [mode, setMode] = useState('available')
    // const messages = useSelector(state => state.posts.messages)
    // const [categories, setCategories] = useState(Object.values(categoriesObj));
    // const [businesses, setBusinesses] = useState(Object.values(organizationsObj.businesses));
    // const [nonprofits, setNonprofits] = useState(Object.values(organizationsObj.nonprofits));

    // const businesses = Object.values(organizationsObj.businesses);
    // const threeBusinesses = businesses.slice(0, 3);
    // const nonprofits = Object.values(organizationsObj.nonprofits);
    // const threeNonprofits = nonprofits.slice(0, 3);

    const posts = Object.values(postsObj)
    const requestsArr = []
    const itemsArr = []
    const available = []
    const unavailable = []
    const availableItems = []
    const unavailableItems = []
    const availableRequests = []
    const unavailableRequests = []
    const separateItems = posts.map(post => post.isItem === true  ? itemsArr.push(post) : requestsArr.push(post))
    const findAvailable = posts.map(post => post.isItem && post.status > 0 ? unavailableItems.push(post) : post.isItem && post.status === 0 ? availableItems.push(post) : post.isItem === false && post.status > 0 ? unavailableRequests.push(post) : availableRequests.push(post))
    const allAvailable = posts.map(post => post.status === 0 ? available.push(post) : unavailable.push(post))

    const dairyArr = []
    const vegetablesArr = []
    const fruitsArr = []
    const grainsArr = []
    const proteinArr = []

    const categoriesSplit = posts.map(post => parseInt(post.categoryId) === 1 ? dairyArr.push(post) : parseInt(post.categoryId) === 2 ? vegetablesArr.push(post) : parseInt(post.categoryId) === 3 ? fruitsArr.push(post) : parseInt(post.categoryId) === 4 ? grainsArr.push(post) : proteinArr.push(post))

    // if(sessionUser && sessionUser.isNonprofit) {
        return(
            <Wrapper>
                <SideBarContainer>
                    <h2>Filter</h2>
                    <PostField>
                        <SideLegend>Post type</SideLegend>
                        <SideBarInfoBox onClick={() => setMode('requests')}>
                          <Business /> <div>Requests</div>
                        </SideBarInfoBox>
                        <SideBarInfoBox onClick={() => setMode('items')}>
                           <Nonprofit /> <div>Items</div>
                        </SideBarInfoBox>
                    </PostField>
                    <CategoryField>
                        <SideLegend>Categories</SideLegend>
                        {categories.map((category, idx) => (
                            <SideBarInfoBox key={idx}>
                                {category.category === 'Dairy' ?
                                <SidebarInfoImage onClick={() => setMode('dairy')}><DairyIcon dimension={'small'}/></SidebarInfoImage>
                                : category.category === 'Vegetables' ?
                                <SidebarInfoImage onClick={() => setMode('vegetables')}><VegetablesIcon dimension={'small'}/></SidebarInfoImage>
                                : category.category === 'Fruits' ?
                                <SidebarInfoImage onClick={() => setMode('fruits')}><FruitsIcon dimension={'small'} onClick={() => setMode('fruits')}/></SidebarInfoImage>
                                : category.category === 'Grains' ?
                                <SidebarInfoImage onClick={() => setMode('grains')}><GrainsIcon onClick={() => setMode('grains')}/></SidebarInfoImage>
                                : <SidebarInfoImage onClick={() => setMode('protein')}><ProteinIcon dimension={'small'} onClick={() => setMode('protein')}/></SidebarInfoImage>
                                }
                                <SideBarInfoText>{category.category}</SideBarInfoText>
                            </SideBarInfoBox>
                        ))}
                    </CategoryField>
                    {/* <OrganizationField>
                        <OrganizationLegend>Nonprofits</OrganizationLegend>
                    {threeNonprofits.map((nonprofit, idx) => (
                        <SideBarInfoBox key={idx}>
                            <SidebarInfoImage >
                                <img src={nonprofit.logoUrl} alt='' style={{width: '30px', height: '30px', borderRadius: '5px', objectFit: 'cover', objectPosition: 'center', backgroundColor: 'black'}} />
                            </SidebarInfoImage>
                            <SideBarInfoText >{nonprofit.name}</SideBarInfoText>
                        </SideBarInfoBox>
                        ))}
                    </OrganizationField>
                    <OrganizationField>
                        <OrganizationLegend>Businesses</OrganizationLegend>
                    {threeBusinesses.map((business, idx) => (
                        <SideBarInfoBox key={idx}>
                            <SidebarInfoImage >
                                <img src={business.logoUrl} alt='' style={{width: '30px', height: '30px', borderRadius: '5px', objectFit: 'cover', backgroundColor: 'black'}} />
                            </SidebarInfoImage>
                            <SideBarInfoText>{business.name}</SideBarInfoText>
                        </SideBarInfoBox>
                    ))}
                    </OrganizationField> */}
                </SideBarContainer>
                <div style={{display: 'flex', flexDirection: 'column', width: '895px', height: 'auto', gap: '25px'}}>
                    <h2 style={{marginTop: '0px'}}>Posts</h2>
                    <FeedContainer>
                        {mode === 'available' && available.map((post, idx) => <ItemCard key={idx} post={post} sessionUser={sessionUser}/>)}
                        {mode === 'unavailable' && unavailable.map((post, idx) => <ItemCard key={idx} post={post} sessionUser={sessionUser}/>)}
                        {mode === 'items' && itemsArr.map((post, idx) => <ItemCard key={idx} post={post} sessionUser={sessionUser}/>)}
                        {mode === 'requests' && requestsArr.map((post, idx) => <ItemCard key={idx} post={post} sessionUser={sessionUser}/>)}
                        {mode === 'dairy' && dairyArr.map((post, idx) => <ItemCard key={idx} post={post} sessionUser={sessionUser}/>)}
                        {mode === 'vegetables' && vegetablesArr.map((post, idx) => <ItemCard key={idx} post={post} sessionUser={sessionUser}/>)}
                        {mode === 'fruits' && fruitsArr.map((post, idx) => <ItemCard key={idx} post={post} sessionUser={sessionUser}/>)}
                        {mode === 'grains' && grainsArr.map((post, idx) => <ItemCard key={idx} post={post} sessionUser={sessionUser}/>)}
                        {mode === 'protein' && proteinArr.map((post, idx) => <ItemCard key={idx} post={post} sessionUser={sessionUser}/>)}
                    </FeedContainer>
                </div>
        </Wrapper>
        )
};
