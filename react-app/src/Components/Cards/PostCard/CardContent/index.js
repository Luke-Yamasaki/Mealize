//Hooks
import { useSelector } from 'react-redux';
import { useTheme } from '../../../../Context/ThemeContext';
import { useHistory } from 'react-router-dom';

//Styling for card colors
import { category } from './category.js';
//Components
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
    ReservedBackGround,
} from "../../../Styled/PostCard";

//Helper function
import { daysAgo } from '../../../../utils/Dates';

export const CardContent = ({ post, preview }) => {
    const { theme } = useTheme();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const organizations = useSelector(state => state.organizations);
    const organizationsObj = {...organizations.nonprofits, ...organizations.businesses};
    const organization = organizationsObj[post?.organizationId];

    const styleObj = category[theme][post?.categoryId];

    // const formatAddress = () => {
    //     const address = `${organization.street}, ${organization.city}, ${organization.state.slice(0, 2).toUpperCase()} ${organization.zip}`;
    //     return address;
    // };

    const handleClick = () => {
        return history.push(`/posts/${post?.id}`)
    };

    if(!post) {
        return null
    }

    return (
        <Card status={post?.status > 0 && post?.userId !== sessionUser?.id} color={styleObj} height={!sessionUser ? '350px' : preview === 'true' ? '350px' : post?.status > 0 ? '350px' : '390px'}>
            {(post?.status > 0 && preview === 'false') &&
            <ReservedBackGround>
                {post?.status === 1 && post?.isItem ? 'Reserved' : post?.status === 2 && post?.isItem ? 'Confirmed' : 'Completed'}
            </ReservedBackGround>}
            <TitleBox to={`/organizations/${organization.id}`}>
                <VectorBox square='25px' resize='26px' cursor='pointer'>
                    <CompanyLogo src={organization?.logoUrl} alt='Business logo.' width='30px' height='30px' backgroundColor='#191919'/>
                </VectorBox>
                <TitleTextContainer>
                    <CompanyName>{organization?.name.length <= 25 ? organization?.name : organization?.name.slice(0, 25) + '...'}</CompanyName>
                </TitleTextContainer>
                <ItemDateText theme={theme}>{daysAgo(post)}</ItemDateText>
            </TitleBox>
            <ItemImage src={post?.imageUrl} alt='Food available for pick up.' onClick={handleClick}/>
            <InfoBox>
                <InfoContainer>
                    <ItemTitle theme={theme}>{post?.title}</ItemTitle>
                    <ItemQuantity theme={theme}>({post?.quantity})</ItemQuantity>
                </InfoContainer>
                <VectorBox square='25px' resize='26px' cursor='pointer'>
                    {(sessionUser && post) && (
                        <FavoritesIcon post={post} />
                    )}
                </VectorBox>
            </InfoBox>
            <DescriptionBox>
                <DescriptionText theme={theme}>{post?.description}</DescriptionText>
            </DescriptionBox>
            {((preview === 'false' && post?.status === 0) || (preview === 'false' && post?.status === 0 && post?.organizationId === sessionUser?.organizationId)) && <ActionButtons post={post} />}
        </Card>
    )
};
