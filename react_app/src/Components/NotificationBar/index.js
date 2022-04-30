import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './NotificationBar.module.css';
import {NotificationSection, NotificationContainer, NotificationText } from '../Styled/NotificationBar';

export const NotificationBar = () => {
    const sessionUser = useSelector(state => state.session.user);
    const organization = useSelector(state => sessionUser.isNonprofit? state.organizations.nonprofits[sessionUser.organizationId] : state.organizations.businesses[sessionUser.organizationId]);
    const [userLocation, setUserLocation] = useState('')

    const getLocation = () => {
        const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
        };

        const success = (pos) => {
            const crd = pos.coords;

            console.log('Your current position is:', crd);
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        const geo = navigator.geolocation.getCurrentPosition(success, error, options);
        console.log(geo)
        setUserLocation(geo)
        console.log(geo)
    }

    useEffect(() => {
        getLocation()
        console.log(userLocation)
    },[])

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
                    Current location: {userLocation}
                 </NotificationText>
                }

            </NotificationContainer>
        </NotificationSection>
    )
}
