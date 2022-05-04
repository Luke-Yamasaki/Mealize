import {
    ExpBanner,
    BannerTextContainer,
    BannerText
} from "../../../Styled/Light/ItemCard";

import { Flag } from '../../../../Assets/Icons/Flag';


export const ExpirationBanner = ({ post }) => {
    const compareDate = (expDate) => {
        const colorArr = [];
        const today = new Date();
        const daysLeft = expDate - today;

        daysLeft >= 7 ?
        colorArr.push('green')
        :
        daysLeft < 7 && daysLeft >= 3 ?
        colorArr.push('yellow')
        :
        colorArr.push('red')

        return colorArr[0];
    }

    return (
        <ExpBanner>
            <Flag color={compareDate(post.expDate)} />
            <BannerTextContainer>
                <BannerText>Expires:</BannerText>
                <BannerText>{post.expDate}</BannerText>
            </BannerTextContainer>
        </ExpBanner>
    )
};
