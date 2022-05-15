//Hooks
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '../../../../Context/ThemeContext';

//Styling for card colors
import { previewCategory } from './category.js';

//Components
import { PreviewFavoritesIcon } from '../PreviewFavoritesIcon';
import { QuestionBtn, RequestBtn } from '../../../Styled/Buttons';
import { VectorBox } from '../../../Styled/Layout';
import five from '../../../../Assets/Images/Pattern_5.png'
import ten from '../../../../Assets/Images/Pattern_10.png'

import {
    Card,
    PreviewTitleBox,
    TitleTextContainer,
    CompanyLogo,
    CompanyName,
    ItemDateText,
    ItemImage,
    InfoBox,
    InfoContainer,
    ItemTitle,
    ItemQuantity,
    DescriptionBox,
    DescriptionText,
    ButtonBox,
    ButtonText,
    QuestionText
} from "../../../Styled/PostCard";

//Helper function

export const PreviewCardContent = ({ props }) => {
    const { theme } = useTheme();
    const sessionUser = useSelector(state => state.session.user);
    const nonprofits = useSelector(state => state.organizations.nonprofits);
    const businesses = useSelector(state => state.organizations.businesses);
    const [styleObj, setStyleObj] = useState(previewCategory[theme][6]);
    const organization = sessionUser.isNonprofit ? nonprofits[sessionUser.organizationId] : businesses[sessionUser.organizationId];

    useEffect(() => {
        if(props.categoryId) {
            setStyleObj(previewCategory[theme][props.categoryId]);
        }
    },[props.categoryId])

    return (
        <Card color={styleObj} height='390px'>
            <PreviewTitleBox>
                <VectorBox square='30px' resize='32px'>
                    <CompanyLogo src={organization.logoUrl} alt='Business logo.' width='30px' height='30px' backgroundColor='#191919'/>
                </VectorBox>
                <TitleTextContainer>
                    <CompanyName>{organization.name}</CompanyName>
                </TitleTextContainer>
                <ItemDateText theme={theme}>now</ItemDateText>
            </PreviewTitleBox>
            {sessionUser.isNonprofit && <ItemImage src={ten} alt='Food available for pick up.'/>}
            {!sessionUser.isNonprofit && <ItemImage src={props.previewImage ? props.previewImage : props.image ? URL.createObjectURL(props.image) : 'https://mealizeaa.s3.amazonaws.com/Mealize-circle.png'} alt='Food available for pick up.'/>}
            <InfoBox>
                <InfoContainer>
                    <ItemTitle theme={theme}>{props.title ? props.title : 'Item title goes here'}</ItemTitle>
                    <ItemQuantity theme={theme}>({props.number ? props.number + ' ' + props.unit : 'quantity info'})</ItemQuantity>
                </InfoContainer>
                <VectorBox square='30px' opacity='50%'>
                    <PreviewFavoritesIcon/>
                </VectorBox>
            </InfoBox>
            <DescriptionBox>
                <DescriptionText theme={theme}>{props.description ? props.description : 'Your item description goes here.'}</DescriptionText>
            </DescriptionBox>
            <ButtonBox>
                <QuestionBtn theme={theme}>
                    <QuestionText theme={theme}>Ask a question</QuestionText>
                </QuestionBtn>
                <RequestBtn>
                    <ButtonText>Send a request</ButtonText>
                </RequestBtn>
            </ButtonBox>
        </Card>
    )
};
