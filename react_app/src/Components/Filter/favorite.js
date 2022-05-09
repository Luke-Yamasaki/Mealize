//Hooks
import { useFilter } from "../../Context/FilterContext";
import { useEffect } from "react";
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

    useEffect(() => {
        console.log(filter)
    },[filter])


    return (
        <SideField theme={theme}>
            <SideLegend theme={theme}>Favorites</SideLegend>
            <SideBarInfoBox onClick={handleFavorites}>
                <VectorBox resize='32px'>
                    <FavoritesFilterIcon theme={theme}/>
                </VectorBox>
                <SideBarInfoText>My favorites</SideBarInfoText>
            </SideBarInfoBox>
        </SideField>
    )
};
