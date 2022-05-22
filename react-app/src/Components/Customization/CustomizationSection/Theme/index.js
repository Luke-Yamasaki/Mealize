//Hooks
import { useTheme } from '../../../../Context/ThemeContext';
import { useState } from 'react';
//Components
import {
    ContentContainer,
    Label,
    IconContainer,
    ToggleBox,
    ToggleCircle,
    LabelToggleBox
} from '../../../Styled/Customization';

//Icons
import { SunIcon } from '../../../../Assets/Icons/Sun';
import { MoonIcon } from '../../../../Assets/Icons/Moon';

export const Theme = () => {
    const {theme, setTheme} = useTheme();
    const [selected, setSelected] = useState(false);

    const handleSelect = (e) => {
        e.preventDefault();
        setTheme(theme === 'light' ? 'dark' : 'light')
        setSelected(!selected);
    };

    return (
        <ContentContainer theme={theme} item='true'>
            <IconContainer background={theme === 'light' ? '#28A690' : '#005C4D'}>
                {theme === 'light' ? <SunIcon theme={theme} /> : <MoonIcon theme={theme} />}
            </IconContainer>
            <LabelToggleBox>
                <Label theme={theme}>Theme</Label>
                <ToggleBox theme={theme} selected={selected} direction={selected ? 'flex-end' : 'flex-start'}>
                    <ToggleCircle theme={theme} type='theme' onClick={handleSelect}/>
                </ToggleBox>
            </LabelToggleBox>
        </ContentContainer>
    )
};
