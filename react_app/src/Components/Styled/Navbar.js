import styled from 'styled-components';

export const Nav = styled.nav`
    min-width: 700px;
    width: 56.2vw;
    max-width: 1600px;
    height: 60px;
    background: linear-gradient(#76D97E, #28A690);
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
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

export const SearchBar = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 400px;
    height: 30px;
    background-color: white;
    border-radius: 50px;
    padding-left: 0.15rem;
    gap: 0.1rem;
`;

export const SearchInput = styled.input`
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
