//Hooks
import { useFilter } from "../../Context/FilterContext";
import { useHistory } from "react-router-dom";
//Styled-components
import { SideField, SideLegend, SideBarInfoBox, SideBarViewAll, SideBarInfoText } from "../Styled/Layout";
import { ImageBox, VectorBox } from "../Styled/Layout";

export const NonprofitFilter = ({theme, nonprofits}) => {
    const {filter, setFilter} = useFilter();
    const history = useHistory();
    const one = nonprofits[0];
    const two = nonprofits[1];
    const three = nonprofits[2];

    const handleNonprofitOne = (e) => {
        e.preventDefault();
        setFilter(one.id);
    };

    const handleNonprofitTwo = (e) => {
        e.preventDefault();
        setFilter(two.id);
    };

    const handleNonprofitThree = (e) => {
        e.preventDefault();
        setFilter(three.id);
    };

    const redirectToNonprofits = (e) => {
        e.preventDefault();
        return history.push('/Nonprofits');
    }

    return (
        <SideField theme={theme}>
            <SideLegend theme={theme}>Nonprofits</SideLegend>
            <SideBarInfoBox onClick={handleNonprofitOne}>
                <ImageBox resize='32px' src={one.logoUrl} alt='Nonprofit logo' />
                <SideBarInfoText theme={theme}>{one.name}</SideBarInfoText>
            </SideBarInfoBox>
            <SideBarInfoBox onClick={handleNonprofitTwo}>
                <ImageBox resize='32px' src={two.logoUrl} alt='Nonprofit logo' />
                <SideBarInfoText theme={theme}>{two.name}</SideBarInfoText>
            </SideBarInfoBox>
            <SideBarInfoBox onClick={handleNonprofitThree}>
                <ImageBox resize='32px' src={three.logoUrl} alt='Nonprofit logo' />
                <SideBarInfoText theme={theme}>{three.name}</SideBarInfoText>
            </SideBarInfoBox>
            <SideBarViewAll onClick={handleNonprofitThree}>
                <VectorBox />
                <SideBarInfoText theme={theme} onClick={redirectToNonprofits}>View all</SideBarInfoText>
            </SideBarViewAll>
        </SideField>
    )
};
