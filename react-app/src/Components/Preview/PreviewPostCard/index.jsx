//Hooks
import { useSelector } from 'react-redux';
//Components
import { CardContainer } from '../../Styled/PostCard';
import { PreviewExpirationBanner } from './PreviewExpirationBanner';
import { PreviewCardContent } from "./PreviewCardContent";
import { PreviewMessageBox, PreviewMessageText, PreviewSmallText } from '../../Styled/PreviewSection';

export const PreviewPostCard = ({ props }) => {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <PreviewMessageBox>
            <PreviewMessageText>
                Here's a preview of your post!
            </PreviewMessageText>
            <PreviewSmallText>
                (Buttons are disabled)
            </PreviewSmallText>
            <CardContainer status='true' height={sessionUser ? '450px' : '410px'}>
                <PreviewExpirationBanner props={props}/>
                <PreviewCardContent props={props} />
            </CardContainer>
        </PreviewMessageBox>

    )
};
