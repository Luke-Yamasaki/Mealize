//Hooks
import { useFilter } from "../../Context/FilterContext";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
//Styled-components
import { SideField, SideLegend, SideBarInfoBox, SideBarInfoText } from "../Styled/Layout";
import { ImageBox } from "../Styled/Layout";

export const BusinessFilter = ({theme, businesses}) => {
    const {filter, setFilter} = useFilter();
    const history = useHistory();

    const handleBusiness = (id) => {
        setFilter(id);
    };

    const redirectToBusinesses = (e) => {
        e.preventDefault();
        return history.push('/businesses');
    }

    useEffect(() => {
        console.log(filter)
    },[filter])

    return (
        <SideField theme={theme}>
            <SideLegend theme={theme}>Businesses</SideLegend>
            {businesses.map((business, idx) => (
                <SideBarInfoBox key={idx} onClick={handleBusiness(business.id)} >
                    <ImageBox src={business.logoUrl} alt='Business logo' />
                    <SideBarInfoText theme={theme}>{business.name}</SideBarInfoText>
                </SideBarInfoBox>
            ))}
            <SideBarInfoText onClick={redirectToBusinesses}>View all</SideBarInfoText>
        </SideField>
    )
};
