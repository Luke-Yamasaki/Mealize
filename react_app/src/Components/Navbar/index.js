import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';


export const Navbar = () => {
    return (
        <nav className={styles.background}>
            <ul>
                <li><svg></svg></li>
                <li><svg></svg></li>
            </ul>
        </nav>
    )
}
