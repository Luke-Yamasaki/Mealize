//Hooks
import { useDispatch } from 'react-redux';
import { useTheme } from '../../../Context/ThemeContext';
// Actions
import { logout } from '../../../store/session';
import { setCurrentModal, showModal } from '../../../store/modal';
// Styled-components
import { NavBar, Navigation, NavList, LogoBox, LogoNavLink, ProfileName } from '../../Styled/Navbar';
import { VectorBox } from '../../Styled/Layout';
import { ProfileButton } from '../../Styled/Buttons';
import { ProfileBox } from '../../Styled/Navbar';
//Components
import { NotificationBar } from '../NotificationBar';
import { SearchBar } from '../SearchBar';
import ItemForm from '../../../Forms/Item';
import { PostButton } from '../../Styled/Buttons';
//Icons
import { Logo } from '../../../Assets/Logo';
import { InboxIcon } from '../../../Assets/Icons/Inbox';

export const SessionNavbar = ({sessionUser}) => {
    const dispatch = useDispatch();
    const {theme} = useTheme();

    const showItemForm = () => {
        dispatch(setCurrentModal(ItemForm));
        dispatch(showModal());
    };

    const logOut = () => {
        dispatch(logout())
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
                    <ProfileBox>
                        <ProfileButton src={sessionUser.profileImageUrl} alt='Profile Button' />
                        <ProfileName>{`Hello ${sessionUser.firstName}!`}</ProfileName>
                    </ProfileBox>
                    <VectorBox square='30px' resize='32px'>
                        <InboxIcon theme={theme} />
                    </VectorBox>
                    <PostButton onClick={showItemForm}>{sessionUser.isNonprofit && sessionUser.isManager ? 'New request' : 'Post item'}</PostButton>
                    <PostButton onClick={logOut}>Log out</PostButton>
                </NavList>
            </Navigation>
            <NotificationBar theme={theme}/>
        </NavBar>
    )
}
