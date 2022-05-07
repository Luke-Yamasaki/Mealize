//Hooks
import { useSelector } from 'react-redux';
//Components
import { CardContainer } from '../../Styled/ItemCard';
import { ExpirationBanner } from './ExpirationBanner';
import { CardContent } from "./CardContent";

export const ItemCard = ({ post }) => {
    const sessionUser = useSelector(state => state.session.user);
    return (
        <CardContainer height={sessionUser ? '450px' : '410px'}>
            <ExpirationBanner post={post}/>
            <CardContent post={post} />
        </CardContainer>
    )
};
