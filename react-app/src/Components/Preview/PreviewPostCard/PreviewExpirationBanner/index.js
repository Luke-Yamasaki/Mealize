//Hooks
import { useState, useEffect } from "react";
import { useTheme } from "../../../../Context/ThemeContext";

//Styled-components
import { VectorBox } from "../../../Styled/Layout";
import { ExpBanner, BannerTextContainer, BannerText, ExpText } from "../../../Styled/PostCard";

//Icons
import { Flag } from '../../../../Assets/Icons/Flag';

//Helper
import { determineExpiration } from "../../../../utils/Dates";

export const PreviewExpirationBanner = ({ props }) => {
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
        if(props.expDate.length > 0) {
            const hoursLeft = determineExpiration(props.expDate);
            hoursLeft >= 168 ? setFlagColor('green') //Greater than or equal to one week?
            :
            hoursLeft < 168 && hoursLeft >= 72 ? setFlagColor('yellow') //In between a week and 3 days
            :
            setFlagColor('red') //less than 3 days

            formatDateString(props.expDate);
        } else {
            setFlagColor('green')
        }
    },[props.expDate]);

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