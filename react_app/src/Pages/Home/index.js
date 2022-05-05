//react hooks
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useTheme } from '../../Context/ThemeContext';
//components
import { ItemCard } from '../../Components/Cards/ItemCard';
//Icons
import { DairyIcon } from '../../Assets/Icons/FoodGroups/Dairy';
import { VegetablesIcon } from '../../Assets/Icons/FoodGroups/Vegetables';
import { FruitsIcon } from '../../Assets/Icons/FoodGroups/Fruits';
import { GrainsIcon } from '../../Assets/Icons/FoodGroups/Grains';
import { ProteinIcon } from '../../Assets/Icons/FoodGroups/Protein';
import { Business } from '../../Assets/Icons/Business';
import { Nonprofit } from '../../Assets/Icons/Nonprofit';
//styled-components
import { PageBackGround, SideBarContainer, PostField, CategoryField, SideLegend, SideBarInfoBox, SideBarInfoText, SideBarInfoIcon, FeedContainer  } from '../../Components/Styled/Light/Layout';
import { DarkPageBackGround, DarkPostField, DarkCategoryField, DarkSideBarInfoText } from '../../Components/Styled/Dark/Layout';

// import styles from './Home.module.css';

export const Home = () => {
    const sessionUser = useSelector(state => state.session.user);
    const categoriesObj = useSelector(state => state.categories)
    // const organizationsObj = useSelector(state => state.organizations)
    const categories = Object.values(categoriesObj);
    const postsObj = useSelector(state => state.posts.all);
    const [mode, setMode] = useState('available');
    const {theme} = useTheme();
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
    let favorites;
    let favoritesArr;
    if(sessionUser) {
        favorites = Object.values(sessionUser.favorites)
        favoritesArr = [];
        favorites.map(fav => favoritesArr.push(posts[fav.postId]));
    }

    // if(sessionUser && sessionUser.isNonprofit) {
        return(
            <PageBackGround background={theme === 'light' ? '#E8E8E8' : '#232323'} bordercolor={theme === 'light' ? '#B2B2B2' : '#6B6B6B'}>
                <SideBarContainer>
                    {!sessionUser && (
                        <h2 style={{marginTop: '-10px', marginBottom: '-5px'}}>Filter</h2>
                    )}
                    {sessionUser && (
                        <>
                            <h2>Filter</h2>
                            <PostField>
                                <SideLegend>Favorites</SideLegend>
                                <SideBarInfoBox onClick={() => setMode('favorites')}>
                                    <div style={{textDecoration: 'underline'}}>My favorites</div>
                                </SideBarInfoBox>
                            </PostField>
                        </>
                    )}
                    <PostField>
                        <SideLegend>Availability</SideLegend>
                        <SideBarInfoBox onClick={() => setMode('available')}>
                            <div style={{textDecoration: 'underline'}}>All available</div>
                        </SideBarInfoBox>
                        <SideBarInfoBox onClick={() => setMode('unavailable')}>
                           <div style={{textDecoration: 'underline'}}>All completed</div>
                        </SideBarInfoBox>
                    </PostField>
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
                                <SideBarInfoIcon onClick={() => setMode('dairy')}><DairyIcon dimension={'small'}/></SideBarInfoIcon>
                                : category.category === 'Vegetables' ?
                                <SideBarInfoIcon onClick={() => setMode('vegetables')}><VegetablesIcon dimension={'small'}/></SideBarInfoIcon>
                                : category.category === 'Fruits' ?
                                <SideBarInfoIcon onClick={() => setMode('fruits')}><FruitsIcon dimension={'small'} /></SideBarInfoIcon>
                                : category.category === 'Grains' ?
                                <SideBarInfoIcon onClick={() => setMode('grains')}><GrainsIcon dimension={'small'}/></SideBarInfoIcon>
                                : <SideBarInfoIcon onClick={() => setMode('protein')}><ProteinIcon dimension={'small'}/></SideBarInfoIcon>
                                }
                                <SideBarInfoText>{category.category}</SideBarInfoText>
                            </SideBarInfoBox>
                        ))}
                    </CategoryField>
                    {/* <OrganizationField>
                        <OrganizationLegend>Nonprofits</OrganizationLegend>
                    {threeNonprofits.map((nonprofit, idx) => (
                        <SideBarInfoBox key={idx}>
                            <SideBarInfoIcon >
                                <img src={nonprofit.logoUrl} alt='' style={{width: '30px', height: '30px', borderRadius: '5px', objectFit: 'cover', objectPosition: 'center', backgroundColor: 'black'}} />
                            </SideBarInfoIcon>
                            <SideBarInfoText >{nonprofit.name}</SideBarInfoText>
                        </SideBarInfoBox>
                        ))}
                    </OrganizationField>
                    <OrganizationField>
                        <OrganizationLegend>Businesses</OrganizationLegend>
                    {threeBusinesses.map((business, idx) => (
                        <SideBarInfoBox key={idx}>
                            <SideBarInfoIcon >
                                <img src={business.logoUrl} alt='' style={{width: '30px', height: '30px', borderRadius: '5px', objectFit: 'cover', backgroundColor: 'black'}} />
                            </SideBarInfoIcon>
                            <SideBarInfoText>{business.name}</SideBarInfoText>
                        </SideBarInfoBox>
                    ))}
                    </OrganizationField> */}
                </SideBarContainer>
                <div style={{display: 'flex', flexDirection: 'column', width: '895px', height: 'auto', gap: '25px'}}>
                    <h2 style={{marginTop: '0px'}}>Posts</h2>
                    <FeedContainer>
                        {!sessionUser && posts.map((post, idx) => <ItemCard key={idx} post={post} sessionUser={sessionUser}/>)}
                        {mode === 'available' && available.map((post, idx) => <ItemCard key={idx} post={post} sessionUser={sessionUser}/>)}
                        {mode === 'unavailable' && unavailable.map((post, idx) => <ItemCard key={idx} post={post} sessionUser={sessionUser}/>)}
                        {mode === 'items' && itemsArr.map((post, idx) => <ItemCard key={idx} post={post} sessionUser={sessionUser}/>)}
                        {mode === 'requests' && requestsArr.map((post, idx) => <ItemCard key={idx} post={post} sessionUser={sessionUser}/>)}
                        {mode === 'dairy' && dairyArr.map((post, idx) => <ItemCard key={idx} post={post} sessionUser={sessionUser}/>)}
                        {mode === 'vegetables' && vegetablesArr.map((post, idx) => <ItemCard key={idx} post={post} sessionUser={sessionUser}/>)}
                        {mode === 'fruits' && fruitsArr.map((post, idx) => <ItemCard key={idx} post={post} sessionUser={sessionUser}/>)}
                        {mode === 'grains' && grainsArr.map((post, idx) => <ItemCard key={idx} post={post} sessionUser={sessionUser}/>)}
                        {mode === 'protein' && proteinArr.map((post, idx) => <ItemCard key={idx} post={post} sessionUser={sessionUser}/>)}
                        {mode === 'favorites' && favoritesArr.map((post, idx) => <ItemCard key={idx} post={post} sessionUser={sessionUser}/>)}
                    </FeedContainer>
                </div>
        </PageBackGround>
        )
};
