//Components
import { LightCustomizationContainer, DarkCustomizationContainer, LightContentContainer, DarkContentContainer, LightLabel, DarkLabel} from '../../Styled/Customization';
import { Theme } from './Theme';
import { Color } from './Color';
import { Contrast } from './Contrast';
import { Saturation } from './Saturation';
import { BackGround } from './BackGround';

export const CustomizationSection = ({theme}) => {

    theme === 'light' ?
    (
    <LightCustomizationContainer>
        <LightContentContainer>
            <LightLabel>Customization tools</LightLabel>
        </LightContentContainer>
        <LightContentContainer>
            <Theme />
        </LightContentContainer>
        <LightContentContainer>
            <Color />
        </LightContentContainer>
        <LightContentContainer>
            <Contrast />
        </LightContentContainer>
        <LightContentContainer>
            <Saturation />
        </LightContentContainer>
        <LightContentContainer>
            <BackGround />
        </LightContentContainer>
    </LightCustomizationContainer>
    )
    :
    (
    <DarkCustomizationContainer>
        <DarkContentContainer>
            <DarkLabel>Customization tools</DarkLabel>
        </DarkContentContainer>
        <DarkContentContainer>
            <Theme />
        </DarkContentContainer>
        <DarkContentContainer>
            <Color />
        </DarkContentContainer>
        <DarkContentContainer>
            <Contrast />
        </DarkContentContainer>
        <DarkContentContainer>
            <Saturation />
        </DarkContentContainer>
        <DarkContentContainer>
            <BackGround />
        </DarkContentContainer>
    </DarkCustomizationContainer>
    )
}
