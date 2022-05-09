//Hooks
import { useFilter } from "../../Context/FilterContext";
//Styled-components
import { SideField, SideLegend, SideBarInfoBox, SideBarInfoText } from "../Styled/Layout";
import { VectorBox } from "../Styled/Layout";

//Icons
import { Business } from "../../Assets/Icons/Business";
import { Nonprofit } from "../../Assets/Icons/Nonprofit";

export const PostTypeFilter = ({theme}) => {
    const {filter, setFilter} = useFilter();

    const handleRequests = (e) => {
        e.preventDefault();
        setFilter('requests')
    }

    const handleItems = (e) => {
        e.preventDefault();
        setFilter('items')
    }

    return (
        <SideField theme={theme}>
            <SideLegend theme={theme}>Post type</SideLegend>
            <SideBarInfoBox onClick={handleRequests}>
                <VectorBox resize='32px'>
                    <Business />
                </VectorBox>
                <SideBarInfoText theme={theme}>Requests</SideBarInfoText>
            </SideBarInfoBox>
            <SideBarInfoBox onClick={handleItems}>
                <VectorBox resize='32px'>
                    <Nonprofit />
                </VectorBox>
                <SideBarInfoText theme={theme}>Items</SideBarInfoText>
            </SideBarInfoBox>
        </SideField>
    )
};
