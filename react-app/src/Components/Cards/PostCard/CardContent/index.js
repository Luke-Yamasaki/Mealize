//Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../../../Context/ThemeContext';
import { useHistory } from 'react-router-dom';

//Styling for card colors
import { category } from './category.js';

//Actions
import { setCurrentModal, showModal } from '../../../../store/modal';
import { removePost } from '../../../../store/posts';
//Components
import { DeliveryForm } from '../../../../Forms/Delivery';
import { EditPostForm } from '../../../../Forms/Post/EditPost';
import { FavoritesIcon } from '../FavoritesIcon';
import { ActionButtons } from '../ActionButtons';
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
} from "../../../Styled/PostCard";

//Helper function
import { daysAgo } from '../../../../utils/Dates';

export const CardContent = ({ post }) => {
    const dispatch = useDispatch();
    const { theme } = useTheme();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const businesses = useSelector(state => state.organizations.businesses)
    const nonprofits = useSelector(state => state.organizations.nonprofits)
    const organization = post?.isItem ? businesses[post?.organizationId] : nonprofits[post?.organizationId];

    const styleObj = category[theme][post?.categoryId];

    // const formatAddress = () => {
    //     const address = `${organization.street}, ${organization.city}, ${organization.state.slice(0, 2).toUpperCase()} ${organization.zip}`;
    //     return address;
    // };

    const handleClick = () => {
        return history.push(`/items/${post.id}`)
    };

    return (
        <Card color={styleObj} height={!sessionUser ? '350px' : sessionUser.isNonprofit && !post.isItem ? '350px' : !sessionUser.isNonprofit && post.isItem ? '350px' : '390px'}>
            <TitleBox to={`/organizations/${organization.id}`}>
                <VectorBox square='30px' resize='32px'>
                    <CompanyLogo src={organization.logoUrl} alt='Business logo.' width='30px' height='30px' backgroundColor='#191919'/>
                </VectorBox>
                <TitleTextContainer>
                    <CompanyName>{organization.name}</CompanyName>
                </TitleTextContainer>
                <ItemDateText theme={theme}>{daysAgo(post)}</ItemDateText>
            </TitleBox>
            <ItemImage src={post.imageUrl} alt='Food available for pick up.' onClick={handleClick}/>
            <InfoBox>
                <InfoContainer>
                    <ItemTitle theme={theme}>{post?.title}</ItemTitle>
                    <ItemQuantity theme={theme}>({post?.quantity})</ItemQuantity>
                </InfoContainer>
                <VectorBox square='30px' cursor='pointer'>
                    {sessionUser && (
                        <FavoritesIcon post={post} />
                    )}
                </VectorBox>
            </InfoBox>
            <DescriptionBox>
                <DescriptionText theme={theme}>{post.description}</DescriptionText>
            </DescriptionBox>
            <ActionButtons post={post} />
        </Card>
    )
};
