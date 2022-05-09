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

export const CategoryFilter = ({theme}) => {
    const {filter, setFilter} = useFilter();

    const filterDairy = (e) => {
        e.preventDefault();
        setFilter('dairy')
    };
    const filterVegetables= (e) => {
        e.preventDefault();
        setFilter('vegetables')
    };
    const filterFruits = (e) => {
        e.preventDefault();
        setFilter('fruits')
    };
    const filterGrains = (e) => {
        e.preventDefault();
        setFilter('grains')
    };
    const filterProtein = (e) => {
        e.preventDefault();
        setFilter('protein')
    };

    useEffect(() => {
        console.log(filter)
    },[filter])


    return (
        <SideField theme={theme}>
            <SideLegend theme={theme}>Categories</SideLegend>
                <SideBarInfoBox theme={theme} onClick={filterDairy}>
                    <VectorBox resize='32px'>
                        <DairyIcon />
                    </VectorBox>
                    <SideBarInfoText theme={theme}>Dairy</SideBarInfoText>
                </SideBarInfoBox>
                <SideBarInfoBox theme={theme} onClick={filterVegetables}>
                    <VectorBox resize='32px'>
                        <VegetablesIcon />
                    </VectorBox>
                    <SideBarInfoText theme={theme}>Vegetables</SideBarInfoText>
                </SideBarInfoBox>
                <SideBarInfoBox theme={theme} onClick={filterFruits}>
                    <VectorBox resize='32px'>
                        <FruitsIcon />
                    </VectorBox>
                    <SideBarInfoText theme={theme}>Fruits</SideBarInfoText>
                </SideBarInfoBox>
                <SideBarInfoBox theme={theme} onClick={filterGrains}>
                    <VectorBox resize='32px'>
                        <GrainsIcon />
                    </VectorBox>
                    <SideBarInfoText theme={theme}>Grains</SideBarInfoText>
                </SideBarInfoBox>
                <SideBarInfoBox theme={theme} onClick={filterProtein}>
                    <VectorBox resize='32px'>
                        <ProteinIcon />
                    </VectorBox>
                    <SideBarInfoText theme={theme}>Protein</SideBarInfoText>
                </SideBarInfoBox>
        </SideField>
    )
};
