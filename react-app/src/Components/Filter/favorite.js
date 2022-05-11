//Hooks
import { useFilter } from "../../Context/FilterContext";
//Styled-components
import { SideField, SideLegend, SideBarInfoBox, SideBarInfoText } from "../Styled/Layout";
import { VectorBox } from "../Styled/Layout";

//Icons
import { FavoritesFilterIcon } from "../../Assets/Icons/FavoritesFilterIcon";

export const FavoritesFilter = ({theme}) => {
    const {filter, setFilter} = useFilter();

    const handleFavorites = (e) => {
        e.preventDefault();
        setFilter('favorites');
    };

    return (
        <SideField theme={theme}>
            <SideLegend theme={theme}>Favorites</SideLegend>
            <SideBarInfoBox onClick={handleFavorites}>
                <VectorBox resize='32px'>
                    <FavoritesFilterIcon theme={theme}/>
                </VectorBox>
                <SideBarInfoText theme={theme}>My favorites</SideBarInfoText>
            </SideBarInfoBox>
        </SideField>
    )
};
