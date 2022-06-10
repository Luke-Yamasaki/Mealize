//Hooks
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { useTheme } from '../../../Context/ThemeContext';
import { useFilter } from '../../../Context/FilterContext';
// Actions
import { logout } from '../../../store/session';
import { setCurrentModal, showModal } from '../../../store/modal';
// Styled-components
import { NavBar, Navigation, NavList, LogoBox, LogoNavLink, NavIconContainer, ProfileName } from '../../Styled/Navbar';
import { VectorBox } from '../../Styled/Layout';
import { ButtonText, ProfileButton, PostButton, LogoutButton } from '../../Styled/Buttons';
//Components
// import { NotificationBar } from '../NotificationBar';
import { SearchBar } from '../SearchBar';
import PostForm from '../../../Forms/Post';
//Icons
import { Logo } from '../../../Assets/Logo';
import { InboxIcon } from '../../../Assets/Icons/Inbox';
import { HomeIcon } from '../../../Assets/Icons/Home';
import { VolunteerIcon } from '../../../Assets/Icons/Volunteers';
import { Settings } from '../../../Assets/Icons/Settings';

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
                        <VectorBox square='40px' resize='41px' cursor='pointer'>
                            <Logo theme={theme} />
                        </VectorBox>
                        <LogoNavLink theme={theme} to='/' exact={true}>Mealize</LogoNavLink>
                    </LogoBox>
                    <SearchBar />
                    <NavIconContainer>
                        <ProfileButton src={sessionUser.profileImageUrl} alt='Profile Button' />
                        {/* <ProfileName theme={theme}>{sessionUser.firstName.length <= 8 ? `Hello ${sessionUser.firstName}!` : `Hello ${sessionUser.firstName.slice(0, 7)}...!`}</ProfileName> */}
                        <VectorBox square='30px' resize='30.5px' cursor='pointer' onClick={handleDeliveries}>
                            <VolunteerIcon theme={theme}/>
                        </VectorBox>
                        <VectorBox square='30px' resize='30.5px' cursor='pointer' onClick={handleMessages}>
                            <HomeIcon theme={theme} />
                        </VectorBox>
                        <VectorBox square='30px' resize='30.5px' cursor='pointer' onClick={handleMessages}>
                            <InboxIcon theme={theme} />
                        </VectorBox>
                        <VectorBox square='30px' resize='30.5px' cursor='pointer' onClick={handleMessages}>
                            <Settings theme={theme}/>
                        </VectorBox>
                        {sessionUser.isManager &&
                            <PostButton onClick={showPostForm}>
                                <ButtonText>{sessionUser.isNonprofit && sessionUser.isManager ? 'Post a request' : 'Post an item'}</ButtonText>
                            </PostButton>
                        }
                        <LogoutButton onClick={logOut} type={sessionUser.isManager ? 'manager' : 'volunteer'}>
                            <ButtonText color={sessionUser.isManager ? 'white' : 'black'} weight={sessionUser.isManager ? '400' : '700'}>Log out</ButtonText>
                        </LogoutButton>
                    </NavIconContainer>
                </NavList>
            </Navigation>
            {/* <NotificationBar theme={theme}/> */}
        </NavBar>
    )
}
