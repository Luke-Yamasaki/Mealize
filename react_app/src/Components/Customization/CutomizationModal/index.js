import { useDispatch } from 'react-redux';
import { hideModal } from '../../../store/modal';
import { CustomizationSection } from '../CustomizationSection';
import { TransparentBackGround, ModalField } from '../../Styled/Modal';
export const CustomizationModal = () => {
    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(hideModal());
    };

    return (
        <TransparentBackGround onClick={closeModal}>
            <ModalField onClick={e => e.stopPropagation()}>
                <CustomizationSection />
            </ModalField>
        </TransparentBackGround>
    )
};
