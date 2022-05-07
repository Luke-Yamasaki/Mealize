import { useTheme } from '../../../Context/ThemeContext';
//Components
import { CustomizationContainer, ContentContainer, Label } from '../../Styled/Customization';

import { Theme } from './Theme';
import { Color } from './Color';
import { Contrast } from './Contrast';
import { Saturation } from './Saturation';
import { BackGround } from './BackGround';

export const CustomizationSection = () => {
    const {theme} = useTheme();


    return (
        <CustomizationContainer theme={theme}>
            <ContentContainer theme={theme}>
                <Label theme={theme}>Customization tools</Label>
            </ContentContainer>
            <Theme />
            <Color />
            <Contrast />
            <Saturation />
            <BackGround />
        </CustomizationContainer>
    )
};
