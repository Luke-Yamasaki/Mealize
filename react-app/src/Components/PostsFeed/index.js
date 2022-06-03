//Hooks
import { useSelector } from "react-redux";
import { useTheme } from "../../Context/ThemeContext";
import { useFilter } from "../../Context/FilterContext";
//Components
import { PostCard } from "../Cards/PostCard";
import { FeedContainer, MealizeItalic, NoFavoritesBox, NoFavoritesMessage, ExampleImages } from "../Styled/Layout"

//Helper
import { determineExpiration } from "../../utils/Dates";

//Images
import favoritesPic from './Images/favorites.png';

export const PostsFeed = () => {
    const allPosts = useSelector(state => state.posts.all);
    const favoritesObj = useSelector(state => state.session.user?.favorites);
    const {filter} = useFilter();
    const {theme} = useTheme();
    const favorites = favoritesObj ? Object.values(favoritesObj) : [];
    const posts = Object.values(allPosts);

    const availableArr = [];
    const unavailableArr = [];
    const itemsArr = [];
    const requestsArr = [];
    const dairyArr = [];
    const vegetablesArr = [];
    const fruitsArr = [];
    const grainsArr = [];
    const proteinArr = [];

    //Availability filter
    posts.map(post => {
        const hoursLeft = determineExpiration(post.expDate);
        post.status === 0 ? availableArr.push(post) : unavailableArr.push(post)
        return hoursLeft
    })
    //Posts filter
    posts.map(post => post.isItem ? itemsArr.push(post) : requestsArr.push(post));
    //CategoriesFilter
    posts.map(post => parseInt(post.categoryId) === 1 ? dairyArr.push(post) : parseInt(post.categoryId) === 2 ? vegetablesArr.push(post) : parseInt(post.categoryId) === 3 ? fruitsArr.push(post) : parseInt(post.categoryId) === 4 ? grainsArr.push(post) : proteinArr.push(post));

    return (
        <FeedContainer>
            {(filter === 'favorites' && !favorites.length) &&
            <>
                <NoFavoritesBox>
                    <NoFavoritesMessage theme={theme}>You do not have any favorites. Add them by clicking the <MealizeItalic theme={theme}>Mealize</MealizeItalic> logo on item and request cards!</NoFavoritesMessage>
                </NoFavoritesBox>
                <ExampleImages src={favoritesPic} alt='example' />
            </>
            }
            {(filter === 'favorites' && favorites.length > 0) && favorites.map((obj) => <PostCard key={obj.id} post={allPosts[obj.postId]}/>)}
            {filter === 'available' && availableArr.reverse().map((post) => <PostCard key={post.id} post={post} />)}
            {filter === 'unavailable' && unavailableArr.map((post) => <PostCard key={post.id} post={post} />)}
            {filter === 'items' && itemsArr.reverse().map((post) => <PostCard key={post.id} post={post} />)}
            {filter === 'requests' && requestsArr.reverse().map((post) => <PostCard key={post.id} post={post} />)}
            {filter === 'dairy' && dairyArr.map((post) => <PostCard key={post.id} post={post} />)}
            {filter === 'vegetables' && vegetablesArr.map((post) => <PostCard key={post.id} post={post} />)}
            {filter === 'fruits' && fruitsArr.map((post) => <PostCard key={post.id} post={post} />)}
            {filter === 'grains' && grainsArr.map((post) => <PostCard key={post.id} post={post} />)}
            {filter === 'protein' && proteinArr.map((post) => <PostCard key={post.id} post={post} />)}
        </FeedContainer>
    )
}
