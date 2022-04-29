import { useSelector } from 'react-redux';
import styles from './Users.module.css';
import { UserIdCard } from '../../Components/UserIdCard';

export const Users = () => {
    const users = useSelector(state => state.users);
    const usersArr = Object.values(users)
    return (
        <div className={styles.hi}>
            {usersArr.map((user, idx) => (
                <UserIdCard key={idx} user={user} />
            ))}
        </div>
    )
};
