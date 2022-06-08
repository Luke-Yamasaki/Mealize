//Hooks
import { useState } from 'react';
import { useTheme } from '../../../../Context/ThemeContext';
import { useBackGround } from '../../../../Context/BackGroundContext';

//Components
import {
    ContentContainer,
    Label,
    IconContainer,
    ToggleBox,
    ToggleCircle,
    LabelToggleBox
} from '../../../Styled/Customization';

//Icons
import { ImageIcon } from '../../../../Assets/Icons/Image';

export const BackGround = () => {
    const {backGround, setBackGround} = useBackGround();
    const {theme} = useTheme();
    const [selected, setSelected] = useState(backGround === 'true' ? false : true);

    const handleSelect = (e) => {
        e.preventDefault();
        setBackGround(backGround === 'true' ? 'false' : 'true')
        setSelected(!selected);
        localStorage.setItem('background', backGround === 'true' ? 'false' : 'true')
    };

    return (
        <ContentContainer  theme={theme} border='none'>
            <IconContainer theme={theme} background={theme === 'light' ? '#76D97E' : '#327647'}>
                <ImageIcon theme={theme}/>
            </IconContainer>
            <LabelToggleBox>
                <Label theme={theme}>Background</Label>
                <ToggleBox theme={theme} selected={selected} direction={selected ? 'flex-end' : 'flex-start'}>
                    <ToggleCircle theme={theme} selected={selected} onClick={handleSelect}/>
                </ToggleBox>
            </LabelToggleBox>
        </ContentContainer>
    )
};
