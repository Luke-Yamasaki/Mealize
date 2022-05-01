import { useTheme } from '../../../../Context/ThemeContext';
import { useContrast } from '../../../../Context/ContrastContext';

import { LightContentContainer, DarkContentContainer, LightLabel, DarkLabel, IconBox } from '../../../Styled/Customization';

export const Contrast = () => {
    const {contrast, setContrast} = useContrast();
    const {theme} = useTheme();

    return (
        <>
            {theme === 'light' ?
                (
                    <LightContentContainer onClick={() => setContrast(!contrast)}>
                        <IconBox></IconBox>
                        <LightLabel>Contrast</LightLabel>
                    </LightContentContainer>
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
