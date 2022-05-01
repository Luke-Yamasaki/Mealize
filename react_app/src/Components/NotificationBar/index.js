//hooks
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '../../Context/ThemeContext';
import { useUserLocation } from '../../Context/LocationContext';

//helpers
import { getGeoLocation } from '../../Helpers/GeoLocation';

//styled-components
import {NotificationSection, NotificationContainer, NotificationText } from '../Styled/Light/NotificationBar';
import {DarkNotificationSection, DarkNotificationText } from '../Styled/Dark/NotificationBar';

export const NotificationBar = () => {
    const sessionUser = useSelector(state => state.session.user);
    const organization = useSelector(state => sessionUser.isNonprofit? state.organizations.nonprofits[sessionUser.organizationId] : state.organizations.businesses[sessionUser.organizationId]);
    const { userLocation, setUserLocation } = useUserLocation();
    const { theme } = useTheme();

    useEffect(() => {
        const location = getGeoLocation();
        console.log(location)
    },[])

    return (
        <>
            {theme === 'light' ?
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
                            Current location: {userLocation}
                        </NotificationText>
                        }

                    </NotificationContainer>
                </NotificationSection>
                :
                <DarkNotificationSection>
                    <NotificationContainer>
                        {sessionUser.isNonprofit && sessionUser.isManager ?
                        <DarkNotificationText>
                            Drop off at: {organization.street + ', ' + organization.city + ', ' + organization.state.slice(0, 2).toUpperCase() + ' ' + organization.zip}
                        </DarkNotificationText>
                        : !sessionUser.isNonprofit && sessionUser.isManager ?
                        <DarkNotificationText>
                            Pick up at: {organization.street + ', ' + organization.city + ', ' + organization.state.slice(0, 2).toUpperCase() + ' ' + organization.zip}
                        </DarkNotificationText>
                        :
                        <DarkNotificationText>
                            Current location: {userLocation}
                        </DarkNotificationText>
                        }
                    </NotificationContainer>
                </DarkNotificationSection>
            }
        </>
    )
}
