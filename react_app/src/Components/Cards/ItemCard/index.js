//Components
import { CardContainer } from '../../Styled/ItemCard';
import { ExpirationBanner } from './ExpirationBanner';
import { CardContent } from "./CardContent";

export const ItemCard = ({ post }) => {
    return (
        <CardContainer>
            <ExpirationBanner post={post}/>
            <CardContent post={post} />
        </CardContainer>
    )
};
