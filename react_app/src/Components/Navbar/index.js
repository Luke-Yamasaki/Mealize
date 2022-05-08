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
import { NavBar, Navigation, NavList, LogoBox, LogoContainer, AuthBox, StyledNavLink } from '../Styled/Navbar';


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
                        <LogoContainer>
                            <Logo theme={theme}/>
                        </LogoContainer>
                        <StyledNavLink theme={theme} to="/" exact={true}>Mealize</StyledNavLink>
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
}
