import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';


export const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li style={{listStyle: 'none'}}><svg></svg></li>
                <li style={{listStyle: 'none'}}><svg></svg></li>
            </ul>
        </nav>
    )
}
