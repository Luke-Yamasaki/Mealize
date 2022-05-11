import { useTheme } from '../../../../Context/ThemeContext';
import { useSaturation } from '../../../../Context/SaturationContext';

import { ContentContainer, Label, IconContainer } from '../../../Styled/Customization';

export const Saturation = () => {
    const {saturation, setSaturation} = useSaturation();
    const {theme} = useTheme();

    return (
        <ContentContainer  theme={theme} onClick={() => setSaturation(!saturation)}>
            <IconContainer></IconContainer>
            <Label theme={theme} >Saturation</Label>
        </ContentContainer>
    )
};
