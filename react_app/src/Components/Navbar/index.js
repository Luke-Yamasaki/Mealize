//Hooks
import { useState } from 'react';
import { useTheme } from '../../Context/ThemeContext';
import { useDispatch } from "react-redux";
import { useModal } from '../../Context/ModalContext';

//Actions
import { showModal, setCurrentModal } from '../../store/modal';

//Logo
import { Logo } from '../../Assets/Logo';

//Components
import { NotificationBar } from './NotificationBar';
import { SearchBar } from './SearchBar';
import { AuthButton } from '../../Components/Buttons/Authentication';
import { FormModal } from '../../Forms/FormModal';

//Styled-components
import { NavBar, Navigation, NavList, LogoBox, AuthBox, LogoNavLink } from '../Styled/Navbar';
import { MealizeLogoBox } from '../Styled/Layout';


export const Navbar = () => {
    const dispatch = useDispatch();
    const {theme} = useTheme();
    const {setModalName} = useModal();

    const showFormModal = (e) => {
        e.preventDefault();
        const formName = e.target.innerText.toLowerCase().split(' ').join('');
        setModalName(formName);
        dispatch(setCurrentModal(() => (<FormModal />)));
        dispatch(showModal());
    };

    return (
        <NavBar>
            <Navigation>
                <NavList>
                    <LogoBox>
                        <MealizeLogoBox square='45px'>
                            <Logo theme={theme}/>
                        </MealizeLogoBox>
                        <LogoNavLink theme={theme} to="/" exact={true}>Mealize</LogoNavLink>
                    </LogoBox>
                    <SearchBar/>
                    <AuthBox onClick={showFormModal}>
                        <AuthButton action={'Sign up'}/>
                        <AuthButton action={'Log in'}/>
                    </AuthBox>
                </NavList>
            </Navigation>
            <NotificationBar />
        </NavBar>
    )
};
