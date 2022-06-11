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
import { NavBar, Navigation, NavList, LogoBox, LogoNavLink, NavIconContainer, NavIconBoxes, DropDownContainer } from '../../Styled/Navbar';
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
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showCustomizationMenu, setShowCustomizationMenu] = useState(false);
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
                    <NavIconBoxes>
                        <VectorBox square='30px' resize='30.5px' cursor='pointer' onClick={handleMessages}>
                            <HomeIcon theme={theme} />
                        </VectorBox>
                    </NavIconBoxes>
                    <NavIconBoxes>
                        <VectorBox square='30px' resize='30.5px' cursor='pointer' onClick={handleDeliveries}>
                            <VolunteerIcon theme={theme}/>
                        </VectorBox>
                    </NavIconBoxes>
                    <NavIconBoxes>
                        <VectorBox square='30px' resize='30.5px' cursor='pointer' onClick={handleMessages}>
                            <InboxIcon theme={theme} />
                        </VectorBox>
                    </NavIconBoxes>
                    <SearchBar />
                    <DropDownContainer>
                        <NavIconBoxes>
                            <ProfileButton src={sessionUser.profileImageUrl} alt='Profile Button' onClick={() => setShowUserMenu(!showUserMenu)}/>
                        </NavIconBoxes>
                        {showUserMenu &&
                            <div>
                                Dropdown
                                <menu>
                                    <li>
                                        <div theme={theme}>{sessionUser.firstName.length <= 8 ? `Hello ${sessionUser.firstName}!` : `Hello ${sessionUser.firstName.slice(0, 7)}...!`}</div>
                                    </li>
                                    <li>
                                        <div onClick={logOut}>Log out</div>
                                    </li>
                                </menu>
                            </div>
                        }
                    </DropDownContainer>
                    <DropDownContainer>
                        <NavIconBoxes>
                            <VectorBox square='30px' resize='30.5px' cursor='pointer' onClick={() => setShowCustomizationMenu(!showCustomizationMenu)}>
                                <Settings theme={theme}/>
                            </VectorBox>
                        </NavIconBoxes>
                        {showCustomizationMenu &&
                            <div>
                                Dropdown
                                <menu>
                                    <li>
                                        <div theme={theme}>{sessionUser.firstName.length <= 8 ? `Hello ${sessionUser.firstName}!` : `Hello ${sessionUser.firstName.slice(0, 7)}...!`}</div>
                                    </li>
                                    <li>
                                        <div onClick={logOut}>Log out</div>
                                    </li>
                                </menu>
                            </div>
                        }
                    </DropDownContainer>
                    {sessionUser.isManager &&
                        <PostButton onClick={showPostForm}>
                            <ButtonText>{sessionUser.isNonprofit ? 'New post' : 'New post'}</ButtonText>
                        </PostButton>
                    }
                </NavList>
            </Navigation>
            {/* <NotificationBar theme={theme}/> */}
        </NavBar>
    )
}
