//Hooks
import { useState, useEffect } from "react";
import { useTheme } from "../../../../Context/ThemeContext";

//Styled-components
import { VectorBox } from "../../../Styled/Layout";
import { ExpBanner, BannerTextContainer, BannerText, ExpText } from "../../../Styled/ItemCard";

//Icons
import { Flag } from '../../../../Assets/Icons/Flag';

//Helper
import { determineExpiration } from "../../../../utils/Dates";

export const ExpirationBanner = ({ post }) => {
    const [flagColor, setFlagColor] = useState('');
    const [date, setDate] = useState('');
    const {theme} = useTheme();

    const formatDateString = (someDate) => {
        // Only accepts strings
        const day = someDate.slice(5, 7);
        const month = someDate.slice(8, 11);
        const year = someDate.slice(12, 16);
        const formattedDate = month + '/' + day + '/' + year;
        setDate(formattedDate)
    };

    useEffect(() => {
        const hoursLeft = determineExpiration(post.expDate);
        hoursLeft >= 168 ? setFlagColor('green') //Greater than or equal to one week?
        :
        hoursLeft < 168 && hoursLeft >= 72 ? setFlagColor('yellow') //In between a week and 3 days
        :
        setFlagColor('red') //less than 3 days

        formatDateString(post.expDate);
    }, []);

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
