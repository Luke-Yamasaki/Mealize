//Hooks
import { useState, useEffect } from "react";
import { useTheme } from "../../../../Context/ThemeContext";

//Styled-components
import { ExpBanner, BannerTextContainer, BannerText, ExpText, FlagBox, PostFlag, FlagPole } from "../../../Styled/PostCard";

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
        let hoursLeft = determineExpiration(post?.expDate);
        if(hoursLeft < 72) {
            setFlagColor('red')
        } else if(hoursLeft > 168) {
            setFlagColor('green')
        } else {
            setFlagColor('yellow')
        }
    };

    useEffect(() => {
        if(post) {
            formatDateString(post?.expDate);
            handleColor()
        }
    },[post]);

    if(!post) {
        return null
    }

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
