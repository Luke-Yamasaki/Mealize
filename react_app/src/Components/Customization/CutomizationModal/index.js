//Hooks
import { useDispatch } from 'react-redux';
import { useModal } from '../../../Context/ModalContext';
//Actions
import { hideModal } from '../../../store/modal';
//Components
import { CustomizationSection } from '../CustomizationSection';
import { BackGround, SettingsModalField } from '../../Styled/Light/Modals';

export const CustomizationModal = () => {
    const dispatch = useDispatch();
    const {setModalName} = useModal();

    const closeModal = () => {
        setModalName('');
        dispatch(hideModal());
    };

    return (
        <BackGround onClick={closeModal}>
            <SettingsModalField onClick={e => e.stopPropagation()}>
                <CustomizationSection />
            </SettingsModalField>
        </BackGround>
    )
};
