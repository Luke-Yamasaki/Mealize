import { useTheme } from '../../../../Context/ThemeContext';
import { useBackGround } from '../../../../Context/BackGroundContext';

import { ContentContainer, Label, IconContainer } from '../../../Styled/Customization';

export const BackGround = () => {
    const {backGround, setBackGround} = useBackGround();
    const {theme} = useTheme();

    return (
        <ContentContainer  theme={theme} onClick={() => setBackGround(!backGround)}>
            <IconContainer></IconContainer>
            <Label theme={theme}>Background image</Label>
        </ContentContainer>
    )
};
