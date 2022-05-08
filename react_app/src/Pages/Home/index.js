//Hooks
import { useSelector } from 'react-redux';
import { useTheme } from '../../Context/ThemeContext';
import { useFilter } from '../../Context/FilterContext';
//Components
import { ItemCard } from '../../Components/Cards/ItemCard';
import { CategoryBox } from '../../Components/Filter';
//Icons
// import { DairyIcon } from '../../Assets/Icons/FoodGroups/Dairy';
// import { VegetablesIcon } from '../../Assets/Icons/FoodGroups/Vegetables';
// import { FruitsIcon } from '../../Assets/Icons/FoodGroups/Fruits';
// import { GrainsIcon } from '../../Assets/Icons/FoodGroups/Grains';
// import { ProteinIcon } from '../../Assets/Icons/FoodGroups/Protein';
import { FavoritesFilterIcon } from '../../Assets/Icons/FavoritesFilterIcon';
import { AvailableIcon, UnavailableIcon } from '../../Assets/Icons/Availability';
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
    VectorBox,
    ImageBox,
    FeedContainer,
    FilterTitle,
    PostsTitle,
    PostsSection
} from '../../Components/Styled/Layout';
//Categories
// import { categoriesList } from '../../utils/Categories/categories';

export const Home = () => {
    const {filter, setFilter} = useFilter();
    const {theme} = useTheme();
    const sessionUser = useSelector(state => state.session.user);
    const categoriesObj = useSelector(state => state.categories)
    const organizationsObj = useSelector(state => state.organizations)
    const postsObj = useSelector(state => state.posts.all);

    const categories = Object.values(categoriesObj);
    const businesses = Object.values(organizationsObj.businesses);
    const threeBusinesses = businesses.slice(0, 3);
    const nonprofits = Object.values(organizationsObj.nonprofits);
    const threeNonprofits = nonprofits.slice(0, 3);

    const posts = Object.values(postsObj)
    const requestsArr = []
    const itemsArr = []
    const available = []
    const unavailable = []
    // const availableItems = []
    // const unavailableItems = []
    // const availableRequests = []
    // const unavailableRequests = []
    // const separateItems = posts.map(post => post.isItem === true  ? itemsArr.push(post) : requestsArr.push(post))
    // const findAvailable = posts.map(post => post.isItem && post.status > 0 ? unavailableItems.push(post) : post.isItem && post.status === 0 ? availableItems.push(post) : post.isItem === false && post.status > 0 ? unavailableRequests.push(post) : availableRequests.push(post))
    // const allAvailable = posts.map(post => post.status === 0 ? available.push(post) : unavailable.push(post))

    const dairyArr = []
    const vegetablesArr = []
    const fruitsArr = []
    const grainsArr = []
    const proteinArr = []

    // const categoriesSplit = posts.map(post => parseInt(post.categoryId) === 1 ? dairyArr.push(post) : parseInt(post.categoryId) === 2 ? vegetablesArr.push(post) : parseInt(post.categoryId) === 3 ? fruitsArr.push(post) : parseInt(post.categoryId) === 4 ? grainsArr.push(post) : proteinArr.push(post))

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
                <FilterTitle theme={theme}>Filter</FilterTitle>
                {sessionUser && (
                    <SideField theme={theme}>
                        <SideLegend theme={theme}>Favorites</SideLegend>
                        <SideBarInfoBox onClick={() => setFilter('favorites')}>
                            <VectorBox resize='32px'>
                                <FavoritesFilterIcon theme={theme}/>
                            </VectorBox>
                            <SideBarInfoText>My favorites</SideBarInfoText>
                        </SideBarInfoBox>
                    </SideField>
                )}
                <SideField theme={theme}>
                    <SideLegend theme={theme}>Availability</SideLegend>
                    <SideBarInfoBox onClick={() => setFilter('available')}>
                        <VectorBox resize='32px'>
                            <AvailableIcon theme={theme} />
                        </VectorBox>
                        <SideBarInfoText theme={theme}>Available</SideBarInfoText>
                    </SideBarInfoBox>
                    <SideBarInfoBox onClick={() => setFilter('unavailable')}>
                        <VectorBox resize='32px'>
                            <UnavailableIcon theme={theme} />
                        </VectorBox>
                        <SideBarInfoText theme={theme}>Unavailable</SideBarInfoText>
                    </SideBarInfoBox>
                </SideField>
                <SideField theme={theme}>
                    <SideLegend theme={theme}>Post type</SideLegend>
                    <SideBarInfoBox onClick={() => setFilter('requests')}>
                        <VectorBox resize='32px'>
                            <Business />
                        </VectorBox>
                        <SideBarInfoText theme={theme}>Requests</SideBarInfoText>
                    </SideBarInfoBox>
                    <SideBarInfoBox onClick={() => setFilter('items')}>
                        <VectorBox resize='32px'>
                            <Nonprofit />
                        </VectorBox>
                        <SideBarInfoText theme={theme}>Items</SideBarInfoText>
                    </SideBarInfoBox>
                </SideField>
                <SideField theme={theme}>
                    <SideLegend theme={theme}>Categories</SideLegend>
                    {categories.map((group, idx) => (
                        <CategoryBox key={idx} category={group.category} onClick={setFilter(group.category.toLowerCase())} />
                    ))}
                </SideField>
                <SideField theme={theme}>
                    <SideLegend theme={theme}>Nonprofits</SideLegend>
                    {threeNonprofits.map((nonprofit, idx) => (
                    <SideBarInfoBox key={idx}>
                        <ImageBox src={nonprofit.logoUrl} alt='Nonprofit logo' />
                        <SideBarInfoText theme={theme}>{nonprofit.name}</SideBarInfoText>
                    </SideBarInfoBox>
                    ))}
                </SideField>
                <SideField theme={theme}>
                    <SideLegend theme={theme}>Businesses</SideLegend>
                {threeBusinesses.map((business, idx) => (
                    <SideBarInfoBox key={idx}>
                        <ImageBox src={business.logoUrl} alt='Business logo' />
                        <SideBarInfoText theme={theme}>{business.name}</SideBarInfoText>
                    </SideBarInfoBox>
                ))}
                </SideField>
            </SideBarContainer>
            <PostsSection>
                <PostsTitle theme={theme}>Posts</PostsTitle>
                <FeedContainer>
                    {!sessionUser && posts.map((post, idx) => <ItemCard key={idx} post={post} />)}
                    {filter === 'available' && available.map((post, idx) => <ItemCard key={idx} post={post} />)}
                    {filter === 'unavailable' && unavailable.map((post, idx) => <ItemCard key={idx} post={post} />)}
                    {filter === 'items' && itemsArr.map((post, idx) => <ItemCard key={idx} post={post} />)}
                    {filter === 'requests' && requestsArr.map((post, idx) => <ItemCard key={idx} post={post} />)}
                    {filter === 'dairy' && dairyArr.map((post, idx) => <ItemCard key={idx} post={post} />)}
                    {filter === 'vegetables' && vegetablesArr.map((post, idx) => <ItemCard key={idx} post={post} />)}
                    {filter === 'fruits' && fruitsArr.map((post, idx) => <ItemCard key={idx} post={post} />)}
                    {filter === 'grains' && grainsArr.map((post, idx) => <ItemCard key={idx} post={post} />)}
                    {filter === 'protein' && proteinArr.map((post, idx) => <ItemCard key={idx} post={post} />)}
                    {filter === 'favorites' && favoritesArr.map((post, idx) => <ItemCard key={idx} post={post} />)}
                </FeedContainer>
            </PostsSection>
        </PageBackGround>
    )
};
