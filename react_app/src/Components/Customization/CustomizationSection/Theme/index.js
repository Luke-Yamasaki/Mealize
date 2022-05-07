import { useTheme } from '../../../../Context/ThemeContext';

import { ContentContainer, Label, IconContainer } from '../../../Styled/Customization';

export const Theme = () => {
    const {theme, setTheme} = useTheme();

    return (
        <ContentContainer theme={theme} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            <IconContainer></IconContainer>
            <Label theme={theme}>Theme</Label>
        </ContentContainer>
    )
};
