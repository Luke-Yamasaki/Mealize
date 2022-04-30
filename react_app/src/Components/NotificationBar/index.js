import { useSelector } from 'react-redux';
import styles from './NotificationBar.module.css';
import {NotificationSection, NotificationContainer, NotificationText } from '../Styled/NotificationBar';

export const NotificationBar = () => {
    const sessionUser = useSelector(state => state.session.user);
    const organization = useSelector(state => sessionUser.isNonprofit? state.organizations.nonprofits[sessionUser.organizationId] : state.organizations.businesses[sessionUser.organizationId]);
    return (
        <NotificationSection>
            <NotificationContainer>
                {sessionUser.isNonprofit && sessionUser.isManager ?
                 <NotificationText>
                    Drop off at: {organization.street + ', ' + organization.city + ', ' + organization.state.slice(0, 2).toUpperCase() + ' ' + organization.zip}
                 </NotificationText>
                 : !sessionUser.isNonprofit && sessionUser.isManager ?
                 <NotificationText>
                    Pick up at: {organization.street + ', ' + organization.city + ', ' + organization.state.slice(0, 2).toUpperCase() + ' ' + organization.zip}
                 </NotificationText>
                 :
                 <NotificationText>
                    Pick up at: {organization.street + ', ' + organization.city + ', ' + organization.state.slice(0, 2).toUpperCase() + ' ' + organization.zip}
                 </NotificationText>
                }

            </NotificationContainer>
        </NotificationSection>
    )
}
