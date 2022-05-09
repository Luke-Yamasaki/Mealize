//Hooks
import { useFilter } from "../../Context/FilterContext";
import { useHistory } from "react-router-dom";
//Styled-components
import { SideField, SideLegend, SideBarInfoBox, SideBarViewAll, SideBarInfoText } from "../Styled/Layout";
import { ImageBox, VectorBox } from "../Styled/Layout";

export const BusinessFilter = ({theme, businesses}) => {
    const {filter, setFilter} = useFilter();
    const history = useHistory();
    const one = businesses[0];
    const two = businesses[1];
    const three = businesses[2];

    const handleBusinessOne = (e) => {
        e.preventDefault();
        setFilter(one.id);
    };

    const handleBusinessTwo = (e) => {
        e.preventDefault();
        setFilter(two.id);
    };

    const handleBusinessThree = (e) => {
        e.preventDefault();
        setFilter(three.id);
    };

    const redirectToBusinesses = (e) => {
        e.preventDefault();
        return history.push('/businesses');
    }

    return (
        <SideField theme={theme}>
            <SideLegend theme={theme}>Businesses</SideLegend>
            <SideBarInfoBox onClick={handleBusinessOne}>
                <ImageBox resize='32px' src={one.logoUrl} alt='Business logo' />
                <SideBarInfoText theme={theme}>{one.name}</SideBarInfoText>
            </SideBarInfoBox>
            <SideBarInfoBox onClick={handleBusinessTwo}>
                <ImageBox resize='32px' src={two.logoUrl} alt='Business logo' />
                <SideBarInfoText theme={theme}>{two.name}</SideBarInfoText>
            </SideBarInfoBox>
            <SideBarInfoBox onClick={handleBusinessThree}>
                <ImageBox resize='32px' src={three.logoUrl} alt='Business logo' />
                <SideBarInfoText theme={theme}>{three.name}</SideBarInfoText>
            </SideBarInfoBox>
            <SideBarViewAll onClick={handleBusinessThree}>
                <VectorBox />
                <SideBarInfoText theme={theme} onClick={redirectToBusinesses}>View all</SideBarInfoText>
            </SideBarViewAll>
        </SideField>
    )
};
