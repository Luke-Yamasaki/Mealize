import { useTheme } from '../../../Context/ThemeContext';

import {
    DropDownContainer,
    DropDownMenu,
    DropDownItem,
    MenuItemBox,
    LogOutButton
} from "../../Styled/Navbar";

export const NavMenu = ({ type, sessionUser, logOut, handleRedirect }) => {
    const { theme, setTheme } = useTheme();
    const organization = sessionUser.organizationId;
    //type = 'userInfo' : 'settings'

    return (
    <>
        {type === 'userInfo' ?
            <DropDownContainer theme={theme} type='user'>
                <DropDownMenu>
                    <DropDownItem>
                        <MenuItemBox theme={theme}>{sessionUser.firstName.length <= 10 ? `Hello ${sessionUser.firstName}!` : `Hello ${sessionUser.firstName.slice(0, 10)}...!`}</MenuItemBox>
                    </DropDownItem>
                    <DropDownItem onClick={e => handleRedirect(e, sessionUser)}>
                        <MenuItemBox theme={theme} underline='true'>My organization</MenuItemBox>
                    </DropDownItem>
                    <DropDownItem onClick={e => handleRedirect(e, sessionUser)}>
                        <MenuItemBox theme={theme} underline='true'>My posts</MenuItemBox>
                    </DropDownItem>
                    <DropDownItem>
                        <LogOutButton onClick={logOut}>Log out</LogOutButton>
                    </DropDownItem>
                </DropDownMenu>
            </DropDownContainer>
        :
            <DropDownContainer theme={theme} type='settings'>
                <DropDownMenu>Customization
                    <DropDownItem theme={theme}>
                        {sessionUser.firstName.length <= 8 ? `Hello ${sessionUser.firstName}!` : `Hello ${sessionUser.firstName.slice(0, 7)}...!`}
                    </DropDownItem>
                    <DropDownItem onClick={logOut}>
                        <LogOutButton>Log out</LogOutButton>
                    </DropDownItem>
                </DropDownMenu>
            </DropDownContainer>
        }
    </>
    )
}
