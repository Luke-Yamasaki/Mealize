import { useTheme } from '../../../Context/ThemeContext';

import {
    DropDownContainer,
    DropDownMenu,
    DropDownItem
} from "../../Styled/Navbar";

export const NavMenu = ({ type, sessionUser, logOut }) => {
    const { theme, setTheme } = useTheme();
    //type = 'userInfo' : 'settings'
    return (
    <>
        {type === 'userInfo' ?
            <DropDownContainer theme={theme} type='user'>
                <DropDownMenu>
                    <li>
                        <div theme={theme}>{sessionUser.firstName.length <= 8 ? `Hello ${sessionUser.firstName}!` : `Hello ${sessionUser.firstName.slice(0, 7)}...!`}</div>
                    </li>
                    <li>
                        <div onClick={logOut}>Log out</div>
                    </li>
                </DropDownMenu>
            </DropDownContainer>
        :
            <DropDownContainer theme={theme} type='settings'>
                <DropDownMenu>Customization
                    <DropDownItem theme={theme}>
                        {sessionUser.firstName.length <= 8 ? `Hello ${sessionUser.firstName}!` : `Hello ${sessionUser.firstName.slice(0, 7)}...!`}
                    </DropDownItem>
                    <DropDownItem onClick={logOut}>
                        Log out
                    </DropDownItem>
                </DropDownMenu>
            </DropDownContainer>
        }
    </>
    )
}
