//Hooks
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { useTheme } from '../../../Context/ThemeContext';
import { useFilter } from '../../../Context/FilterContext';

// Actions
import { logout } from '../../../store/session';
import { setCurrentModal, showModal } from '../../../store/modal';

// Styled-components
import { NavBar, Navigation, NavList, LogoBox, LogoNavLink, NavIconContainer, NavIconBoxes, DropDownContainer, SmallNavIconContainer, HomeIconBox } from '../../Styled/Navbar';
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
    const [selected, setSelected] = useState('');
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

    const handleHome = (e) => {
        e.preventDefault();
        selected !== 'home' ? setSelected('home') : setSelected('');
        history.push('/')
    };

    const handleDeliveries = (e) => {
        e.preventDefault();
        selected !== 'deliveries' ? setSelected('deliveries') : setSelected('');
        history.push('/deliveries');
    };

    const handleMessages = (e) => {
        e.preventDefault();
        selected !== 'messages' ? setSelected('messages') : setSelected('');
        history.push('/messages')
    };

    const handleUser = (e) => {
        e.preventDefault();
        selected !== 'user' ? setSelected('user') : setSelected('');
    };

    const handleSettings = (e) => {
        e.preventDefault();
        selected !== 'settings' ? setSelected('settings') : setSelected('');
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
                    <NavIconContainer>
                        <NavIconBoxes theme={theme} onClick={handleHome} content='H'>
                            <HomeIcon theme={theme} />
                        </NavIconBoxes>
                        <NavIconBoxes theme={theme} onClick={handleDeliveries} content="D">
                            <VolunteerIcon theme={theme}/>
                        </NavIconBoxes>
                        <NavIconBoxes theme={theme} onClick={handleMessages} content="M">
                            <InboxIcon theme={theme} />
                        </NavIconBoxes>
                    </NavIconContainer>
                    <SearchBar />
                    <SmallNavIconContainer>
                        <NavIconBoxes theme={theme} onClick={handleUser} content="Y">
                            <ProfileButton src={sessionUser.profileImageUrl} alt='Profile Button'/>
                        </NavIconBoxes>
                        {selected === 'user' &&
                            <DropDownContainer theme={theme}>
                                <menu>
                                    <li>
                                        <div theme={theme}>{sessionUser.firstName.length <= 8 ? `Hello ${sessionUser.firstName}!` : `Hello ${sessionUser.firstName.slice(0, 7)}...!`}</div>
                                    </li>
                                    <li>
                                        <div onClick={logOut}>Log out</div>
                                    </li>
                                </menu>
                            </DropDownContainer>
                        }
                        <NavIconBoxes theme={theme} onClick={handleSettings} content="C">
                            <Settings theme={theme}/>
                        </NavIconBoxes>
                        {selected === 'settings' &&
                            <DropDownContainer theme={theme}>
                                <menu>
                                    <li>
                                        <div theme={theme}>{sessionUser.firstName.length <= 8 ? `Hello ${sessionUser.firstName}!` : `Hello ${sessionUser.firstName.slice(0, 7)}...!`}</div>
                                    </li>
                                    <li>
                                        <div onClick={logOut}>Log out</div>
                                    </li>
                                </menu>
                            </DropDownContainer>
                        }
                    </SmallNavIconContainer>
                    {sessionUser.isManager ?
                        <PostButton onClick={showPostForm}>
                            <ButtonText>{sessionUser.isNonprofit ? 'New post' : 'New post'}</ButtonText>
                        </PostButton>
                        :
                        <PostButton onClick={logout}>
                            <ButtonText>Log out</ButtonText>
                        </PostButton>
                    }
                </NavList>
            </Navigation>
            {/* <NotificationBar theme={theme}/> */}
        </NavBar>
    )
}
