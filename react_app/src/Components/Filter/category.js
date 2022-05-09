//Hooks
import { useFilter } from "../../Context/FilterContext";
import { useEffect } from "react";
//Styled-components
import { SideField, SideLegend, SideBarInfoBox, SideBarInfoText, VectorBox } from "../Styled/Layout";

//Icons
import { DairyIcon } from "../../Assets/Icons/FoodGroups/Dairy";
import { VegetablesIcon } from "../../Assets/Icons/FoodGroups/Vegetables";
import { FruitsIcon } from "../../Assets/Icons/FoodGroups/Fruits";
import { GrainsIcon } from "../../Assets/Icons/FoodGroups/Grains";
import { ProteinIcon } from "../../Assets/Icons/FoodGroups/Protein";

export const CategoryFilter = ({category, theme}) => {
    const {filter, setFilter} = useFilter();

    const handleCategory = (category) => {
        const name = category.toLowerCase();
        setFilter(name);
    };

    useEffect(() => {
        console.log(filter)
    },[filter])


    return (
        <SideField theme={theme}>
            <SideLegend theme={theme}>Categories</SideLegend>
            <SideBarInfoBox theme={theme} onClick={handleCategory(category)}>
                <VectorBox resize='32px'>
                    {category === 'Dairy' ?
                        <DairyIcon />
                    : category === 'Vegetables' ?
                        <VegetablesIcon />
                    : category === 'Fruits' ?
                        <FruitsIcon />
                    : category === 'Grains' ?
                        <GrainsIcon />
                    : <ProteinIcon />
                    }
                </VectorBox>
                <SideBarInfoText theme={theme}>{category}</SideBarInfoText>
            </SideBarInfoBox>
        </SideField>
    )
};
