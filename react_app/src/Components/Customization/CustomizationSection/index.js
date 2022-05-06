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
        <CustomizationContainer borderColor={theme === 'light' ? '#D5D5D5' :  '#616161'} color={theme === 'light' ? 'black' : 'white'} backgroundColor={theme === 'light' ? 'white' : '#191919'}>
            <ContentContainer borderBottom={theme === 'light' ? '1px solid #D5D5D5' : '1px solid #616161'}>
                <Label color={theme === 'light' ? 'black' : 'white'}>Customization tools</Label>
            </ContentContainer>
            <Theme />
            <Color />
            <Contrast />
            <Saturation />
            <BackGround />
        </CustomizationContainer>
    )
};
