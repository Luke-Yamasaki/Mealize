import styles from './Navbar.module.css';
import { showModal, setCurrentModal } from '../../store/modal';
//components
import { NavLink } from 'react-router-dom';
import { Logo } from '../../Assets/Logo';
import { useDispatch } from "react-redux";
import { LoginForm } from '../../Forms/Login';
import { SignupForm } from '../../Forms/Signup';
import { Searchbar } from '../Searchbar';
import { Nav, NavList, LogoBox, AuthBox } from '../Styled/Navbar';


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
        <Nav>
            <NavList>
                <LogoBox>
                    <Logo dimension={"medium"} />
                    <NavLink to="/" exact={true} className={styles.link}>Mealize</NavLink>
                </LogoBox>
                <Searchbar />
                <AuthBox>
                     <div role='button' className={styles.signup} onClick={showSignupModal}>Sign up</div>
                     <div role='button' className={styles.login} onClick={showLoginModal}>Log in</div>
                </AuthBox>
            </NavList>
        </Nav>
    )
}
