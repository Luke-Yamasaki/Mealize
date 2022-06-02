//Hooks
import { useTheme } from '../../Context/ThemeContext';

//Components
import { Navbar } from '../../Components/Navbar';

//Styled-components
import { LogoType, LogoVectorBox, WelcomeAnimation, WelcomeContent } from '../../Components/Styled/Welcome';
import { VectorBox } from '../../Components/Styled/Layout';

//Icons
import { Hand } from '../../Assets/Icons/Hand';
import { XLLogo } from '../../Assets/Logo';

export const Welcome = () => {
    const { theme } = useTheme();

    return (
        <>
            <WelcomeAnimation>
                <LogoVectorBox>
                    <XLLogo theme={theme} />
                </LogoVectorBox>
                <LogoType theme={theme}>Mealize</LogoType>
            </WelcomeAnimation>
            <Navbar theme={theme} />
            <WelcomeContent theme={theme} >
                <VectorBox square='550px'>
                    <Hand theme={theme} />
                </VectorBox>
            </WelcomeContent>
        </>
    )
};
