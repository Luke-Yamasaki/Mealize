import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo';
import { MagnifyingGlass } from '../../Assets/Icons/MagnifyingGlass';
import { useSelector, useDispatch } from "react-redux";
import { LoginForm } from '../../Forms/Login';
import { SignupForm } from '../../Forms/Signup';
import { Searchbar } from '../Searchbar';
import ItemForm from '../../Forms/Item';
import styles from './Navbar.module.css';
import styled from 'styled-components';
import { showModal, setCurrentModal } from '../../store/modal';
import { logout } from '../../store/session';
import { Nav, NavList, LogoBox, AuthBox } from '../Styled/Navbar';

export const Navbar = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const showLoginModal = () => {
        dispatch(setCurrentModal(LoginForm));
        dispatch(showModal());
    };

    const showSignupModal = () => {
        dispatch(setCurrentModal(SignupForm));
        dispatch(showModal());
    };

    return (
        <Nav>
            <NavList>
                <LogoBox>
                    <Logo dimension={"medium"} />
                    <NavLink to="/" exact={true} className={styles.link}>Mealize</NavLink>
                </LogoBox>
                <Searchbar />
                <AuthBox>
                    <div role='button' className={styles.login} onClick={showLoginModal}>Log in</div>
                    <div role='button' className={styles.signup} onClick={showSignupModal}>Sign up</div>
                </AuthBox>
            </NavList>
        </Nav>
    )
}
