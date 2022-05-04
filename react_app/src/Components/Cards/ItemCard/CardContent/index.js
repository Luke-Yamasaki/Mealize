//Hooks
import { useDispatch } from 'react-redux';
import { useTheme } from '../../../../Context/ThemeContext';
import { useSelector } from 'react-redux';

//Styling
import { category } from './category.js';

//Actions
import { setCurrentModal, showModal } from '../../../../store/modal';

//Components
import { DeliveryForm } from '../../../../Forms/Delivery';
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
} from "../../../Styled/Light/ItemCard";

export const CardContent = ({ post }) => {
    const dispatch = useDispatch();
    const { theme } = useTheme();
    const organizations = useSelector(state => state.organizations);
    const businesses = organizations.businesses;
    const nonprofits = organizations.nonprofits;
    const organization = post.isItem ? businesses[post.organizationId] : nonprofits[post.organizationId];
    console.log(organization.logoUrl)
    const styleObj = category[theme][post.categoryId];

    const handleQuestion = () => {
        dispatch(setCurrentModal(() => <DeliveryForm post={post}/>));
        dispatch(showModal());
    };

    const handleRequest = () => {
        dispatch(setCurrentModal(() => <DeliveryForm post={post}/>));
        dispatch(showModal());
    };

    if(organization === undefined) {
        return null
    } else {
        return (
            <Card color={styleObj}>
                <TitleBox>
                    <CompanyLogo src={organization.logoUrl} alt='Business logo.' />
                    <TitleTextContainer>
                        <CompanyName>{organization.name}</CompanyName>
                        <LocationPin color={'black'}/>
                        <CompanyAddress>{`${organization.street}, ${organization.city}, ${organization.state.slice(0, 2).toUpperCase()} ${organization.zip}`}</CompanyAddress>
                    </TitleTextContainer>
                </TitleBox>
                <ItemImage src={post.imageUrl} alt='Food available for pick up.' />
                <InfoBox>
                    <InfoContainer>
                        <ItemTitle color={theme === 'light' ? 'black' : 'white'}>{post?.title}</ItemTitle>
                        <ItemQuantity color={theme === 'light' ? 'black' : 'white'}>{post?.quantity}</ItemQuantity>
                    </InfoContainer>
                    <FavoritesIcon post={post} />
                </InfoBox>
                <DescriptionBox>
                    <DescriptionTextContainer>
                        <DescriptionText>{post.description}</DescriptionText>
                    </DescriptionTextContainer>
                </DescriptionBox>
                <ButtonBox>
                    <QuestionBtn onClick={handleQuestion}>
                        <ButtonText>Ask a question</ButtonText>
                    </QuestionBtn>
                    <RequestBtn onClick={handleRequest}>
                        <ButtonText>Send a request</ButtonText>
                    </RequestBtn>
                </ButtonBox>
            </Card>
        )
    }
};
