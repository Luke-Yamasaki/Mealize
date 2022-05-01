import { useTheme } from '../../../../Context/ThemeContext';

import { ContentContainer, Label, IconBox } from '../../../Styled/Light/Customization';
import { DarkContentContainer, DarkLabel } from '../../../Styled/Dark/Customization';

export const Theme = () => {
    const {theme, setTheme} = useTheme();

    return (
        <>
            {theme === 'light' ?
                (
                    <ContentContainer onClick={() => setTheme('dark')}>
                        <IconBox></IconBox>
                        <Label>Theme</Label>
                    </ContentContainer>
                )
                :
                (
                    <DarkContentContainer onClick={() => setTheme('light')}>
                        <IconBox></IconBox>
                        <DarkLabel>Theme</DarkLabel>
                    </DarkContentContainer>
                )
            }
        </>
    )
};
