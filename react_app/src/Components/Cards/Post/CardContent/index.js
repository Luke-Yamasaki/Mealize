//Hooks
import { useTheme } from '../../../../Context/ThemeContext';
import { useSelector } from 'react-redux';
import { category } from './category.js';
//Components
import { LocationPin } from '../../../../Assets/Icons/Location';
import { FavoritesIcon } from '../../../../Assets/Logo/FavoritesIcon';
import { QuestionBtn, RequestBtn } from '../../../Styled/Buttons';
import {
    Card,
    TitleBox,
    TitleTextContainer,
    CompanyLogo,
    CompanyName,
    CompanyAddress,
    ItemImage,
    InfoBox,
    InfoContainer,
    ItemTitle,
    ItemQuantity,
    DescriptionBox,
    DescriptionTextContainer,
    DescriptionText,
    ButtonBox,
    ButtonText
} from "../../Styled/Light/ItemCard";

export const CardContent = ({ props }) => {
    const { theme } = useTheme();
    const organization = useSelector(state => state.organizations[props.organizationId]);

    const styleObj = category[theme][props.categoryId];
    const address =  `${organization.street}, ${organization.city}, ${organization.state.slice[0, 2].toUpperCase()} ${organization.zip}`;


    return (
        <Card color={styleObj}>
            <TitleBox>
                <CompanyLogo src='props.imageUrl' />
                <TitleTextContainer>
                    <CompanyName>{organization.name}</CompanyName>
                    <LocationPin color={'black'}/>
                    <CompanyAddress>{address}</CompanyAddress>
                </TitleTextContainer>
            </TitleBox>
            <ItemImage src={props.imageUrl} />
            <InfoBox>
                <InfoContainer>
                    <ItemTitle color={theme === 'light' ? 'black' : 'white'}>{props.title}</ItemTitle>
                    <ItemQuantity color={theme === 'light' ? 'black' : 'white'}>{props.quantity}</ItemQuantity>
                </InfoContainer>
                <FavoritesIcon post={props} />
            </InfoBox>
            <DescriptionBox>
                <DescriptionTextContainer>
                    <DescriptionText>{props.description}</DescriptionText>
                </DescriptionTextContainer>
            </DescriptionBox>
            <ButtonBox>
                <QuestionBtn>
                    <ButtonText>Ask a question</ButtonText>
                </QuestionBtn>
                <RequestBtn>
                    <ButtonText>Send a request</ButtonText>
                </RequestBtn>
            </ButtonBox>
        </Card>
    )
}
