//imports
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

//Components
import { CustomizationContainer, TitleContainer, ContentContainer, Label } from '../../Styled/Customization';
import { Theme } from './Theme';
import { Color } from './Color';
import { Contrast } from './Contrast';
import { Saturation } from './Saturation';
import { BackGround } from './BackGround';

export const CustomizationSection = () => {
    return (
    <CustomizationContainer>
        <TitleContainer>
            <Label>Customization tools</Label>
        </TitleContainer>
        <ContentContainer>
            <Theme />
        </ContentContainer>
        <ContentContainer>
            <Color />
        </ContentContainer>
        <ContentContainer>
            <Contrast />
        </ContentContainer>
        <ContentContainer>
            <Saturation />
        </ContentContainer>
        <ContentContainer>
            <BackGround />
        </ContentContainer>
    </CustomizationContainer>
    )
}
