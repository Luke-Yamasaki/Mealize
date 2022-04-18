import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo';
import { MagnifyingGlass } from '../../Assets/Icons/MagnifyingGlass';
import styles from './Navbar.module.css';
import styled from 'styled-components';

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
    return (
        <Nav>
            <NavList>
                <Logo dimension={"medium"} />
                <NavLink to="/" className={styles.link}>Mealize</NavLink>
                <SearchBar>
                    <MagnifyingGlass />
                    <SearchInput placeholder='Search...'></SearchInput>
                </SearchBar>
                <NavLink to='/login'>Log in</NavLink>
                <NavLink to='/signup'>Sign up</NavLink>
            </NavList>
        </Nav>
    )
}
