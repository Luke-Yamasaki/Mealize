//Hooks
import { useState, useEffect } from "react";
import { useTheme } from "../../../../Context/ThemeContext";

//Styled-components
import { VectorBox } from "../../../Styled/Layout";
import {
    ExpBanner,
    BannerTextContainer,
    BannerText,
    ExpText
} from "../../../Styled/ItemCard";

//Icons
import { Flag } from '../../../../Assets/Icons/Flag';

//Helper
import { determineExpiration, formatDateString } from "../../../../utils/Date";

export const ExpirationBanner = ({ post }) => {
    const [flagColor, setFlagColor] = useState('');
    const [date, setDate] = useState('');
    const {theme} = useTheme();

    useEffect(() => {
        const dateString = formatDateString(post.expDate);
        setDate(dateString)

        const hoursLeft = determineExpiration(post.expDate);

        hoursLeft >= 168 ? setFlagColor('green') //Greater than or equal to one week?
        :
        hoursLeft < 168 && hoursLeft >= 72 ? setFlagColor('yellow') //In between a week and 3 days
        :
        setFlagColor('red') //less than 3 days
        return () => console.log('unmounting...')
    },[])

    return (
        <ExpBanner>
            <VectorBox square='25px'>
                <Flag color={flagColor} />
            </VectorBox>
            <BannerTextContainer>
                <BannerText theme={theme}>Expires:</BannerText>
                <ExpText theme={theme}>{date}</ExpText>
            </BannerTextContainer>
        </ExpBanner>
    )
};
