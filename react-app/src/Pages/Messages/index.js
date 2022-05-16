//Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { OrganizationCard } from "../../Components/Cards/OrganizationCard";
import { PostCard } from "../../Components/Cards/PostCard";
import { PageBackGround, PostsSection, SideBarContainer } from "../../Components/Styled/Layout"
import { getMessages } from "../../store/messages";

export const MessagesPage = () => {
    const messages = useSelector(state => state.messages);
    const posts = useSelector(state => state.posts.all);
    const organizations = useSelector(state => state.organizations)
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        dispatch(getMessages());
        setLoaded(true);
    },[dispatch])

    return loaded && (
        <PageBackGround>
            <SideBarContainer></SideBarContainer>
            <PostsSection>
                {
                    Object.values(messages).map(message =>
                    <div id={message.id}>
                        <PostCard post={posts[message.postId]} />
                    </div>)
                }
            </PostsSection>
        </PageBackGround>
    )
}
