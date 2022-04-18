import styles from './AuthButton.module.css';

export const AuthButton = ({ action }) => {

    return (
        <div className={action === 'login' ? styles.login : styles.signup}>{action}</div>
    )
};


