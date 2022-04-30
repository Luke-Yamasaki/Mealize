import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './SessionNavbar.module.css';
// Actions
import { logout } from '../../store/session';
import { setCurrentModal, showModal } from '../../store/modal';
// Components
import { Nav, NavList } from '../Styled/Navbar';
import { NotificationBar } from '../NotificationBar';
import { Logo } from '../../Assets/Logo';
import { Searchbar } from '../Searchbar';
import ItemForm from '../../Forms/Item';

export const SessionNavbar = () => {
    const sessionUser = useSelector(state => state.session.user);
    const organization = useSelector(state => sessionUser.isNonprofit? state.organizations.nonprofits[sessionUser.organizationId] : state.organizations.businesses[sessionUser.organizationId]);
    const dispatch = useDispatch();

    const showItemForm = () => {
        dispatch(setCurrentModal(ItemForm));
        dispatch(showModal());
    };

    const logOut = () => {
        dispatch(logout())
    };

    return (
        <div>
            <Nav>
                <NavList>
                    <Logo dimension={"medium"} />
                    <NavLink to="/" exact={true} className={styles.link}>Mealize</NavLink>
                    <Searchbar />
                    <div className={styles.signup}>User</div>
                    <NavLink style={{textDecoration: 'none'}} to='/deliveries' exact className={styles.signup}>Deliveries</NavLink>
                    {sessionUser.isNonprofit && sessionUser.isManager ?
                    <div style={{width: '100px'}} className={styles.signup} onClick={showItemForm}>New request</div>
                    :
                    <div className={styles.signup} onClick={showItemForm}>Post item</div>
                    }
                    <div className={styles.signup} onClick={logOut}>Log out</div>
                </NavList>
            </Nav>
            <NotificationBar />
        </div>
    )
}
