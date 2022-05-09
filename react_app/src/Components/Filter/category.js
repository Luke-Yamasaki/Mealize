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

export const CategoryFilter = ({categories, theme}) => {
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
            {categories.map((category, idx) => (
                <SideBarInfoBox key={idx} theme={theme} onClick={handleCategory(category.category)}>
                    <VectorBox resize='32px'>
                        {category.category === 'Dairy' ?
                            <DairyIcon />
                        : category.category === 'Vegetables' ?
                            <VegetablesIcon />
                        : category.category === 'Fruits' ?
                            <FruitsIcon />
                        : category.category === 'Grains' ?
                            <GrainsIcon />
                        : <ProteinIcon />
                        }
                    </VectorBox>
                    <SideBarInfoText theme={theme}>{category.category}</SideBarInfoText>
                </SideBarInfoBox>
            ))}
        </SideField>
    )
};
