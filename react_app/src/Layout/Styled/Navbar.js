import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { IconBox } from '../../Components/Styled/Layout';

export const StyledNavLink = styled(NavLink)`
    color: white;
    text-decoration: none;
    font-family: motiva-sans, sans-serif;
    font-weight: 900;
    font-style: normal;
    font-size: 28px;
    margin-top: 7px;
`;

export const Navigation = styled.nav`
    min-width: 700px;
    max-width: 1600px;
    width: 100em;
    height: 60px;
    background: linear-gradient(#76D97E, #28A690);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    will-change: transform;
    z-index: 200;
`;

export const NavList = styled.ul`
    width: 56.2vw;
    max-width: 1700px;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const Searchbar = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    max-width: 27.5vw;
    width:  27.5vw;
    min-width:  30vw;
    height: 30px;
    background-color: white;
    border-radius: 50px;
    padding-left: 0.5rem;
    gap: 0.1rem;
`;

export const SearchInput = styled.input`
    width: 27.5vw;
    height: 25px;
    font-family: motiva-sans,sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 12px;
    border: none;
    padding: 0px;
    margin: 0px;
    outline: none;
    font-size: 14px;
    text-align: center;
`;

export const MagnifyingContainer = styled(IconBox)`
    width: 20px;
    height: 20px;
`;

export const MicContainer = styled(IconBox)`
    width: 15px;
    height: 15px;
`;

export const KeyboardContainer = styled(IconBox)`
    width: 25px;
    height: 25px;
`;

export const LogoBox = styled.div`
    width: 165px;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const AuthBox = styled.div`
    width: 175px;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
