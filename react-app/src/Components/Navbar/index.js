//Hooks
import { useTheme } from '../../Context/ThemeContext';
import { useDispatch } from "react-redux";

//Actions
import { showModal, setCurrentModal } from '../../store/modal';

//Logo
import { Logo } from '../../Assets/Logo';

//Components
import { NotificationBar } from './NotificationBar';
import { SearchBar } from './SearchBar';
import { LoginForm } from '../../Forms/Login';
import { SignupForm } from '../../Forms/Signup';

//Styled-components
import { NavBar, Navigation, NavList, LogoBox, AuthBox, LogoNavLink } from '../Styled/Navbar';
import { ButtonText, LoginButton, SignupButton } from '../Styled/Buttons';
import { MealizeLogoBox } from '../Styled/Layout';


export const Navbar = () => {
    const dispatch = useDispatch();
    const {theme} = useTheme();

    const showFormModal = (e) => {
        e.preventDefault();
        const formName = e.target.innerText;
        dispatch(setCurrentModal(formName.includes('Log in') ? LoginForm : SignupForm));
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
                        <SignupButton>
                            <ButtonText weight='800'>Sign up</ButtonText>
                        </SignupButton>
                        <LoginButton>
                            <ButtonText color='white' weight='500'>Log in</ButtonText>
                        </LoginButton>
                    </AuthBox>
                </NavList>
            </Navigation>
            <NotificationBar/>
        </NavBar>
    )
};
