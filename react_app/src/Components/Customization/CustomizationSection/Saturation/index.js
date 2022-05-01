import { useTheme } from '../../../../Context/ThemeContext';
import { useSaturation } from '../../../../Context/SaturationContext';

import { ContentContainer, Label, IconBox } from '../../../Styled/Light/Customization';
import { DarkContentContainer, DarkLabel } from '../../../Styled/Dark/Customization';

export const Saturation = () => {
    const {saturation, setSaturation} = useSaturation();
    const {theme} = useTheme();

    return (
        <>
            {theme === 'light' ?
                (
                    <ContentContainer onClick={() => setSaturation(!saturation)}>
                        <IconBox></IconBox>
                        <Label>Saturation</Label>
                    </ContentContainer>
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
