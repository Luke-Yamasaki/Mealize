import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Black, Bold } from './Fonts';

export const NavBar = styled.div`
    background: linear-gradient(#76D97E, #28A690);
    max-width: 1336px;
    width: 100vw;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
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
    margin-top: 2px;
`;

export const Navigation = styled.nav`
    width: 100%;
    height: 100%;
    display: flex;
`;

export const NavList = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0px 25px 0px 25px;
    gap: 10px;
`;

export const Searchbar = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    max-width: 500px;
    width: 30vw;
    min-width: 300px;
    height: 30px;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    border-radius: 50px;
    padding-left: 5px;
    padding-right: ${props => props.mic === 'true' ? '10px' : '0px'};
    gap: 5px;
`;

export const SearchInput = styled.input`
    max-width: 400px;
    width: 26vw;
    min-width: 235px;
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
    width: ${props => props.width ? props.width : '150px'};
    height: 50px;
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
    font-size: 14px;
`;

export const NavIconContainer = styled.div`
    width: 250px;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const GradientLogoType = styled(Black)`
    width: 100px;
    height: 30px;
    font-size: 18px;
    background: -webkit-linear-gradient(#28A690,#76D97E);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    justify-content: center;
    display: ${props => props.entering ? 'none' : 'flex'};
    align-items: center;
    position: absolute;
    margin-left: calc(27% - 100px);
    @media only screen and (max-width: 1650px) {
        margin-left: 11.5vw;
    }
`;

export const NavIconBoxes = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.selected ? 'rgba(0, 0, 0, 0.1)' : 'none'};
    &:hover {
        background-color: rgba(0, 0, 0, 0.3);
    }
`;

export const DropDownContainer = styled.div`
    width: 50px;
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.selected ? 'rgba(0, 0, 0, 0.3)' : 'none'};
    &:hover {
        background-color: rgba(0, 0, 0, 0.3);
    }
`;
