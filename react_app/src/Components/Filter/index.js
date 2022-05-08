//Hooks
import { useTheme } from "../../Context/ThemeContext";

//Styled-components
import { SideBarInfoBox, SideBarInfoText, VectorBox } from "../Styled/Layout";

//Icons
import { DairyIcon } from "../../Assets/Icons/FoodGroups/Dairy";
import { VegetablesIcon } from "../../Assets/Icons/FoodGroups/Vegetables";
import { FruitsIcon } from "../../Assets/Icons/FoodGroups/Fruits";
import { GrainsIcon } from "../../Assets/Icons/FoodGroups/Grains";
import { ProteinIcon } from "../../Assets/Icons/FoodGroups/Protein";

export const CategoryBox = ({category}) => {
    const { theme } = useTheme();

    return (
        <SideBarInfoBox>
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
    )
};
