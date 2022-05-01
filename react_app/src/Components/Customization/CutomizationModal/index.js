import { useDispatch } from 'react-redux';
import styles from './CustomizationModal.module.css';
import { hideModal } from '../../../store/modal';
import { CustomizationSection } from '../CustomizationSection';

export const CustomizationModal = () => {
    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(hideModal());
    };

    return (
        <div className={styles.background} onClick={closeModal}>
            <div className={styles.content} onClick={e => e.stopPropagation()}>
                <CustomizationSection />
            </div>
        </div>
    )
};
