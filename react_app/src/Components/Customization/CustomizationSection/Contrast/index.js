import { useTheme } from '../../../../Context/ThemeContext';
import { useContrast } from '../../../../Context/ContrastContext';

import { ContentContainer, Label, IconBox } from '../../../Styled/Light/Customization';
import { DarkContentContainer, DarkLabel } from '../../../Styled/Dark/Customization';

export const Contrast = () => {
    const {contrast, setContrast} = useContrast();
    const {theme} = useTheme();

    return (
        <>
            {theme === 'light' ?
                (
                    <ContentContainer onClick={() => setContrast(!contrast)}>
                        <IconBox></IconBox>
                        <Label>Contrast</Label>
                    </ContentContainer>
                )
                :
                (
                    <DarkContentContainer onClick={() => setContrast(!contrast)}>
                        <IconBox></IconBox>
                        <DarkLabel>Contrast</DarkLabel>
                    </DarkContentContainer>
                )
            }

        </>
    )
};
