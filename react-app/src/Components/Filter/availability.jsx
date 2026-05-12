//Hooks
import { useFilter } from "../../Context/FilterContext";
//Styled-components
import { SideField, SideLegend, SideBarInfoBox, SideBarInfoText } from "../Styled/Layout";
import { VectorBox } from "../Styled/Layout";

//Icons
import { AvailableIcon, UnavailableIcon } from "../../Assets/Icons/Availability";

export const AvailabilityFilter = ({theme}) => {
    const {setFilter} = useFilter();

    const handleAvailable = (e) => {
        e.preventDefault();
        setFilter('available');
    };

    const handleUnavailable = (e) => {
        e.preventDefault();
        setFilter('unavailable');
    };

    return (
        <SideField theme={theme}>
            <SideLegend theme={theme}>Availability</SideLegend>
            <SideBarInfoBox onClick={handleAvailable}>
                <VectorBox resize='32px'>
                    <AvailableIcon theme={theme}/>
                </VectorBox>
                <SideBarInfoText theme={theme}>Available</SideBarInfoText>
            </SideBarInfoBox>
            <SideBarInfoBox onClick={handleUnavailable}>
                <VectorBox resize='32px'>
                    <UnavailableIcon theme={theme}/>
                </VectorBox>
                <SideBarInfoText theme={theme}>Unavailable</SideBarInfoText>
            </SideBarInfoBox>
        </SideField>
    )
};
