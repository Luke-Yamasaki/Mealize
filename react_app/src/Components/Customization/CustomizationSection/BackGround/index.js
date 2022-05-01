import { useTheme } from '../../../../Context/ThemeContext';
import { useBackGround } from '../../../../Context/BackGroundContext';

import { ContentContainer, Label, IconBox } from '../../../Styled/Light/Customization';
import { DarkContentContainer, DarkLabel } from '../../../Styled/Dark/Customization';

export const BackGround = () => {
    const {backGround, setBackGround} = useBackGround();
    const {theme} = useTheme();

    return (
        <>
            {theme === 'light' ?
                (
                    <ContentContainer onClick={() => setBackGround(!backGround)}>
                        <IconBox></IconBox>
                        <Label>BackGround</Label>
                    </ContentContainer>
                )
                :
                (
                    <DarkContentContainer onClick={() => setBackGround(!backGround)}>
                        <IconBox></IconBox>
                        <DarkLabel>BackGround</DarkLabel>
                    </DarkContentContainer>
                )
            }
        </>
    )
};
