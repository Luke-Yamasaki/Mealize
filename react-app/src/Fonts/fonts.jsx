import { createGlobalStyle } from "styled-components";
import dyslexicBold from './OpenDyslexic3-Bold.ttf';
import dyslexicRegular from './OpenDyslexic3-Regular.ttf';

const GlobalFontStyle = createGlobalStyle`
    @font-face {
        font-family: 'OpenDyslexic-Bold';
        src: url(${dyslexicBold}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'OpenDyslexic-Regular';
        src: url(${dyslexicRegular}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }
`;

export default GlobalFontStyle;
