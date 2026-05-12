//Hooks
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';
import { Redirect } from 'react-router-dom';
//Components
import { PostCard } from '../../Components/Cards/PostCard';

//Helper
import { colors } from './colors';

//Styled-components

import {
    SinglePostWrapper,
    SinglePostBannerBox,
    SinglePostBannerImage,
    SinglePostBannerInfoBox,
    SinglePostProfileImage,
    SinglePostName,
    SinglePostBannerText,
    SinglePostContentBox,
    SinglePostPinBox
 } from '../../Components/Styled/SinglePost';
import { VectorBox } from '../../Components/Styled/Layout';
import { LocationPin } from '../../Assets/Icons/Location';
import { ClockIcon } from '../../Assets/Icons/Clock';

//Main component

export const SinglePostPage = () => {
    const posts = useSelector(state => state.posts.all);
    const businesses = useSelector(state => state.organizations.businesses);
    const nonprofits = useSelector(state => state.organizations.nonprofits);
    const { id } = useParams();
    const history = useHistory();
    const { theme } = useTheme();

    //post
    const post = posts[id];

    if(!post) {
        return <Redirect to='/' />
    }

    //organization
    const organizations = {...nonprofits, ...businesses};
    const organization = organizations[post.organizationId];
    //user
    // const user = users[post.userId];

    const style = colors[theme][post.categoryId];

    const handleRedirect = (e) => {
        e.preventDefault();
        history.push(`/organizations/${post.organizationId}`)
    };

    const times = {
        'Morning' : '9:00 - 10:30 AM',
        'Noon' : '11:00 - 12:30PM',
        'Early afternoon': '1:00 - 2:00 PM',
        'Late afternoon': '2:30PM - 4:00PM'
    };


    return (
        <SinglePostWrapper>
            <SinglePostBannerBox>
                <SinglePostBannerImage src={organization.imageUrl} alt='Organization banner.' />
                <SinglePostBannerInfoBox theme={theme}>
                    <SinglePostProfileImage src={organization.logoUrl} alt='Organization profile.' onClick={handleRedirect}/>
                    <SinglePostName theme={theme} onClick={handleRedirect}>{organization.name}</SinglePostName>
                    <SinglePostPinBox>
                        <VectorBox square='20px'>
                            <LocationPin theme={theme} />
                        </VectorBox>
                        <SinglePostBannerText theme={theme}>{organization.street + ', ' + organization.city + ', ' + organization.state + ' ' + organization.zip}</SinglePostBannerText>
                    </SinglePostPinBox>
                    <SinglePostPinBox>
                        <VectorBox square='20px'>
                            <ClockIcon theme={theme} />
                        </VectorBox>
                        <SinglePostBannerText theme={theme}>{`Available time: ${times[organization.timeslot]}`}</SinglePostBannerText>
                    </SinglePostPinBox>
                </SinglePostBannerInfoBox>
            </SinglePostBannerBox>
            <SinglePostContentBox style={style}>
                <PostCard post={post} />
            </SinglePostContentBox>
        </SinglePostWrapper>
    )
};
