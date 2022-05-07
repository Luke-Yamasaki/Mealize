//hooks
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '../../../Context/ThemeContext';
import { useUserLocation } from '../../../Context/LocationContext';

//helpers
import { getGeoLocation } from '../../../utils/geo_location';

//Icons
import { LocationPin } from '../../../Assets/Icons/Location';

//styled-components
import {NotificationSection, NotificationContainer, NotificationText } from '../../../Components/Styled/NotificationBar';

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
        <NotificationSection theme={theme}>
            <NotificationContainer theme={theme}>
                <LocationPin color={theme === 'light' ? 'black' : 'white'} />
                {sessionUser.isNonprofit && sessionUser.isManager ?
                    <NotificationText theme={theme}>
                        Drop off at: {organization.street + ', ' + organization.city + ', ' + organization.state.slice(0, 2).toUpperCase() + ' ' + organization.zip}
                    </NotificationText>
                    : !sessionUser.isNonprofit && sessionUser.isManager ?
                    <NotificationText theme={theme}>
                        Pick up at: {organization.street + ', ' + organization.city + ', ' + organization.state.slice(0, 2).toUpperCase() + ' ' + organization.zip}
                    </NotificationText>
                    :
                    <NotificationText theme={theme}>
                        Current location: {userLocation}
                    </NotificationText>
                }
            </NotificationContainer>
        </NotificationSection>
    )
};
