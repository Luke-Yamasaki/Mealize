import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './SessionNavbar.module.css';

// Actions
import { logout } from '../../store/session';
import { setCurrentModal, showModal } from '../../store/modal';
// Components
import { Nav, NavList } from '../Styled/Navbar';
import { Logo } from '../../Assets/Logo';
import { Searchbar } from '../Searchbar';
import ItemForm from '../../Forms/Item';

export const SessionNavbar = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const showItemForm = () => {
        dispatch(setCurrentModal(ItemForm));
        dispatch(showModal());
    };

    const logOut = () => {
        dispatch(logout())
    }

    return (
        <Nav>
            <NavList>
                <Logo dimension={"medium"} />
                <NavLink to="/" exact={true} className={styles.link}>Mealize</NavLink>
                <Searchbar />
                <div className={styles.signup}>User</div>
                <div className={styles.signup}>Inbox</div>
                <div className={styles.signup}>Notifications</div>
                {sessionUser.isNonprofit ?
                <div className={styles.signup} onClick={showItemForm}>New request</div>
                :
                <div className={styles.signup} onClick={showItemForm}>Post item</div>
                }
                <div className={styles.signup} onClick={logOut}>Log out</div>
            </NavList>
        </Nav>
    )
}
