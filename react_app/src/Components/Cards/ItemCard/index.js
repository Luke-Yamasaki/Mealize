//Hooks
import { useHistory } from "react-router-dom";

//Components
import { CardContainer } from '../../Styled/ItemCard';
import { ExpirationBanner } from './ExpirationBanner';
import { CardContent } from "./CardContent";

export const ItemCard = ({ post }) => {
    const history = useHistory();

    const handleClick = () => {
        return history.push(`/items/${post.id}`)
    }

    return (
        <CardContainer onClick={handleClick}>
            <ExpirationBanner post={post}/>
            <CardContent post={post} />
        </CardContainer>
    )
};
