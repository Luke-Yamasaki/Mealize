//Hooks
import { useSelector } from 'react-redux';
//Components
import { CardContainer } from '../../Styled/PostCard';
import { ExpirationBanner } from './ExpirationBanner';
import { CardContent } from "./CardContent";

export const PostCard = ({ post }) => {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <CardContainer height={(!sessionUser || post?.status > 0) ? '410px' : '450px'}>
            <ExpirationBanner post={post}/>
            <CardContent post={post} />
        </CardContainer>
    )
};
