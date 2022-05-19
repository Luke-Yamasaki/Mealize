//hooks
// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '../../../Context/ThemeContext';
import { useUserLocation } from '../../../Context/LocationContext';

//helpers
// import { getGeoLocation } from '../../../utils/geo_location';

//Icons
import { LocationPin } from '../../../Assets/Icons/Location';

//styled-components
import {NotificationSection, NotificationContainer, NotificationText, NotificationTextBox } from '../../../Components/Styled/NotificationBar';
import { VectorBox } from '../../Styled/Layout';

export const NotificationBar = () => {
    const sessionUser = useSelector(state => state.session.user);
    const businesses = useSelector(state => state.organizations.businesses);
    const nonProfits = useSelector(state => state.organizations.nonprofits);
    const organization = !sessionUser ? '' : sessionUser.isNonprofit ? nonProfits[sessionUser.organizationId] : businesses[sessionUser.organizationId];
    const { userLocation, setUserLocation } = useUserLocation();
    const { theme } = useTheme();


    // useEffect(() => {
    //     const location = getGeoLocation();
    //     console.log(location)
    // },[])

    if(!sessionUser) {
        return null
    }

    return (
        <NotificationSection theme={theme}>
            <NotificationContainer theme={theme}>
                <LocationPin theme={theme} />
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
                        Current location:
                    </NotificationText>
                }
            </NotificationContainer>
        </NotificationSection>
    )
};
