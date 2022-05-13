//Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../../../Context/ThemeContext';
import { useHistory } from 'react-router-dom';

//Styling for card colors
import { category } from './category.js';

//Actions
import { setCurrentModal, showModal } from '../../../../store/modal';

//Components
import { DeliveryForm } from '../../../../Forms/Delivery';
import { FavoritesIcon } from '../../../../Assets/Logo/FavoritesIcon';
import { QuestionBtn, RequestBtn } from '../../../Styled/Buttons';
import { VectorBox } from '../../../Styled/Layout';
// import { LocationPin } from '../../../../Assets/Icons/Location';
import {
    Card,
    TitleBox,
    TitleTextContainer,
    CompanyLogo,
    CompanyName,
    // PinContainer,
    // CompanyAddress,
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
} from "../../../Styled/ItemCard";

//Helper function
import { daysAgo } from '../../../../utils/Dates';

export const CardContent = ({ post }) => {
    console.log(post)
    const dispatch = useDispatch();
    const { theme } = useTheme();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const organizations = useSelector(state => state.organizations);
    const businesses = organizations.businesses;
    const nonprofits = organizations.nonprofits;
    const organization = post?.isItem ? businesses[post?.organizationId] : nonprofits[post?.organizationId];



    const styleObj = category[theme][post?.categoryId];

    const handleQuestion = () => {
        dispatch(setCurrentModal(() => <DeliveryForm post={post}/>));
        dispatch(showModal());
    };

    const handleRequest = () => {
        dispatch(setCurrentModal(() => <DeliveryForm post={post}/>));
        dispatch(showModal());
    };

    // const formatAddress = () => {
    //     const address = `${organization.street}, ${organization.city}, ${organization.state.slice(0, 2).toUpperCase()} ${organization.zip}`;
    //     return address;
    // };

    //test

    const handleClick = () => {
        return history.push(`/items/${post.id}`)
    };

    return (
        <Card color={styleObj} height={sessionUser ? '390px' : '350px'}>
            <TitleBox to={`/organizations/${organization.id}`}>
                <VectorBox square='30px' resize='32px'>
                    <CompanyLogo src={organization.logoUrl} alt='Business logo.' width='30px' height='30px' backgroundColor='#191919'/>
                </VectorBox>
                <TitleTextContainer>
                    <CompanyName>{organization.name}</CompanyName>
                    {/* <PinContainer width='15px' height='15px'>
                        <LocationPin color='black'/>
                    </PinContainer>
                    <CompanyAddress>{formatAddress()}</CompanyAddress> */}
                </TitleTextContainer>
                <ItemDateText theme={theme}>{daysAgo(post)}</ItemDateText>
            </TitleBox>
            <ItemImage src={post.imageUrl} alt='Food available for pick up.' onClick={handleClick}/>
            <InfoBox>
                <InfoContainer>
                    <ItemTitle theme={theme}>{post?.title}</ItemTitle>
                    <ItemQuantity theme={theme}>({post?.quantity})</ItemQuantity>
                </InfoContainer>
                <VectorBox square='30px' opacity='50%'>
                    {sessionUser && (
                        <FavoritesIcon post={post} />
                    )}
                </VectorBox>
            </InfoBox>
            <DescriptionBox>
                <DescriptionText theme={theme}>{post.description}</DescriptionText>
            </DescriptionBox>
            {sessionUser && (
                <ButtonBox>
                    <QuestionBtn theme={theme} onClick={handleQuestion}>
                        <QuestionText theme={theme}>{sessionUser.id === post.userId ? 'Edit Item' : 'Ask a question'}</QuestionText>
                    </QuestionBtn>
                    <RequestBtn onClick={handleRequest}>
                        <ButtonText>{sessionUser.id === post.userId ? 'Delete Item' : 'Send a request'}</ButtonText>
                    </RequestBtn>
                </ButtonBox>
            )}
        </Card>
    )
};
