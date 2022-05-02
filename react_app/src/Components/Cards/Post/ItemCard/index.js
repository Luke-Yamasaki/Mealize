import {
    CardContainer,
    CompanyLogo,
    BannerTextContainer,
    BannerText,
    DairyCard,
    VegetablesCard,
    FruitsCard,
    GrainsCard,
    ProteinCard
} from "../../Styled/Light/ItemCard";

import { ExpirationBanner } from "../ExpirationBanner";
import { CardContent } from "../ItemContent";

export const ItemCard = ({ props }) => {
    return (
        <CardContainer>
            <ExpirationBanner props={props}/>
            <CardContent props={props} />
        </CardContainer>
    )
};
