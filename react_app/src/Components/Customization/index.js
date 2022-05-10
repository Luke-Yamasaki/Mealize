//Hooks
import { useState, useEffect } from 'react';
import { useTheme } from '../../Context/ThemeContext';

//Components
import { Settings } from '../../Assets/Icons/Settings';
import { SettingsBox } from '../Styled/Customization';

//Animation
import { goUp, goDown } from '../Styled/Customization';


export const Customization = () => {
    const [count, setCount] = useState(0);
    const {theme} = useTheme();

    return (
        <SettingsBox id='settingsBox' animation={count > 0 && count % 2 === 1 ? goUp : count > 0 && count % 2 === 0 ? goDown : ''} theme={theme} onClick={() => setCount(count + 1)}>
            <Settings theme={theme} />
        </SettingsBox>
    )
}
