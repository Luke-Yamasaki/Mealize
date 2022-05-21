//Hooks
import { useSelector } from 'react-redux';
//Components
import { CardContainer } from '../../Styled/PostCard';
import { ExpirationBanner } from './ExpirationBanner';
import { CardContent } from "./CardContent";

export const PostCard = ({ post, preview }) => {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <CardContainer  status={post.status > 0} height={(!sessionUser || (post?.status > 0 && post.userId !== sessionUser.id)) ? '410px' : '450px'}>
            <ExpirationBanner post={post}/>
            <CardContent post={post} preview={preview ? 'true' : 'false'}/>
        </CardContainer>
    )
};
