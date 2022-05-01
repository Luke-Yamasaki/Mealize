import { useTheme } from '../../../../Context/ThemeContext';
import { useColor } from '../../../../Context/ColorContext';

import { LightContentContainer, DarkContentContainer, LightLabel, DarkLabel, IconBox } from '../../../Styled/Customization';

export const Color = () => {
    const {color, setColor} = useColor();
    const {theme} = useTheme();

    return (
        <>
            {theme === 'light' ?
                (
                    <LightContentContainer onClick={() => setColor(!color)}>
                        <IconBox></IconBox>
                        <LightLabel>Color</LightLabel>
                    </LightContentContainer>
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
