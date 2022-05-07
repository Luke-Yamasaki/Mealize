import { useTheme } from '../../../../Context/ThemeContext';
import { useColor } from '../../../../Context/ColorContext';

import { ContentContainer, Label, IconContainer } from '../../../Styled/Customization';

export const Color = () => {
    const {color, setColor} = useColor();
    const {theme} = useTheme();

    return (
        <ContentContainer  theme={theme} onClick={() => setColor(!color)}>
            <IconContainer></IconContainer>
            <Label theme={theme} >Color</Label>
        </ContentContainer>
    )
};
