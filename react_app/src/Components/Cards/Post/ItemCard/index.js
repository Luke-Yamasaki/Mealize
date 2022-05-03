//Hooks
import { useHistory } from "react-router-dom";

//Components
import { CardContainer } from '../../../Styled/Light/ItemCard';
import { ExpirationBanner } from "../ExpirationBanner";
import { CardContent } from "../CardContent";

export const ItemCard = ({ props }) => {
    const history = useHistory();

    const handleClick = () => {
        return history.push(`/items/${props.id}`)
    }

    return (
        <CardContainer onClick={handleClick}>
            <ExpirationBanner props={props}/>
            <CardContent props={props} />
        </CardContainer>
    )
};
