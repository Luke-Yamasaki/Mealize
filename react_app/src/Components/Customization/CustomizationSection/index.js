//imports
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

//Components
import { Theme } from './Theme';
import { Color } from './Color';
import { Contrast } from './Contrast';
import { Saturation } from './Saturation';
import { BackGround } from './BackGround';

const CustomizationContainer = styled.div`
    width: 300px;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: center;
    border: 1px solid #F3F3F3;
    border-radius: 5px;
    background-color: white;
    margin-left: 63vw;
    overflow: hidden;
    color: black;
    font-family: motiva-sans, sans-serif;
    font-style: normal;
    font-weight: 700;
`;

const TitleContainer = styled.div`
    width: 300px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContentContainer = styled.div`
    width: 300px;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
`;

const Label = styled.p`
    margin: 0px;
    padding: 0px;
    font-size: 1em;
    color: black;
`;

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
