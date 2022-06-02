//Hooks
import { useSelector } from 'react-redux';
import { useTheme } from '../../Context/ThemeContext';

//Components
import { Navbar } from '../../Components/Navbar';

//Styled-components
import { LogoType, LogoVectorBox, WelcomeAnimation, WelcomeContent, HandVectorBox, GreetingText } from '../../Components/Styled/Welcome';

//Icons
import { Hand } from '../../Assets/Icons/Hand';
import { XLLogo } from '../../Assets/Logo';
import { Redirect } from 'react-router-dom';

export const Welcome = () => {
    const sessionUser = useSelector(state => state.session.user);
    const { theme } = useTheme();

    if(sessionUser) {
        return <Redirect to='/' />
    }

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
                <GreetingText theme={theme}>Welcome to Mealize!</GreetingText>
                <HandVectorBox square='550px'>
                    <Hand theme={theme} />
                </HandVectorBox>
            </WelcomeContent>
        </>
    )
};
