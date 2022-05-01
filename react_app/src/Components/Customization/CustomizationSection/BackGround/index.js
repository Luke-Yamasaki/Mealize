import { useTheme } from '../../../../Context/ThemeContext';
import { useBackGround } from '../../../../Context/BackGroundContext';

import { LightContentContainer, DarkContentContainer, LightLabel, DarkLabel, IconBox } from '../../../Styled/Customization';

export const BackGround = () => {
    const {backGround, setBackGround} = useBackGround();
    const {theme} = useTheme();

    return (
        <>
            {theme === 'light' ?
                (
                    <LightContentContainer onClick={() => setBackGround(!backGround)}>
                        <IconBox></IconBox>
                        <LightLabel>BackGround</LightLabel>
                    </LightContentContainer>
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
