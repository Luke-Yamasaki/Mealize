//Hooks
import { useSelector } from 'react-redux';
import { useTheme } from '../../Context/ThemeContext';

//Styled-components
import {
    LogoType,
    LogoVectorBox,
    WelcomeAnimation,
    WelcomeContent,
    HandVectorBox,
    GreetingText,
    Group,
    SectionTitle,
    SectionText,
    ArrowBox,
    AnimationBox,
    WelcomeLink
} from '../../Components/Styled/Welcome';

import { VectorBox } from '../../Components/Styled/Layout';

//Icons
import { Hand } from '../../Assets/Icons/Hand';
import { Logo, MediumLogo, XLLogo } from '../../Assets/Logo';
import { Redirect } from 'react-router-dom';
import { ScrollArrow } from '../../Assets/Icons/ScrollArrow';

export const Welcome = () => {
    const sessionUser = useSelector(state => state.session.user);
    const { theme } = useTheme();

    if(sessionUser) {
        return <Redirect to='/' />
    }

    return (
        <>
            {!localStorage.getItem('visited') &&
                <WelcomeAnimation>
                    <LogoVectorBox>
                        <XLLogo theme={theme} />
                    </LogoVectorBox>
                    <LogoType theme={theme}>Mealize</LogoType>
                </WelcomeAnimation>
            }
            <WelcomeContent theme={theme} >
                <Group>
                    <GreetingText theme={theme} animation={localStorage.getItem('visited') ? false : true}>Welcome to Mealize!</GreetingText>
                    <HandVectorBox square='550px' animation={localStorage.getItem('visited') ? false : true}>
                        <Hand theme={theme} />
                    </HandVectorBox>
                </Group>
                <Group>
                    <AnimationBox>
                        <ArrowBox delay={localStorage.getItem('visited') ? false : true}>
                            <ScrollArrow theme={theme}/>
                        </ArrowBox>
                    </AnimationBox>
                </Group>
                <Group>
                    <SectionTitle theme={theme}>
                        What is Mealize?
                    </SectionTitle>
                    <VectorBox square='200px'>
                        <MediumLogo />
                    </VectorBox>
                    <SectionText theme={theme}>
                        Mealize is an app that aims to reduce food
                        scarcity and waste by connecting businesses to nonprofits.
                    </SectionText>
                </Group>
                <Group>
                    <SectionTitle theme={theme}>
                        The problem
                    </SectionTitle>
                    <SectionText theme={theme}>
                        Before the Covid-19 pandemic, in 2019 about 10.5% of total US households reported that they had low food security or very low food security.
                    </SectionText>
                    <WelcomeLink
                        target='_blank'
                        href='https://www.ers.usda.gov/data-products/ag-and-food-statistics-charting-the-essentials/food-security-and-nutrition-assistance/#:~:text=In%202020%2C%2089.5%20percent%20of,from%2010.5%20percent%20in%202019.'>
                        Economic Research Service - U.S. Department Of Agriculture
                    </WelcomeLink>
                    <SectionText theme={theme}>
                        However, each year in the USA, an estimated 30-40% of food supply gets wasted. (Source: U.S. Department Of Agriculture)
                    </SectionText>
                    <SectionText theme={theme}>
                        The Covid-19 pandemic caused 22 million job losses in the USA from February 2020 to April 2020, and the entire supply chain was disrupted. (Source: US Bureau of Labor Statistics)                    </SectionText>
                    <SectionText theme={theme}>
                        As a result, feeding at-risk populations in the USA has become an extremely pressing issue.
                    </SectionText>
                </Group>
                <Group>
                    <SectionTitle theme={theme}>
                        Proposed solution
                    </SectionTitle>
                    <SectionText theme={theme}>
                        Create a centralized location where businesses and nonprofits can connect, communicate and set up pickup times for surplus food.
                    </SectionText>
                    <SectionText theme={theme}>
                    - Nonprofit managers can post requests for items that are in high demand.
                    - Nonprofit managers can filter through their feed by category and find exactly what they need.

                    Business managers can post pictures of surplus food.
                    Business managers will not waste time attempting to deliver food to nonprofits, only to find out that the nonprofit will not accept their items such as bread, pasta, or refrigerated/frozen foods.
                    </SectionText>
                </Group>
                <Group>
                    <SectionTitle theme={theme}>
                        How does it work?
                    </SectionTitle>
                </Group>
            </WelcomeContent>
        </>
    )
};
