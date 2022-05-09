//Hooks
import { useSelector } from "react-redux";
import { useEffect } from "react";

//Components
import { ItemCard } from "../Cards/ItemCard";
import { FeedContainer } from "../Styled/Layout"

//Helper
import { determineExpiration } from "../../utils/Expiration";

export const PostsFeed = ({filter, sessionUser}) => {
    const allPosts = useSelector(state => state.posts.all);
    const posts = Object.values(allPosts);
    const favoritesArr = [];
    const availableArr = [];
    const unavailableArr = [];
    const itemsArr = [];
    const requestsArr = [];
    const dairyArr = [];
    const vegetablesArr = [];
    const fruitsArr = [];
    const grainsArr = [];
    const proteinArr = [];

    //Favorites filter
    if(sessionUser) {
        Object.values(sessionUser.favorites).map(fav => favoritesArr.push(posts[fav.postId]));
    };

    //Availability filter
    posts.map(post => {
        const hoursLeft = determineExpiration(post.expDate);
        post.status === 0 && hoursLeft > 1 ? availableArr.push(post) : unavailableArr.push(post)
    })
    //Posts filter
    posts.map(post => post.isItem ? itemsArr.push(post) : requestsArr.push(post));
    //CategoriesFilter
    posts.map(post => parseInt(post.categoryId) === 1 ? dairyArr.push(post) : parseInt(post.categoryId) === 2 ? vegetablesArr.push(post) : parseInt(post.categoryId) === 3 ? fruitsArr.push(post) : parseInt(post.categoryId) === 4 ? grainsArr.push(post) : proteinArr.push(post))

    return (
        <FeedContainer>
            {(sessionUser && filter === 'favorites') && favoritesArr.map((post, idx) => <ItemCard key={idx} post={post} />)}
            {filter === 'available' && availableArr.map((post, idx) => <ItemCard key={idx} post={post} />)}
            {filter === 'unavailable' && unavailableArr.map((post, idx) => <ItemCard key={idx} post={post} />)}
            {filter === 'items' && itemsArr.map((post, idx) => <ItemCard key={idx} post={post} />)}
            {filter === 'requests' && requestsArr.map((post, idx) => <ItemCard key={idx} post={post} />)}
            {filter === 'dairy' && dairyArr.map((post, idx) => <ItemCard key={idx} post={post} />)}
            {filter === 'vegetables' && vegetablesArr.map((post, idx) => <ItemCard key={idx} post={post} />)}
            {filter === 'fruits' && fruitsArr.map((post, idx) => <ItemCard key={idx} post={post} />)}
            {filter === 'grains' && grainsArr.map((post, idx) => <ItemCard key={idx} post={post} />)}
            {filter === 'protein' && proteinArr.map((post, idx) => <ItemCard key={idx} post={post} />)}
            {filter === 'favorites' && favoritesArr.map((post, idx) => <ItemCard key={idx} post={post} />)}
        </FeedContainer>
    )
}
