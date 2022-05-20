//Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../Context/ThemeContext';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

//Actions
import { getAllPosts } from '../../store/posts';

//Components
import { PostsFeed } from '../../Components/PostsFeed';
import { CategoryFilter } from '../../Components/Filter/category';
import { FavoritesFilter } from '../../Components/Filter/favorite';
import { AvailabilityFilter } from '../../Components/Filter/availability';
import { PostTypeFilter } from '../../Components/Filter/postType';
import { OrganizationCard } from '../../Components/Cards/OrganizationCard';
import { PostCard } from '../../Components/Cards/PostCard';

//styled-components
import {
    PageBackGround,
    SideBarContainer,
    FilterTitle,
    PostsTitle,
    PostsSection
} from '../../Components/Styled/Layout';

import {
    SearchTitle,
    SearchSection,
    SearchFeed,
    SearchWord
} from '../../Components/Styled/Search';

export const SearchPage = () => {
    const sessionUser = useSelector(state => state.session.user);
    const categoriesObj = useSelector(state => state.categories);
    const businesses = useSelector(state => state.organizations.businesses);
    const nonprofits = useSelector(state => state.organizations.nonprofits);
    const posts = useSelector(state => state.posts.all);
    const [searchFilter, setSearchFilter] = useState();
    const { searchword } = useParams();
    const dispatch = useDispatch();
    const {theme} = useTheme();

    const lowerSearch = searchword.toLowerCase();

    useEffect(() => {
        dispatch(getAllPosts())
    },[dispatch])

    //Common searchwords
    const businessSearch = ['business', 'businesses'];
    const nonprofitSearch = ['nonprofit', 'nonprofits', 'non profit', 'non profits', 'non-profit', 'non-profits', 'charity', 'charitable', 'food bank', 'food banks', 'foodbank', 'foodbanks', 'food pantry', 'food pantries'];
    const itemSearch = ['item', 'items', 'food', 'foods', 'donations', 'donation'];
    const requestSearch = ['request', 'requests'];

    //Organizations
    const businessArr = Object.values(businesses);
    const nonprofitsArr = Object.values(nonprofits);

    const allOrgs = {...nonprofits, ...businesses};
    const organizationsArr = Object.values(allOrgs);
    const orgResultsArr = organizationsArr.filter(org => org.name.toLowerCase().includes(lowerSearch) || org.description.toLowerCase().includes(lowerSearch) || org.street.toLowerCase().includes(lowerSearch) || org.city.toLowerCase().includes(lowerSearch) || org.state.toLowerCase().includes(lowerSearch))

    //Posts
    const allPosts = Object.values(posts);
    const postsResultsArr = allPosts.filter(post => post.title.toLowerCase().includes(lowerSearch) || post.description.toLowerCase().includes(lowerSearch))

    const availableArr = Object.values(posts).filter(post => post.status === 0);
    const unavailableArr = Object.values(posts).filter(post => post.status > 0);

    const itemsArr = Object.values(posts).filter(post => post.isItem);
    const requestsArr = Object.values(posts).filter(post => !post.isItem);

    const dairyArr = Object.values(posts).filter(post => post.categoryId === 1);
    const vegetablesArr = Object.values(posts).filter(post => post.categoryId === 2);
    const fruitsArr = Object.values(posts).filter(post => post.categoryId === 3);
    const grainsArr = Object.values(posts).filter(post => post.categoryId === 4);
    const proteinArr = Object.values(posts).filter(post => post.categoryId === 5);

    const categories = Object.values(categoriesObj);

    useEffect(() => {
        if(businessSearch.includes(lowerSearch)) {
            setSearchFilter('business')
        } else if(nonprofitSearch.includes(lowerSearch)) {
            setSearchFilter('nonprofit')
        } else if(itemSearch.includes(lowerSearch)) {
            setSearchFilter('items')
        } else if(requestSearch.includes(lowerSearch)) {
            setSearchFilter('request')
        } else if(lowerSearch.includes('dairy') || lowerSearch.includes('dairies')) {
            setSearchFilter('dairy')
        } else if(lowerSearch.includes('vegetables') || lowerSearch.includes('vegetable') || lowerSearch.includes('veggies')) {
            setSearchFilter('vegetables')
        } else if(lowerSearch.includes('fruits') || lowerSearch.includes('fruit')) {
            setSearchFilter('fruits')
        } else if(lowerSearch.includes('grains') || lowerSearch.includes('grain')) {
            setSearchFilter('grains')
        } else if(lowerSearch.includes('protein') || lowerSearch.includes('proteins') || lowerSearch.includes('meats') || lowerSearch.includes('meat')) {
            setSearchFilter('protein')
        } else if(orgResultsArr.length > 0 && postsResultsArr.length > 0) {
            setSearchFilter('both')
        } else if(orgResultsArr.length > 0 && !postsResultsArr.length) {
            setSearchFilter('organization-search')
        } else if(!orgResultsArr.length && postsResultsArr.length > 0) {
            setSearchFilter('posts-search')
        } else {
            setSearchFilter('none')
        }
    },[searchword])

    return(
        <PageBackGround background={theme === 'light' ? '#E8E8E8' : '#232323'} position='center' bordercolor={theme === 'light' ? '#B2B2B2' : '#616161'}>
            <SearchSection>
                <SearchTitle theme={theme}>Search results for:<SearchWord theme={theme}>{searchword}</SearchWord></SearchTitle>
                <SearchFeed>
                    {searchFilter === 'business' && businessArr.map(business =>
                    <>
                        <SearchTitle theme={theme}>Businesses</SearchTitle>
                        <OrganizationCard organization={business} />
                    </>
                    )}
                    {searchFilter === 'nonprofit' &&
                        nonprofitsArr.map(nonprofit =>
                            <OrganizationCard organization={nonprofit} />
                        )
                    }
                    {searchFilter === 'items' && itemsArr.map(item =>
                        <PostCard post={item} />
                    )}
                    {searchFilter === 'request' && requestsArr.map(request =>
                        <PostCard post={request} />
                    )}
                    {searchFilter === 'dairy' && dairyArr.map(item =>
                        <PostCard post={item} />
                    )}
                    {searchFilter === 'vegetables' && vegetablesArr.map(item =>
                        <PostCard  post={item} />
                    )}
                    {searchFilter === 'fruits' && fruitsArr.map(item =>
                        <PostCard post={item} />
                    )}
                    {searchFilter === 'grains' && grainsArr.map(item =>
                        <PostCard post={item} />
                    )}
                    {searchFilter === 'protein' && proteinArr.map(item =>
                        <PostCard post={item} />
                    )}
                    {searchFilter === 'both' &&
                        <>
                            {orgResultsArr.map(org =>
                                <OrganizationCard organization={org} />
                            )}
                            {postsResultsArr.map(post =>
                                <PostCard post={post} />
                            )}
                        </>
                    }
                    {searchFilter === 'organization-search' && orgResultsArr.map(org =>
                        <OrganizationCard organization={org} />
                    )}
                    {searchFilter === 'posts-search' && postsResultsArr.map(post =>
                        <PostCard post={post} />
                    )}
                    {searchFilter === 'none' &&
                        <SearchTitle theme={theme}>We couldn't find any search results.</SearchTitle>
                    }
                </SearchFeed>
            </SearchSection>
        </PageBackGround>
    )
};

// /<SideBarContainer height={sessionUser ? '870px' : '745px'}>
// <FilterTitle theme={theme}>Filter</FilterTitle>
// {sessionUser && (
//     <FavoritesFilter theme={theme}/>
// )}
// <AvailabilityFilter theme={theme}/>
// <PostTypeFilter theme={theme} />
// <CategoryFilter theme={theme} categories={categories} />
// {/* <BusinessFilter theme={theme} businesses={threeBusinesses} />
// <NonprofitFilter theme={theme} nonprofits={threeNonprofits} /> */}
// </SideBarContainer>
