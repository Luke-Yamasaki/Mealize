import { useTheme } from '../../../Context/ThemeContext';
//Components
import { CustomizationContainer, ContentContainer, Label } from '../../Styled/Light/Customization';
import { DarkCustomizationContainer, DarkContentContainer, DarkLabel} from '../../Styled/Dark/Customization';

import { Theme } from './Theme';
import { Color } from './Color';
import { Contrast } from './Contrast';
import { Saturation } from './Saturation';
import { BackGround } from './BackGround';

export const CustomizationSection = () => {
    const {theme} = useTheme();

    return (
        <>
            {theme === 'light' ?
                (
                    <CustomizationContainer>
                        <ContentContainer>
                            <Label>Customization tools</Label>
                        </ContentContainer>
                        <Theme />
                        <Color />
                        <Contrast />
                        <Saturation />
                        <BackGround />
                    </CustomizationContainer>
                )
                :
                (
                    <DarkCustomizationContainer>
                        <DarkContentContainer>
                            <DarkLabel>Customization tools</DarkLabel>
                        </DarkContentContainer>
                        <Theme />
                        <Color />
                        <Contrast />
                        <Saturation />
                        <BackGround />
                    </DarkCustomizationContainer>
                )
            }
        </>
    )
};
