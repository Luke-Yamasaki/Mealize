import React, { useContext } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ThemeContext } from './ThemeContext';

const wrapperThemes = {
    'light': {

    },
    'dark': {

    }
};

const containerThemes = {
    'light': {

    },
    'dark': {

    }
};

const textThemes = {
    'light': {


    },
    'dark': {

    }
}

const cardThemes = {
    'dairy': {
        'background': 'linear-gradient(#15BAFA, #FFFFFF)',
        'border': '1px solid #15BAFA'
    },
    'vegetables': {
        'background': 'linear-gradient(#15BAFA, #FFFFFF)',
        'border': '1px solid #15BAFA'
    },
    'fruits': {
        'background': 'linear-gradient(#15BAFA, #FFFFFF)',
        'border': '1px solid #15BAFA'
    },
    'grains': {
        'background': 'linear-gradient(#15BAFA, #FFFFFF)',
        'border': '1px solid #15BAFA'
    },
    'protein': {
        'background': 'linear-gradient(#15BAFA, #FFFFFF)',
        'border': '1px solid #15BAFA'
    }
}
