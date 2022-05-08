//Hooks
import { useState, useEffect } from "react";
import { useTheme } from "../../../../Context/ThemeContext";
import { VectorBox } from "../../../Styled/Layout";
import {
    ExpBanner,
    BannerTextContainer,
    BannerText,
    ExpText
} from "../../../Styled/ItemCard";

import { Flag } from '../../../../Assets/Icons/Flag';

export const ExpirationBanner = ({ post }) => {
    const [flagColor, setFlagColor] = useState('');
    const [date, setDate] = useState('');
    const {theme} = useTheme();
    console.log(theme)
    const determineExpiration = (expDate) => {
        const today = new Date();
        const expiration = new Date(expDate)
        //milliseconds to minutes to hours
        const hoursLeft = Math.floor((expiration - today) / 1000 / 60 / 60);
        //Greater than or equal to one week?
        hoursLeft >= 168 ? setFlagColor('green')
        :
        //In between a week and 3 days
        hoursLeft < 168 && hoursLeft >= 72 ? setFlagColor('yellow')
        :
        //less than 3 days
        setFlagColor('red')
    };

    const formatDateString = (someDate) => {
        // Only accepts strings
        const day = someDate.slice(5, 7);
        const month = someDate.slice(8, 11);
        const year = someDate.slice(12, 16);
        const formattedDate = month + '/' + day + '/' + year;
        setDate(formattedDate)
    };

    useEffect(() => {
        determineExpiration(post.expDate);
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
