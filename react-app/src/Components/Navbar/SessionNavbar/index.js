//Hooks
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { useTheme } from '../../../Context/ThemeContext';
import { useFilter } from '../../../Context/FilterContext';
// Actions
import { logout } from '../../../store/session';
import { setCurrentModal, showModal } from '../../../store/modal';
// Styled-components
import { NavBar, Navigation, NavList, LogoBox, LogoNavLink, ProfileName } from '../../Styled/Navbar';
import { VectorBox } from '../../Styled/Layout';
import { ButtonText, ProfileButton, PostButton, LogoutButton } from '../../Styled/Buttons';
import { ProfileBox } from '../../Styled/Navbar';
//Components
import { NotificationBar } from '../NotificationBar';
import { SearchBar } from '../SearchBar';
import PostForm from '../../../Forms/Post';
//Icons
import { Logo } from '../../../Assets/Logo';
import { InboxIcon } from '../../../Assets/Icons/Inbox';
import { VolunteerIcon } from '../../../Assets/Icons/Volunteers';

export const SessionNavbar = ({sessionUser}) => {
    const dispatch = useDispatch();
    const {theme} = useTheme();
    const {setFilter} = useFilter();
    const history = useHistory();

    const showPostForm = () => {
        dispatch(setCurrentModal(PostForm));
        dispatch(showModal());
    };

    const logOut = () => {
        setFilter('available')
        dispatch(logout())
        return <Redirect to='/' />
    };

    const handleMessages = (e) => {
        e.preventDefault();
        history.push('/messages')
    };

    const handleDeliveries = (e) => {
        e.preventDefault();
        history.push('/deliveries');
    };

    return (
        <NavBar>
            <Navigation>
                <NavList>
                    <LogoBox>
                        <VectorBox square='45px' resize='47px'>
                            <Logo theme={theme} />
                        </VectorBox>
                        <LogoNavLink theme={theme} to='/' exact={true}>Mealize</LogoNavLink>
                    </LogoBox>
                    <SearchBar />
                    <ProfileButton src={sessionUser.profileImageUrl} alt='Profile Button' />
                    <VectorBox square='30px' resize='32px' cursor='pointer' onClick={handleDeliveries}>
                        <VolunteerIcon theme={theme}/>
                    </VectorBox>
                    <VectorBox square='30px' resize='32px' cursor='pointer' onClick={handleMessages}>
                        <InboxIcon theme={theme}/>
                    </VectorBox>
                    {sessionUser.isManager &&
                        <PostButton onClick={showPostForm}>
                            <ButtonText>{sessionUser.isNonprofit && sessionUser.isManager ? 'New request' : 'Post item'}</ButtonText>
                        </PostButton>
                    }
                    <LogoutButton onClick={logOut} type={sessionUser.isManager ? 'manager' : 'volunteer'}>
                        <ButtonText color={sessionUser.isManager ? 'white' : 'black'} weight={sessionUser.isManager ? '400' : '700'}>Log out</ButtonText>
                    </LogoutButton>
                </NavList>
            </Navigation>
            <NotificationBar theme={theme}/>
        </NavBar>
    )
}
