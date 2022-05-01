import { useTheme } from '../../../../Context/ThemeContext';
import { useSaturation } from '../../../../Context/SaturationContext';

import { LightContentContainer, DarkContentContainer, LightLabel, DarkLabel, IconBox } from '../../../Styled/Customization';

export const Saturation = () => {
    const {saturation, setSaturation} = useSaturation();
    const {theme} = useTheme();

    return (
        <>
            {theme === 'light' ?
                (
                    <LightContentContainer onClick={() => setSaturation(!saturation)}>
                        <IconBox></IconBox>
                        <LightLabel>Saturation</LightLabel>
                    </LightContentContainer>
                )
                :
                (
                    <DarkContentContainer onClick={() => setSaturation(!saturation)}>
                        <IconBox></IconBox>
                        <DarkLabel>Saturation</DarkLabel>
                    </DarkContentContainer>
                )
            }
        </>
    )
};
