import { useTheme } from '../../../../Context/ThemeContext';
import { useContrast } from '../../../../Context/ContrastContext';

import { ContentContainer, Label, IconContainer } from '../../../Styled/Customization';

export const Contrast = () => {
    const {contrast, setContrast} = useContrast();
    const {theme} = useTheme();

    return (
        <ContentContainer  theme={theme} onClick={() => setContrast(!contrast)}>
            <IconContainer></IconContainer>
            <Label theme={theme} >Contrast</Label>
        </ContentContainer>
    )
};
