//Hooks
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '../../Context/ThemeContext';

//Components
import { PostCard } from '../../Components/Cards/PostCard/index';

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
    QuestionText,
    OrgItems,
    OrgFilters,
    FilterTitle,
    FilterBox,
    FilterText,
    OrgItemsFeed,
    OrgSection,
    OrgPostFeed
} from "../../Components/Styled/SinglePost";


//Main component

export const OrganizationPage = () => {
    const { theme } = useTheme();
    const { id } = useParams();
    const businesses = useSelector(state => state.organizations.businesses);
    const nonprofits = useSelector(state => state.organizations.nonprofits);
    const users = useSelector(state => state.users);
    const posts = useSelector(state => state.posts);

    const allOrgs = {...nonprofits, ...businesses};
    const organization = allOrgs[id];
    const employeeArr = Object.values(users).filter(user => user.organizationId === organization.id);
    const managerArr = employeeArr.filter(employee => employee.isManager);

    //Only one manager for now
    const manager = managerArr[0];

    //Posts
    const postsArr = Object.values(posts).filter(post => post.organizationId === organization.id);

    return (
        <OrgWrapper>
            <OrgBannerBox>
                <OrgBannerImage src={organization.imageUrl} alt='Organization banner.' />
                <OrgBannerInfoBox theme={theme}>
                    <OrgProfileImage src={organization.logoUrl} alt='Organization profile.' />
                    <OrgName>{organization.name}</OrgName>
                    <OrgBannerText>Contributions calculations in year ...</OrgBannerText>
                </OrgBannerInfoBox>
            </OrgBannerBox>
            <OrgContentBox theme={theme}>
                <ManagerSection>
                    <ManagerContainer>
                        <ManagerForeground>
                            <ManagerInfoBox>
                                <ManagerName>{manager.firstName + manager.lastName}</ManagerName>
                                <ManagerInfoText>{`Manager at ${organization.name}`}</ManagerInfoText>
                            </ManagerInfoBox>
                            <ManagerInfoBox>
                                <ManagerInfoText>Quick responder</ManagerInfoText>
                                <ManagerButton>
                                    <QuestionText>{`Ask ${manager.firstName} a question`}</QuestionText>
                                </ManagerButton>
                            </ManagerInfoBox>
                        </ManagerForeground>
                    </ManagerContainer>
                </ManagerSection>
                <OrgSection>
                    <OrgFilters>
                        <FilterTitle theme={theme}></FilterTitle>
                        <FilterBox>
                            <FilterText theme={theme}>All items</FilterText>
                            <FilterText theme={theme}>/ Available </FilterText>
                            <FilterText theme={theme}>/ Completed</FilterText>
                        </FilterBox>
                    </OrgFilters>
                    <OrgPostFeed>
                        {postsArr.length > 0 && postsArr.map((post) => <PostCard post={post} />)}
                    </OrgPostFeed>
                </OrgSection>
            </OrgContentBox>
        </OrgWrapper>
    )
}
