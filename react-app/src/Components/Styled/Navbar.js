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
    width: ${props => props.guest ? 'calc(100% - 100px)' : '100%'};
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.guest ? 'space-between' : 'flex-start'};
    align-items: center;
    padding: ${props => props.guest ? '0px 50px 0px 50px' : '0px 25px 0px 25px' };
    gap: 10px;
`;

export const Searchbar = styled.form`
    position: relative;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    max-width: 600px;
    width: 40vw;
    min-width: 225px;
    height: 30px;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    border-radius: 50px;
    padding-left: 5px;
    padding-right: ${props => props.mic === 'true' ? '10px' : '0px'};
    gap: 5px;
    @media only screen and (max-width: 700px) {
        display: none;
    }
`;

export const SearchInput = styled.input`
    max-width: 530px;
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
    @media only screen and (max-width: 1780px) {
        width: 85%;
    }
    @media only screen and (max-width: 1500px) {
        width: 83%;
    }
    @media only screen and (max-width: 1336px) {
        width: 80%;
    }
    @media only screen and (max-width: 1150px) {
        width: 78%;
    }
    @media only screen and (max-width: 1000px) {
        width: 76%;
    }
    @media only screen and (max-width: 900px) {
        width: 72%;
    }
    @media only screen and (max-width: 750px) {
        width: 70%;
    }
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
    width: ${props => props.width ? props.width : '160px'};
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
    width: 150px;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const SmallNavIconContainer = styled(NavIconContainer)`
    width: 100px;
`;

export const GradientLogoType = styled(Black)`
    width: 100px;
    height: 30px;
    font-size: 18px;
    background: -webkit-linear-gradient(#28A690,#76D97E);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: ${props => props.entering ? 'none' : 'flex'};
    align-items: center;
    justify-content: center;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    @media only screen and (max-width: 750px) {
        display: none;
    }
`;

export const NavIconBoxes = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.isSelected ? 'rgba(0, 0, 0, 0.1)' : 'none'};
    cursor: pointer;
    font-family: motiva-sans, sans-serif;
    font-size: 14px;
    color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    &:hover {
        background-color: rgba(0, 0, 0, 0.3);
    };
    &:hover:after {
        content: ${props => props.content === 'H' ?
        "'Home'" :
        props.content === 'D' ?
        "'Deliveries'" :
        props.content === 'M' ?
        "'Messages'" :
        props.content === 'Y' ?
        "'Your info'" :
        "'Settings'"
        };
        position: absolute;
        margin-top: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: ${props => props.content === 'H' ? '65px' : props.content === 'D' || props.content === 'M' ? '80px' : '75px'};
        height: 20px;
        background-color: ${props => props.theme === 'light' ? '#191919' : 'white'};
        border-radius: 30px;
    };
`;

export const DropDownContainer = styled.div`
    width: ${props => props.type === 'settings' ? '200px' : '160px'};
    height: ${props => props.type === 'settings' ? '180px' : '160px'};
    position: absolute;
    margin: ${props => props.type === 'settings' ? '240px 0px 0px -30px' : '220px 0px 0px -60px'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 5px;
    z-index: 91;
    filter: ${props => props.theme === 'light' ? 'drop-shadow(0px 0px 1px #191919)' : 'drop-shadow(0px 0px 1px #191919)'};
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    font-family: motiva-sans, sans-serif;
    &:before {
        content: "";
        width: 0px;
        height: 0px;
        position: absolute;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid transparent;
        border-bottom: ${props => props.theme === 'light' ? "12px solid white" : "12px solid #191919"};
        top: -22px;
        z-index: 90;
        filter: ${props => props.theme === 'light' ? 'drop-shadow(0px 0px 0.1px #191919)' : 'drop-shadow(0px 0px 0.1px #191919)'};    }
`;

export const DropDownMenu = styled.menu`
    width: ${props => props.type === 'settings' ? '200px' : '140px'};
    height: ${props => props.type === 'settings' ? '200px' : '160px'};
    margin-top: ${props => props.type === 'settings' ? '25px' : '0px'};
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

export const DropDownItem = styled.li`
    margin: 0px;
    list-style: none;
    width: calc(100% - 10px);
    height: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 0px 5px 0px 5px;
    cursor: pointer;
    background-color: blue;
`;

export const MenuItemBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 25px;
    text-decoration: ${props => props.underline ? 'underline' : ''};
`;

export const LogOutButton = styled.div`
    width: 75px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background-color: darkgreen;
    border-color: lightgreen;
    color: white;
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.1px;
`;
