import { useFilter } from "../../Context/FilterContext";
//Styled-components
import { SideField, SideLegend, SideBarInfoBox, SideBarInfoText } from "../Styled/Layout";
import { VectorBox } from "../Styled/Layout";

//Icons
import { Business } from "../../Assets/Icons/Business";
import { Nonprofit } from "../../Assets/Icons/Nonprofit";

export const PostTypeFilter = ({theme}) => {
    const {setFilter} = useFilter();

    return (
        <SideField theme={theme}>
            <SideLegend theme={theme}>Post type</SideLegend>
            <SideBarInfoBox onClick={setFilter('requests')}>
                <VectorBox resize='32px'>
                    <Business />
                </VectorBox>
                <SideBarInfoText theme={theme}>Requests</SideBarInfoText>
            </SideBarInfoBox>
            <SideBarInfoBox onClick={setFilter('items')}>
                <VectorBox resize='32px'>
                    <Nonprofit />
                </VectorBox>
                <SideBarInfoText theme={theme}>Items</SideBarInfoText>
            </SideBarInfoBox>
        </SideField>
    )
};
