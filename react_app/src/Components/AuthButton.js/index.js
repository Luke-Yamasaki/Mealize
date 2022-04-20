import { useDispatch } from 'react-redux';
import styles from './AuthButton.module.css';
import { LoginForm } from '../../Forms/Login';
import { showModal, setCurrentModal } from '../../store/modal';

export const AuthButton = ({ action }) => {
    const dispatch = useDispatch();

    const showLoginModal = () => {
        dispatch(setCurrentModal(LoginForm));
        dispatch(showModal());
    };

    if(action === 'Log in') {
        return (
            <div role='button' className={styles.login} onClick={showLoginModal}>{action}</div>
        )
    } else if(action === 'Sign up') {
        return (
            <div role='button' className={styles.signup}>{action}</div>
        )
    } else if(action === 'Submit') {
        return (
            <div role='button' className={styles.submit}>{action}</div>
        )
    } else if(action === 'Cancel') {
        return (
            <div role='button' className={styles.cancel}>{action}</div>
        )
    } else if(action === 'Nonprofit demo') {
        return (
            <div role='button' className={styles.nonprofit}>{action}</div>
        )
    } else if(action === 'Business demo') {
        return (
            <div role='button' className={styles.business}>{action}</div>
        )
    } else {
        return (
            <div role='button' className={styles.business}>{action}</div>
        )
    }

};