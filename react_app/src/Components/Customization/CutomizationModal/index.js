//Hooks
import { useDispatch } from 'react-redux';
import { useModal } from '../../../Context/ModalContext';
//Actions
import { hideModal } from '../../../store/modal';
//Components
import { CustomizationSection } from '../CustomizationSection';
import { SettingsModalBackGround, SettingsModalField } from '../../Styled/Light/Modals';

export const CustomizationModal = () => {
    const dispatch = useDispatch();
    const {setModalName} = useModal();

    const closeModal = () => {
        setModalName('');
        dispatch(hideModal());
    };

    return (
        <SettingsModalBackGround onClick={closeModal}>
            <SettingsModalField onClick={e => e.stopPropagation()}>
                <CustomizationSection />
            </SettingsModalField>
        </SettingsModalBackGround>
    )
};
