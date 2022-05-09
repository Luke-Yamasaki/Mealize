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
import { AuthButton } from '../../Components/Buttons/Authentication';
import { LoginForm } from '../../Forms/Login';
import { SignupForm } from '../../Forms/Signup';

//Styled-components
import { NavBar, Navigation, NavList, LogoBox, AuthBox, LogoNavLink } from '../Styled/Navbar';
import { MealizeLogoBox } from '../Styled/Layout';


export const Navbar = () => {
    const dispatch = useDispatch();
    const {theme} = useTheme();

    const showLoginModal = () => {
        dispatch(setCurrentModal(LoginForm));
        dispatch(showModal());
    };

    const showSignupModal = () => {
        dispatch(setCurrentModal(SignupForm));
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
                    <AuthBox>
                        <AuthButton action={'Sign up'} onClick={showSignupModal}/>
                        <AuthButton action={'Log in'} onClick={showLoginModal}/>
                    </AuthBox>
                </NavList>
            </Navigation>
            <NotificationBar />
        </NavBar>
    )
};
