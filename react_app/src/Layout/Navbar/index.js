import { showModal, setCurrentModal } from '../../store/modal';
//components
import { Logo } from '../../Assets/Logo';
import { useDispatch } from "react-redux";
import { LoginForm } from '../../Forms/Login';
import { SignupForm } from '../../Forms/Signup';
import { SearchBar } from './SearchBar';
import { Navigation, NavList, LogoBox, AuthBox, StyledNavLink } from '../Styled/Navbar';
import { AuthButton } from '../../Components/Buttons/Authentication';

export const Navbar = () => {
    const dispatch = useDispatch();

    const showLoginModal = () => {
        dispatch(setCurrentModal(LoginForm));
        dispatch(showModal());
    };

    const showSignupModal = () => {
        dispatch(setCurrentModal(SignupForm));
        dispatch(showModal());
    };

    return (
        <Navigation>
            <NavList>
                <LogoBox>
                    <Logo dimension={"medium"} />
                    <StyledNavLink to="/" exact={true}>Mealize</StyledNavLink>
                </LogoBox>
                <SearchBar />
                <AuthBox>
                    <AuthButton action={'Sign up'} onClick={showSignupModal}/>
                    <AuthButton action={'Log in'} onClick={showLoginModal}/>
                </AuthBox>
            </NavList>
        </Navigation>
    )
}
