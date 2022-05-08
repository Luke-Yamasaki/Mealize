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
import {
    PageBackGround,
    SideBarContainer,
    SideField,
    SideLegend,
    SideBarInfoBox,
    SideBarInfoText,
    IconBox,
    FeedContainer,
    FilterTitle,
    PostsTitle,
    PostsSection
} from '../../Components/Styled/Layout';

export const Home = () => {
    const sessionUser = useSelector(state => state.session.user);
    const categoriesObj = useSelector(state => state.categories)
    const organizationsObj = useSelector(state => state.organizations)
    const categories = Object.values(categoriesObj);
    const postsObj = useSelector(state => state.posts.all);
    const [mode, setMode] = useState('available');
    const {theme} = useTheme();

    const businesses = Object.values(organizationsObj.businesses);
    const threeBusinesses = businesses.slice(0, 3);
    const nonprofits = Object.values(organizationsObj.nonprofits);
    const threeNonprofits = nonprofits.slice(0, 3);

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

    return(
        <PageBackGround background={theme === 'light' ? '#E8E8E8' : '#232323'} bordercolor={theme === 'light' ? '#B2B2B2' : '#616161'}>
            <SideBarContainer>
                {!sessionUser && (
                    <FilterTitle theme={theme}>Filter</FilterTitle>
                )}
                {sessionUser && (
                    <>
                        <FilterTitle theme={theme}>Filter</FilterTitle>
                        <SideField theme={theme}>
                            <SideLegend theme={theme}>Favorites</SideLegend>
                            <SideBarInfoBox onClick={() => setMode('favorites')}>
                                <div style={{textDecoration: 'underline'}}>My favorites</div>
                            </SideBarInfoBox>
                        </SideField>
                    </>
                )}
                <SideField theme={theme}>
                    <SideLegend theme={theme}>Availability</SideLegend>
                    <SideBarInfoBox onClick={() => setMode('available')}>
                        <SideBarInfoText theme={theme}>Available</SideBarInfoText>
                    </SideBarInfoBox>
                    <SideBarInfoBox onClick={() => setMode('available')}>
                        <SideBarInfoText theme={theme}>Unavailable</SideBarInfoText>
                    </SideBarInfoBox>
                </SideField>
                <SideField theme={theme}>
                    <SideLegend theme={theme}>Post type</SideLegend>
                    <SideBarInfoBox onClick={() => setMode('requests')}>
                        <Business />
                        <SideBarInfoText theme={theme}>Requests</SideBarInfoText>
                    </SideBarInfoBox>
                    <SideBarInfoBox onClick={() => setMode('items')}>
                        <Nonprofit />
                        <SideBarInfoText theme={theme}>Items</SideBarInfoText>
                    </SideBarInfoBox>
                </SideField>
                <SideField theme={theme}>
                    <SideLegend theme={theme}>Categories</SideLegend>
                    {categories.map((category, idx) => (
                        <SideBarInfoBox key={idx}>
                            {category.category === 'Dairy' ?
                            <IconBox onClick={() => setMode('dairy')}><DairyIcon dimension={'small'}/></IconBox>
                            : category.category === 'Vegetables' ?
                            <IconBox onClick={() => setMode('vegetables')}><VegetablesIcon dimension={'small'}/></IconBox>
                            : category.category === 'Fruits' ?
                            <IconBox onClick={() => setMode('fruits')}><FruitsIcon dimension={'small'} /></IconBox>
                            : category.category === 'Grains' ?
                            <IconBox onClick={() => setMode('grains')}><GrainsIcon dimension={'small'}/></IconBox>
                            : <IconBox onClick={() => setMode('protein')}><ProteinIcon dimension={'small'}/></IconBox>
                            }
                            <SideBarInfoText theme={theme}>{category.category}</SideBarInfoText>
                        </SideBarInfoBox>
                    ))}
                </SideField>
                <SideField theme={theme}>
                    <SideLegend theme={theme}>Nonprofits</SideLegend>
                {threeNonprofits.map((nonprofit, idx) => (
                    <SideBarInfoBox key={idx}>
                        <IconBox>
                            <img src={nonprofit.logoUrl} alt='' style={{width: '30px', height: '30px', borderRadius: '5px', objectFit: 'cover', objectPosition: 'center', backgroundColor: 'black'}} />
                        </IconBox>
                        <SideBarInfoText theme={theme}>{nonprofit.name}</SideBarInfoText>
                    </SideBarInfoBox>
                    ))}
                </SideField>
                <SideField theme={theme}>
                    <SideLegend theme={theme}>Businesses</SideLegend>
                {threeBusinesses.map((business, idx) => (
                    <SideBarInfoBox key={idx}>
                        <IconBox >
                            <img src={business.logoUrl} alt='' style={{width: '30px', height: '30px', borderRadius: '5px', objectFit: 'cover', backgroundColor: 'black'}} />
                        </IconBox>
                        <SideBarInfoText theme={theme}>{business.name}</SideBarInfoText>
                    </SideBarInfoBox>
                ))}
                </SideField>
            </SideBarContainer>
            <PostsSection>
                <PostsTitle theme={theme}>Posts</PostsTitle>
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
            </PostsSection>
        </PageBackGround>
    )
};
