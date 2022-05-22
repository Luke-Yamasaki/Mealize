//Hooks
import { useTheme } from '../../../Context/ThemeContext';

//Components
import { CustomizationContainer, ContentContainer, Label } from '../../Styled/Customization';

import { Theme } from './Theme';
// import { Color } from './Color';
// import { Contrast } from './Contrast';
// import { Saturation } from './Saturation';
import { BackGround } from './BackGround';

export const CustomizationSection = ({animation}) => {
    const {theme} = useTheme();

    return (
        <CustomizationContainer theme={theme} animation={animation}>
            <ContentContainer theme={theme}>
                <Label theme={theme} margin='75px'>Customization tools</Label>
            </ContentContainer>
            <Theme />
            {/* <Color />
            <Contrast />
            <Saturation /> */}
            <BackGround />
        </CustomizationContainer>
    )
};
