//Hooks
import { useSelector } from 'react-redux';
//Components
import { CardContainer } from '../../Styled/ItemCard';
import { ExpirationBanner } from './ExpirationBanner';
import { CardContent } from "./CardContent";

export const ItemCard = ({ props }) => {
    const sessionUser = useSelector(state => state.session.user);
    console.log(props)
    return (
        <CardContainer height={sessionUser ? '450px' : '410px'}>
            <ExpirationBanner post={props}/>
            <CardContent post={props} />
        </CardContainer>
    )
};
