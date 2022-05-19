import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Bold } from './Fonts';

export const NavBar = styled.div`
    width: 1600px;
    height: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    margin-top: -1px;
    will-change: transform;
    z-index: 200;
`;

export const LogoNavLink = styled(NavLink)`
    color: ${props => props.theme === 'light' ? '#FFFFFF' : '#191919'};
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
`;

export const NavList = styled.div`
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
    width: 600px;
    height: 30px;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    border-radius: 50px;
    padding-left: 0.5rem;
    gap: 0.1rem;
`;

export const SearchInput = styled.input`
    width: 90%;
    font-family: motiva-sans,sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 12px;
    border: none;
    padding: 0px;
    margin: 0px;
    outline: none;
    font-size: 14px;
    padding-left: 10px;
    background-color: ${props => props.theme === 'light' ? '#FFFFFF' : '#191919'};
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

export const SearchSubmitInput = styled.input`
    display: none;
`;

export const ResetSearchBox = styled.div`
    display: ${props => props.entering ? 'flex' : 'none'};
    width: 20px;
    height: 20px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const LogoBox = styled.div`
    width: ${props => props.width ? props.width : '165px'};
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
`;

export const AuthBox = styled.div`
    width: 175px;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const ProfileBox = styled(AuthBox)`
    height: 30px;
    gap: 5px;
`;

export const ProfileName = styled(Bold)`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 200px;
    height: 25px;
    padding-top: 5px;
    color: ${props => props.theme === 'light' ? '#FFFFFF' : '#191919'};
`;
