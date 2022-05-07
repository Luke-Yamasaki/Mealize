//Hooks
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '../../Context/ThemeContext';
import { useModal } from '../../Context/ModalContext';
//store
import { setCurrentModal, showModal } from '../../store/modal';

//Components
import { CustomizationModal } from './CutomizationModal';
import { Settings } from '../../Assets/Icons/Settings';
import { SettingsBox } from '../Styled/Customization';


export const Customization = () => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    const {theme} = useTheme();
    const {modalName, setModalName} = useModal();

    const handleClick = () => {
        setCount(count + 1);
        setModalName('settings');
        dispatch(setCurrentModal(() => (<CustomizationModal />)));
        dispatch(showModal());
    };

    return (
        <SettingsBox shown={count > 0 && modalName === 'settings' ? 'goUp' :  count > 0 && modalName === '' ? 'goDown' : 'none' } theme={theme} onClick={handleClick}>
            <Settings theme={theme} />
        </SettingsBox>
    )
}
