import { useTheme } from '../../../Context/ThemeContext';
//Components
import { LightCustomizationContainer, DarkCustomizationContainer, LightContentContainer, DarkContentContainer, LightLabel, DarkLabel} from '../../Styled/Customization';
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
                    <LightCustomizationContainer>
                        <LightContentContainer>
                            <LightLabel>Customization tools</LightLabel>
                        </LightContentContainer>
                        <Theme />
                        <Color />
                        <Contrast />
                        <Saturation />
                        <BackGround />
                    </LightCustomizationContainer>
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
