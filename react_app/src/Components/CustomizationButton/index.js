//Packages
import { useEffect, useState } from 'react';
import ReactSlider from 'react-slider';
import styled from 'styled-components';

//Context
import { useTheme } from '../../Context/ThemeContext';
import { useColor } from '../../Context/ColorContext';
import { useSaturation } from '../../Context/SaturationContext';
import { useContrast } from '../../Context/ContrastContext';



const SettingsButton = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme === 'light' ? '#327647' : '#76D97E'}
`;

export const CustomizationButton = () => {
    const {theme} = useTheme();
    const {color} = useColor();
    const
    return (
        <SettingsButton props={theme}>

        </SettingsButton>

    )
}
