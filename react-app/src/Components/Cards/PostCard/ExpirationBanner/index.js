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

    const handleColor = () => {
        let hoursLeft = determineExpiration(post.expDate);
        if(hoursLeft < 72) {
            setFlagColor('red')
        } else if(hoursLeft > 168) {
            setFlagColor('green')
        } else {
            setFlagColor('yellow')
        }
    };

    useEffect(() => {
        formatDateString(post.expDate);
        handleColor()
    },[post]);

    return (
        <ExpBanner>
            <VectorBox square='25px'>
                <Flag flagColor={flagColor} />
            </VectorBox>
            <BannerTextContainer>
                <BannerText theme={theme}>Expires:</BannerText>
                <ExpText theme={theme}>{date}</ExpText>
            </BannerTextContainer>
        </ExpBanner>
    )
};
