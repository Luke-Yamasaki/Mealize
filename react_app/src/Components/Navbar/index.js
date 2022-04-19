import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo';
import { MagnifyingGlass } from '../../Assets/Icons/MagnifyingGlass';
import { useSelector, useDispatch } from "react-redux";
import { LoginForm } from '../../Forms/Login';
import { SignupForm } from '../../Forms/Signup';
import ItemForm from '../../Forms/Item';
import styles from './Navbar.module.css';
import styled from 'styled-components';
import { showModal, setCurrentModal } from '../../store/modal';
import { logout } from '../../store/session';

const Nav = styled.nav`
    width: 80vw;
    height: 60px;
    background: linear-gradient(#76D97E, #28A690);
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;


const NavList = styled.ul`
    width: 80vw;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

const SearchBar = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 30vw;
    height: 30px;
    background-color: white;
    border-radius: 50px;
    padding-left: 0.15rem;
    gap: 0.1rem;
`;

const SearchInput = styled.input`
    width: 70%;
    height: 25px;
    font-family: motiva-sans,sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 12px;
    border: none;
    padding: 0px;
    margin: 0px;
`;

const LogoBox = styled.div`
    width: 165px;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const AuthBox = styled.div`
    width: 175px;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

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

    const showItemForm = () => {
        dispatch(setCurrentModal(ItemForm));
        dispatch(showModal());
    };

    const logOut = () => {
        dispatch(logout())
    }

    if(!sessionUser) {
        return (
            <Nav>
                <NavList>
                    <LogoBox>
                        <Logo dimension={"medium"} />
                        <NavLink to="/" exact={true} className={styles.link}>Mealize</NavLink>
                    </LogoBox>
                    <SearchBar>
                        <MagnifyingGlass />
                        <SearchInput placeholder='Search...'></SearchInput>
                    </SearchBar>
                    <AuthBox>
                        <div role='button' className={styles.login} onClick={showLoginModal}>Log in</div>
                        <div role='button' className={styles.signup} onClick={showSignupModal}>Sign up</div>
                    </AuthBox>
                </NavList>
            </Nav>
        )
    } else {
       return (
            <Nav>
                <NavList>
                    <Logo dimension={"medium"} />
                    <NavLink to="/" exact={true} className={styles.link}>Mealize</NavLink>
                    <SearchBar>
                        <MagnifyingGlass />
                        <SearchInput placeholder='Search...'></SearchInput>
                    </SearchBar>
                    <div role='button' className={styles.signup}>User</div>
                    <div role='button' className={styles.signup}>Inbox</div>
                    <div role='button' className={styles.signup}>Notifications</div>
                    <div role='button' className={styles.signup} onClick={showItemForm}>Post</div>
                    <div role='button' className={styles.signup} onClick={logOut}>Log out</div>
                </NavList>
            </Nav>
        )
    }

}
