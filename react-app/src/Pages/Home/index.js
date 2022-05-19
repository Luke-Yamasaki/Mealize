//Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../Context/ThemeContext';

//Components
import { PostsFeed } from '../../Components/PostsFeed';
import { CategoryFilter } from '../../Components/Filter/category';
import { FavoritesFilter } from '../../Components/Filter/favorite';
import { AvailabilityFilter } from '../../Components/Filter/availability';
import { PostTypeFilter } from '../../Components/Filter/postType';
// import { BusinessFilter } from '../../Components/Filter/business';
// import { NonprofitFilter } from '../../Components/Filter/nonprofit';
//styled-components
import {
    PageBackGround,
    SideBarContainer,
    FilterTitle,
    PostsTitle,
    PostsSection
} from '../../Components/Styled/Layout';

export const Home = () => {
    const sessionUser = useSelector(state => state.session.user);
    const categoriesObj = useSelector(state => state.categories);
    const {theme} = useTheme();

    const categories = Object.values(categoriesObj);

    return(
        <PageBackGround background={theme === 'light' ? '#E8E8E8' : '#232323'} bordercolor={theme === 'light' ? '#B2B2B2' : '#616161'}>
            <SideBarContainer height={sessionUser ? '870px' : '745px'}>
                <FilterTitle theme={theme}>Filter</FilterTitle>
                {sessionUser && (
                    <FavoritesFilter theme={theme}/>
                )}
                <AvailabilityFilter theme={theme}/>
                <PostTypeFilter theme={theme} />
                <CategoryFilter theme={theme} categories={categories} />
                {/* <BusinessFilter theme={theme} businesses={threeBusinesses} />
                <NonprofitFilter theme={theme} nonprofits={threeNonprofits} /> */}
            </SideBarContainer>
            <PostsSection>
                <PostsTitle theme={theme}>Posts</PostsTitle>
                <PostsFeed />
            </PostsSection>
        </PageBackGround>
    )
};
