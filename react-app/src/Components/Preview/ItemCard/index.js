//Hooks
import { useSelector } from 'react-redux';
//Components
import { CardContainer } from '../../Styled/ItemCard';
import { PreviewExpirationBanner } from './ExpirationBanner';
import { PreviewCardContent } from "./CardContent";

export const PreviewItemCard = ({ props }) => {
    const sessionUser = useSelector(state => state.session.user);
    console.log(props)
    return (
        <CardContainer height={sessionUser ? '450px' : '410px'}>
            <PreviewExpirationBanner props={props}/>
            <PreviewCardContent props={props} />
        </CardContainer>
    )
};
