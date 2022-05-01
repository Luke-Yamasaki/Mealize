//Imports
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

//store
import { setCurrentModal, showModal } from '../../store/modal';

//Context
import { useTheme } from '../../Context/ThemeContext';

//Components
import { CustomizationSection } from './CustomizationSection';
import { Settings } from '../../Assets/Icons/Settings';

//Styled-componenets
const SettingsBox = styled.div`
    width: 60px;
    height: 60px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px;
    padding: 0px;
    margin-top: 50vh;
    margin-left: 80vw;
`;

const HelperButton = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: ${props => props.theme === 'light' ? '#327647' : '#76D97E' };
`;

export const Customization = () => {
    const dispatch = useDispatch();
    const {theme} = useTheme();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(setCurrentModal(() => (<CustomizationSection theme={theme} />)));
        dispatch(showModal());
    };

    return (
        <SettingsBox>
            <HelperButton theme={theme} onClick={handleClick}>
                <Settings theme={theme} />
            </HelperButton>
        </SettingsBox>
    )
}
