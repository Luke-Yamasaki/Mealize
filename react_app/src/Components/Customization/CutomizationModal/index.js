import { useDispatch } from 'react-redux';
import { hideModal } from '../../../store/modal';
import { CustomizationSection } from '../CustomizationSection';
import { BackGround, SettingsModalField } from '../../Styled/Light/Modals';
export const CustomizationModal = () => {
    const dispatch = useDispatch();

    const closeModal = () => {
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
