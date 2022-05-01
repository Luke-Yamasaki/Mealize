import { useTheme } from '../../../../Context/ThemeContext';
import { useColor } from '../../../../Context/ColorContext';

import { ContentContainer, Label, IconBox } from '../../../Styled/Light/Customization';
import { DarkContentContainer, DarkLabel } from '../../../Styled/Dark/Customization';

export const Color = () => {
    const {color, setColor} = useColor();
    const {theme} = useTheme();

    return (
        <>
            {theme === 'light' ?
                (
                    <ContentContainer onClick={() => setColor(!color)}>
                        <IconBox></IconBox>
                        <Label>Color</Label>
                    </ContentContainer>
                )
                :
                (
                    <DarkContentContainer onClick={() => setColor(!color)}>
                        <IconBox></IconBox>
                        <DarkLabel>Color</DarkLabel>
                    </DarkContentContainer>
                )
            }
        </>
    )
};
