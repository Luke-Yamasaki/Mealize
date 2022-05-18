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
    OrgItemsFeed
} from "../../Components/Styled/SinglePost";


//Main component

export const OrganizationPage = () => {
    const { theme } = useTheme();
    const { params } = useParams();
    const businesses = useSelector(state => state.organizations.businesses);
    const nonprofits = useSelector(state => state.organizations.nonprofits);
    const users = useSelector(state => state.users);
    const posts = useSelector(state => state.posts);

    const allOrgs = {...nonprofits, ...businesses};
    const organization = allOrgs[params];
    const employeeArr = Object.values(users).filter(user => user.organizationId === organization.id);
    const managerArr = employeeArr.filter(employee => employee.isManager);

    //Only one manager for now
    const manager = managerArr[0];

    //Posts
    const postsArr = Object.values(posts).filter(post => post.organizationId === organization.id);
    
    return (
        <OrgWrapper>
            <OrgBannerBox>
                <OrgBannerImage alt='Organization banner.' />
                <OrgBannerInfoBox theme={theme}>
                    <OrgProfileImage />
                    <OrgName></OrgName>
                    <OrgBannerText></OrgBannerText>
                </OrgBannerInfoBox>
            </OrgBannerBox>
            <OrgContentBox theme={theme}>
                <ManagerSection>
                    <ManagerContainer>
                        <ManagerForeground>
                            <ManagerInfoBox>
                                <ManagerName></ManagerName>
                                <ManagerInfoText></ManagerInfoText>
                            </ManagerInfoBox>
                            <ManagerInfoBox>
                                <ManagerInfoText></ManagerInfoText>
                                <ManagerButton>
                                    <QuestionText></QuestionText>
                                </ManagerButton>
                            </ManagerInfoBox>
                        </ManagerForeground>
                    </ManagerContainer>
                </ManagerSection>
            </OrgContentBox>
        </OrgWrapper>
    )
}
