//Hooks
import { useFilter } from "../../Context/FilterContext";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
//Styled-components
import { SideField, SideLegend, SideBarInfoBox, SideBarInfoText } from "../Styled/Layout";
import { ImageBox } from "../Styled/Layout";

export const NonprofitFilter = ({theme, nonprofits}) => {
    const {filter, setFilter} = useFilter();
    const history = useHistory();

    const handleNonprofit = (id) => {
        setFilter(id);
    };

    const redirectToNonprofits = (e) => {
        e.preventDefault();
        return history.push('/nonprofits')
    }

    useEffect(() => {
        console.log(filter)
    },[filter])


    return (
        <SideField theme={theme}>
            <SideLegend theme={theme}>Nonprofits</SideLegend>
            {nonprofits.map((nonprofit, idx) => (
                <SideBarInfoBox key={idx} onClick={handleNonprofit(nonprofit.id)}>
                    <ImageBox src={nonprofit.logoUrl} alt='nonprofit logo' />
                    <SideBarInfoText theme={theme}>{nonprofit.name}</SideBarInfoText>
                </SideBarInfoBox>
            ))}
            <SideBarInfoText onClick={redirectToNonprofits}>View all</SideBarInfoText>
        </SideField>
    )
};
