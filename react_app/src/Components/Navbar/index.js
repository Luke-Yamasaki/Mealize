import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo';
import { MagnifyingGlass } from '../../Assets/Icons/MagnifyingGlass';
import { AuthButton } from '../AuthButton.js';
import { useSelector, useDispatch } from "react-redux";
import { LoginForm } from '../../Forms/Login';
import styles from './Navbar.module.css';
import styled from 'styled-components';
import { showModal, setCurrentModal } from '../../store/modal';

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
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

const SearchBar = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 580px;
    height: 30px;
    background-color: white;
    border-radius: 50px;
    padding: 0px;
`;

const SearchInput = styled.input`
    width: 525px;
    height: 25px;
    font-family: motiva-sans,sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 12px;
    border: none;
`;

export const Navbar = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const showLoginModal = () => {
        dispatch(setCurrentModal(LoginForm));
        dispatch(showModal());
    };

    if(!sessionUser) {
        return (
            <Nav>
                <NavList>
                    <Logo dimension={"medium"} />
                    <NavLink to="/" exact={true} className={styles.link}>Mealize</NavLink>
                    <SearchBar>
                        <MagnifyingGlass />
                        <SearchInput placeholder='Search...'></SearchInput>
                    </SearchBar>
                    <AuthButton action={'Log in'} onClick={showLoginModal} />
                    <AuthButton action={'Sign up'} onClick={showLoginModal} />
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
                    <div>Profile</div>
                    <div>Inbox</div>
                    <div>Norifications</div>
                    <div>Post</div>
                </NavList>
            </Nav>
        )
    }

}
