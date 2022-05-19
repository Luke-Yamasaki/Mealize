//Hooks
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';
import { useState } from 'react';

//Components
import { PostCard } from '../../Components/Cards/PostCard';

//Helper
import { colors } from './colors';

//Styled-components
import {
    ManagerSection,
    ManagerContainer,
    ManagerForeground,
    ManagerInfoBox,
    ManagerName,
    ManagerInfoText
} from "../../Components/Styled/Organization";

import {
    SinglePostWrapper,
    SinglePostBannerBox,
    SinglePostBannerImage,
    SinglePostBannerInfoBox,
    SinglePostProfileImage,
    SinglePostName,
    SinglePostBannerText,
    SinglePostContentBox,
    SinglePostSection,
    SinglePostPinBox
 } from '../../Components/Styled/SinglePost';
import { VectorBox } from '../../Components/Styled/Layout';
import { LocationPin } from '../../Assets/Icons/Location';

//Main component

export const SinglePostPage = () => {
    const sessionUser = useSelector(state => state.session.user);
    const users = useSelector(state => state.users);
    const posts = useSelector(state => state.posts.all);
    const businesses = useSelector(state => state.organizations.businesses);
    const nonprofits = useSelector(state => state.organizations.nonprofits);
    const { id } = useParams();
    const { theme } = useTheme();

    //post
    const post = posts[id];
    //organization
    const organizations = {...nonprofits, ...businesses};
    const organization = organizations[post.organizationId];
    //user
    const user = users[post.userId];

    const style = colors[theme][post.categoryId];
    console.log(style)

    return (
        <SinglePostWrapper>
            <SinglePostBannerBox>
                <SinglePostBannerImage src={organization.imageUrl} alt='Organization banner.' />
                <SinglePostBannerInfoBox theme={theme}>
                    <SinglePostProfileImage src={organization.logoUrl} alt='Organization profile.' />
                    <SinglePostName theme={theme}>{organization.name}</SinglePostName>
                    <SinglePostPinBox>
                        <VectorBox square='20px'>
                            <LocationPin theme={theme} />
                        </VectorBox>
                        <SinglePostBannerText theme={theme}>{organization.street + ', ' + organization.city + ', ' + organization.state + ' ' + organization.zip}</SinglePostBannerText>
                    </SinglePostPinBox>
                </SinglePostBannerInfoBox>
            </SinglePostBannerBox>
            <SinglePostContentBox style={style}>
                <PostCard post={post} />
            </SinglePostContentBox>
        </SinglePostWrapper>
    )
};
