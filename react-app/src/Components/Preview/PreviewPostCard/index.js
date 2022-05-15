//Hooks
import { useSelector } from 'react-redux';
//Components
import { CardContainer } from '../../Styled/PostCard';
import { PreviewExpirationBanner } from './PreviewExpirationBanner';
import { PreviewCardContent } from "./PreviewCardContent";

export const PreviewPostCard = ({ props }) => {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <CardContainer height={sessionUser ? '450px' : '410px'}>
            <PreviewExpirationBanner props={props}/>
            <PreviewCardContent props={props} />
        </CardContainer>
    )
};
