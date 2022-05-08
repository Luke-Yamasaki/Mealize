//Hooks
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../../Context/ThemeContext';
//CSS
import styles from './SessionNavbar.module.css';
// Actions
import { logout } from '../../../store/session';
import { setCurrentModal, showModal } from '../../../store/modal';
// Styled-components
import { NavBar, Navigation, NavList, LogoBox, AuthBox, StyledNavLink } from '../../Styled/Navbar';
import { VectorBox } from '../Styled/Layout';
//Components
import { NotificationBar } from '../NotificationBar';
import { Logo } from '../../../Assets/Logo';
import { SearchBar } from '../SearchBar';
import ItemForm from '../../../Forms/Item';

export const SessionNavbar = () => {
    const sessionUser = useSelector(state => state.session.user);
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
                        <VectorBox>
                            <Logo theme={theme} />
                        </VectorBox>
                        <StyledNavLink theme={theme} to='/' exact={true}>Mealize</StyledNavLink>
                    </LogoBox>
                    <SearchBar />
                    <div className={styles.signup}>User</div>
                    <NavLink style={{textDecoration: 'none'}} to='/deliveries' exact className={styles.signup}>Deliveries</NavLink>
                    {sessionUser.isNonprofit && sessionUser.isManager ?
                    <div style={{width: '100px'}} className={styles.signup} onClick={showItemForm}>New request</div>
                    :
                    <div className={styles.signup} onClick={showItemForm}>Post item</div>
                    }
                    <div className={styles.signup} onClick={logOut}>Log out</div>
                </NavList>
            </Navigation>
            <NotificationBar />
        </NavBar>
    )
}
