import { useTheme } from '../../../../Context/ThemeContext';

import { LightContentContainer, DarkContentContainer, LightLabel, DarkLabel, IconBox } from '../../../Styled/Customization';

export const Theme = () => {
    const {theme, setTheme} = useTheme();

    theme === 'light' ?
    (
        <LightContentContainer onClick={() => setTheme('dark')}>
            <IconBox></IconBox>
            <LightLabel>Theme</LightLabel>
        </LightContentContainer>
    )
    :
    (
        <DarkContentContainer onClick={() => setTheme('light')}>
            <IconBox></IconBox>
            <DarkLabel>Theme</DarkLabel>
        </DarkContentContainer>
    )
}
