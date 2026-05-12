//Hooks
import { useState, useEffect } from "react";
import { useTheme } from "../../../../Context/ThemeContext";

//Styled-components
import { ExpBanner, BannerTextContainer, BannerText, ExpText, FlagBox, PostFlag, FlagPole } from "../../../Styled/PostCard";

//Helper
import { determineExpiration } from "../../../../utils/Dates";

const monthNames = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
};

export const PreviewExpirationBanner = ({ props }) => {
    const [flagColor, setFlagColor] = useState('');
    const [date, setDate] = useState('');
    const {theme} = useTheme();

    const formatDateString = (someDate) => {
        // Only accepts strings
        const year = someDate.slice(0, 4);
        const month = monthNames[someDate.slice(5, 7)];
        const day = someDate.slice(8, 10);
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
            <FlagBox>
                <PostFlag gradient={flagColor === 'green' ? 'linear-gradient(#46a843, #a4dba3)' : flagColor === 'yellow' ? 'linear-gradient(#d49524, #e9c990) ' : 'linear-gradient(#c2462a, #e0a193)'}/>
                <FlagPole gradient={flagColor === 'green' ? 'linear-gradient(#46a843, #a4dba3)' : flagColor === 'yellow' ? 'linear-gradient(#d49524, #e9c990) ' : 'linear-gradient(#c2462a, #e0a193)'}/>
            </FlagBox>
            <BannerTextContainer>
                <BannerText theme={theme}>Expires:</BannerText>
                <ExpText theme={theme}>{date}</ExpText>
            </BannerTextContainer>
        </ExpBanner>
    )
};
