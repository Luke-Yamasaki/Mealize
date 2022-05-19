//Hooks
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../Context/ThemeContext';
import { setCurrentModal, showModal } from '../../store/modal';
import { useEffect, useState } from 'react';
//Components
import { PostCard } from '../../Components/Cards/PostCard/index';
import { MessageForm } from '../../Forms/Message';
//Styled-components
import {
    OrgWrapper,
    OrgBannerBox,
    OrgBannerImage,
    OrgBannerInfoBox,
    OrgProfileImage,
    OrgName,
    OrgBannerText,
    OrgContentBox,
    ManagerSection,
    ManagerContainer,
    ManagerForeground,
    ManagerInfoBox,
    ManagerName,
    ManagerInfoText,
    ManagerButton,
    OrgQuestionText,
    OrgItems,
    OrgFilters,
    OrgFilterTitle,
    OrgFilterBox,
    OrgFilterText,
    OrgItemsFeed,
    OrgSection,
    OrgPostFeed,
    OrgFilterSlash
} from "../../Components/Styled/Organization";
import { getAllPosts } from '../../store/posts';
import { getBatchedOrganizations } from '../../store/organizations';
import { PostsTitle, VectorBox } from '../../Components/Styled/Layout';

//Main component

export const OrganizationPage = () => {
    const { theme } = useTheme();
    const { id } = useParams();
    const dispatch = useDispatch();
    const businesses = useSelector(state => state.organizations.businesses);
    const nonprofits = useSelector(state => state.organizations.nonprofits);
    const users = useSelector(state => state.users);
    const posts = useSelector(state => state.posts.all);
    const [selected, setSelected] = useState('All items');

    let postsArr = [];
    postsArr = Object.values(posts).filter(post => post.organizationId.toString() === id);
    const availableArr = postsArr.filter(post => post.status === 0);
    const completedArr = postsArr.filter(post => post.status === 4);
    const unavailableArr = postsArr.filter(post => post.status === 1 || post.status === 2);
    const allOrgs = {...nonprofits, ...businesses};
    const organization = allOrgs[id];
    let manager;
    let employeeArr = [];
    let managerArr = [];
    employeeArr = Object.values(users).filter(user => user.organizationId.toString() === id);
    managerArr = employeeArr.filter(employee => employee.isManager);
    //Only one manager for now
    manager = managerArr[0];

    const handleMessage = (e) => {
        e.preventDefault();
        dispatch(setCurrentModal(() => <MessageForm />));
        dispatch(showModal());
    };

    const handleFilter = (e) => {
        e.preventDefault();
        setSelected(e.target.innerText);
    };



    return (
        <OrgWrapper>
            <OrgBannerBox>
                <OrgBannerImage src={organization.imageUrl} alt='Organization banner.' />
                <OrgBannerInfoBox theme={theme}>
                    <OrgProfileImage src={organization.logoUrl} alt='Organization profile.' />
                    <OrgName theme={theme}>{organization.name}</OrgName>
                    <VectorBox square='20px'>

                    </VectorBox>
                    <OrgBannerText theme={theme}>{organization.street + ', ' + organization.city + ', ' + organization.state + ' ' + organization.zip}</OrgBannerText>
                </OrgBannerInfoBox>
            </OrgBannerBox>
            <OrgContentBox theme={theme}>
                <ManagerSection>
                    <ManagerContainer image={manager.profileImageUrl}>
                        <ManagerForeground>
                            <ManagerInfoBox>
                                <ManagerName>{manager.firstName + ' ' + manager.lastName}</ManagerName>
                                <ManagerInfoText>{`Manager at ${organization.name}`}</ManagerInfoText>
                            </ManagerInfoBox>
                            <ManagerInfoBox>
                                <ManagerInfoText>Quick responder</ManagerInfoText>
                                <ManagerButton onClick={handleMessage}>
                                    <OrgQuestionText>{`Ask ${manager.firstName} a question`}</OrgQuestionText>
                                </ManagerButton>
                            </ManagerInfoBox>
                        </ManagerForeground>
                    </ManagerContainer>
                </ManagerSection>
                <OrgSection>
                    <OrgFilters>
                        <OrgFilterTitle theme={theme}>Filters:</OrgFilterTitle>
                        <OrgFilterBox theme={theme}>
                            <OrgFilterText theme={theme} width='100px' color={selected === 'All items' ? 'true' : 'false'} onClick={handleFilter}>All items</OrgFilterText>
                            <OrgFilterSlash theme={theme} color={selected === 'Available' ? 'true' : 'false'}>/</OrgFilterSlash>
                            <OrgFilterText theme={theme} width='100px' color={selected === 'Available' ? 'true' : 'false'} onClick={handleFilter}>Available</OrgFilterText>
                            <OrgFilterSlash theme={theme} color={selected === 'Unavailable' ? 'true' : 'false'}>/</OrgFilterSlash>
                            <OrgFilterText theme={theme} width='125px' color={selected === 'Unavailable' ? 'true' : 'false'} onClick={handleFilter}>Unavailable</OrgFilterText>
                            <OrgFilterSlash theme={theme} color={selected === 'Completed' ? 'true' : 'false'}>/</OrgFilterSlash>
                            <OrgFilterText theme={theme} width='120px' color={selected === 'Completed' ? 'true' : 'false'} onClick={handleFilter}>Completed</OrgFilterText>
                        </OrgFilterBox>
                    </OrgFilters>
                    <OrgPostFeed>
                        {selected === 'All items' && postsArr.length > 0 && postsArr.map((post) => <PostCard key={post.id} post={post} />)}
                        {selected === 'Available' && availableArr.length > 0 && availableArr.map((post) => <PostCard key={post.id} post={post} />)}
                        {selected === 'Unavailable' && unavailableArr.length > 0 && unavailableArr.map((post) => <PostCard key={post.id} post={post} />)}
                        {selected === 'Completed' && completedArr.length > 0 && completedArr.map((post) => <PostCard key={post.id} post={post} />)}
                    </OrgPostFeed>
                </OrgSection>
            </OrgContentBox>
        </OrgWrapper>
    )
}
