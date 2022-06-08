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
    WelcomeLink,
    WelcomeImages,
    WelcomeDiagram,
    MealizeTitle,
    MealizeText,
    LinkText
} from '../../Components/Styled/Welcome';

import { VectorBox } from '../../Components/Styled/Layout';

//Icons
import { Hand } from '../../Assets/Icons/Hand';
import { MediumLogo, XLLogo } from '../../Assets/Logo';
import { Redirect } from 'react-router-dom';
import { ScrollArrow } from '../../Assets/Icons/ScrollArrow';
import { LargeVolunteerIcon } from '../../Assets/Icons/Volunteers';

//Images
import volunteer from './Images/volunteer.jpg';
import hungry from './Images/hungry.jpg';
import lightDiagram from './Images/lightdiagram.png';
import darkDiagram from './Images/darkdiagram.png';
import request from './Images/request.png';
import item from './Images/item.png';
import organization from './Images/organization.png';
import notify from './Images/notify.png';
import notifyMessage from './Images/notifymessage.png';
import singleItem from './Images/singleitem.png';
import pickupForm from './Images/pickupform.png';
import pickupMessage from './Images/pickupmessage.png';
import navbar from './Images/navbar.png';
import buttons from './Images/buttons.png';
import login from './Images/login.png';

export const Welcome = () => {
    const sessionUser = useSelector(state => state.session.user);
    const { theme } = useTheme();

    if(sessionUser) {
        return <Redirect to='/' />
    }

    return (
        <>
            {localStorage.getItem('visited') === 'false' &&
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
                    <HandVectorBox animation={localStorage.getItem('visited') ? false : true}>
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
                    <MealizeTitle theme={theme}>
                        What is Mealize?
                    </MealizeTitle>
                    <VectorBox square='200px'>
                        <MediumLogo />
                    </VectorBox>
                    <MealizeText theme={theme}>
                        Mealize is an app that aims to reduce food
                        scarcity and waste by connecting businesses to nonprofits.
                    </MealizeText>
                    <WelcomeImages src={volunteer} />
                </Group>
                <Group>
                    <SectionTitle theme={theme}>
                        The problem
                    </SectionTitle>
                    <LinkText theme={theme}>
                        Before the Covid-19 pandemic, in 2019 about
                        <WelcomeLink
                            target='_blank'
                            href='https://www.ers.usda.gov/data-products/ag-and-food-statistics-charting-the-essentials/food-security-and-nutrition-assistance/#:~:text=In%202020%2C%2089.5%20percent%20of,from%2010.5%20percent%20in%202019.'
                        >
                            10.5%
                        </WelcomeLink>
                        of total US households reported that they had low food security or very low food security.
                    </LinkText>
                    <WelcomeImages src={hungry} />
                    <LinkText theme={theme} list={true}>
                        The Covid-19 pandemic caused
                        <WelcomeLink
                            target='_blank'
                            href='https://www.bls.gov/opub/mlr/2020/article/employment-recovery.htm'
                        >
                            22 million
                        </WelcomeLink>
                        job losses in the USA from February 2020 to April 2020, and the entire supply chain was disrupted.
                    </LinkText>
                    <LinkText theme={theme} list={true}>
                        However, each year in the USA, an estimated
                        <WelcomeLink
                            target='_blank'
                            href='https://www.usda.gov/foodwaste/faqs#:~:text=In%20the%20United%20States%2C%20food,worth%20of%20food%20in%202010.'
                        >
                            30~40%
                        </WelcomeLink>
                        of food supply gets wasted.
                    </LinkText>
                    <LinkText theme={theme} list={true}>
                        As a result, feeding at-risk populations in the USA has become an extremely pressing issue.
                    </LinkText>
                </Group>
                <Group>
                    <SectionTitle theme={theme}>
                        Proposed solution
                    </SectionTitle>
                    <SectionText theme={theme}>
                        Create a centralized location where businesses and nonprofits can connect, communicate and set up pickup times for surplus food.
                    </SectionText>
                    <WelcomeDiagram src={theme === 'light' ? lightDiagram : darkDiagram} />
                </Group>
                <Group>
                    <SectionTitle theme={theme}>
                        How does Mealize work?
                    </SectionTitle>
                    <SectionText theme={theme}>
                        Nonprofit managers can fill out a form and post request to let businesses know what they need.
                    </SectionText>
                    <WelcomeImages src={request} />
                    <SectionText theme={theme}>
                        Businesses can read through requests and see if they have items that are in demand. If they do, they can take a picture of surplus food, fill out a form and post their items.
                    </SectionText>
                    <WelcomeImages src={item} />
                    <SectionText theme={theme}>
                        Nonprofit volunteers can browse through their feed, and if they find an item that their organization needs, they can add the post to their favorites, ask the user a question, or notify their manager.
                    </SectionText>
                    <WelcomeImages src={notify} height='300px'/>
                    <SectionText theme={theme}>
                        Nonprofit managers can sort through messages and see if an ideal item pops up.
                    </SectionText>
                    <WelcomeImages src={notifyMessage} height='380px' />
                    <SectionText theme={theme}>
                        Users can click on a post to get the organization's location and availabile time slot.
                    </SectionText>
                    <WelcomeImages src={singleItem} />
                    <SectionText theme={theme}>
                        Users can also click on the title of the organization to get redirected to the organization's page.
                    </SectionText>
                    <WelcomeImages src={organization} height='500px' />
                    <SectionText theme={theme}>
                        They can also click on the 'Send a request' button to send a pick up request. Once the form is submitted, an item gets reserved and other users cannot click on any buttons.
                    </SectionText>
                    <WelcomeImages src={pickupForm} />
                    <SectionText theme={theme}>
                        Once a business manager accepts a pick up request, an item becomes confirmed and a volunteer driver will get dispatched to the business location.
                    </SectionText>
                    <WelcomeImages src={pickupMessage} />
                    <SectionText theme={theme}>
                        All that's left is for the volunteer driver to return to their nonprofit organization.
                    </SectionText>
                    <VectorBox square='300px'>
                        <LargeVolunteerIcon />
                    </VectorBox>
                    <SectionTitle theme={theme}>
                        This completes a Mealize delivery.
                    </SectionTitle>
                    <SectionTitle theme={theme}>
                        ---------------------------
                    </SectionTitle>
                </Group>
                <Group>
                    <SectionTitle theme={theme}>
                        Ready to get started?
                    </SectionTitle>
                    <SectionText theme={theme}>
                        Click on the 'Sign up' button in the navigation bar to register an account.
                    </SectionText>
                    <WelcomeImages src={navbar} height='30px' />
                    <WelcomeImages src={buttons} height='100px' fit='cover'/>
                    <SectionText theme={theme}>
                        Or, click on one of three demo buttons in the sign up for login forms to continue.
                    </SectionText>
                    <WelcomeImages src={login} fit='cover' height='750px'/>
                </Group>
                <Group />
            </WelcomeContent>
        </>
    )
};
