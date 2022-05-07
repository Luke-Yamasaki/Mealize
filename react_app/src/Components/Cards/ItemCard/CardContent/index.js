//Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../../../Context/ThemeContext';
import { useHistory } from 'react-router-dom';
//Styling
import { category } from './category.js';

//Actions
import { setCurrentModal, showModal } from '../../../../store/modal';

//Components
import { DeliveryForm } from '../../../../Forms/Delivery';
import { LocationPin } from '../../../../Assets/Icons/Location';
import { FavoritesIcon } from '../../../../Assets/Logo/FavoritesIcon';
import { QuestionBtn, RequestBtn } from '../../../Styled/Buttons';
import { IconBox } from '../../../Styled/Layout';
import {
    Card,
    TitleBox,
    TitleTextContainer,
    CompanyLogo,
    CompanyName,
    PinContainer,
    CompanyAddress,
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
} from "../../../Styled/ItemCard";

export const CardContent = ({ post }) => {
    const dispatch = useDispatch();
    const { theme } = useTheme();
    const history = useHistory();
    const organizations = useSelector(state => state.organizations);
    const businesses = organizations.businesses;
    const nonprofits = organizations.nonprofits;
    const organization = post.isItem ? businesses[post.organizationId] : nonprofits[post.organizationId];

    const styleObj = category[theme][post.categoryId];

    const handleQuestion = () => {
        dispatch(setCurrentModal(() => <DeliveryForm post={post}/>));
        dispatch(showModal());
    };

    const handleRequest = () => {
        dispatch(setCurrentModal(() => <DeliveryForm post={post}/>));
        dispatch(showModal());
    };

    const formatAddress = () => {
        const address = `${organization.street}, ${organization.city}, ${organization.state.slice(0, 2).toUpperCase()} ${organization.zip}`;
        return address;
    };

    const handleClick = () => {
        return history.push(`/items/${post.id}`)
    };

    if(organization === undefined) {
        return null
    } else {
        return (
            <Card color={styleObj}>
                <TitleBox to={`/organizations/${organization.id}`}>
                    <IconBox >
                        <CompanyLogo src={organization.logoUrl} alt='Business logo.' width='30px' height='30px' backgroundColor='black'/>
                    </IconBox>
                    <TitleTextContainer>
                        <CompanyName>{organization.name}</CompanyName>
                        {/* <PinContainer width='15px' height='15px'>
                            <LocationPin color='black'/>
                        </PinContainer>
                        <CompanyAddress>{formatAddress()}</CompanyAddress> */}
                    </TitleTextContainer>
                </TitleBox>
                <ItemImage src={post.imageUrl} alt='Food available for pick up.' onClick={handleClick}/>
                <InfoBox>
                    <InfoContainer>
                        <ItemTitle theme={theme}>{post?.title}</ItemTitle>
                        <ItemQuantity theme={theme}>({post?.quantity})</ItemQuantity>
                    </InfoContainer>
                    <IconBox>
                        <FavoritesIcon post={post} />
                    </IconBox>
                </InfoBox>
                <DescriptionBox>
                    <DescriptionText theme={theme}>{post.description}</DescriptionText>
                </DescriptionBox>
                <ButtonBox>
                    <QuestionBtn theme={theme} onClick={handleQuestion}>
                        <QuestionText theme={theme}>Ask a question</QuestionText>
                    </QuestionBtn>
                    <RequestBtn onClick={handleRequest}>
                        <ButtonText>Send a request</ButtonText>
                    </RequestBtn>
                </ButtonBox>
            </Card>
        )
    }
};
