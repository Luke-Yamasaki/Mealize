//Hooks
import { useDispatch, useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from '../../Context/ThemeContext';
//Actions
import { getAllDeliveries } from '../../store/deliveries';
import { getAllPosts } from '../../store/posts';

//Components
import { PostCard } from '../../Components/Cards/PostCard';
// import { DeliveryForm } from '../../Forms/Delivery';
import { OrganizationCard } from '../../Components/Cards/OrganizationCard';

//Helpers
import { timesObj } from '../../Forms/Delivery/times';
import { colors } from '../SinglePost/colors';
// packages
import {
    DeliveryField,
    DeliveryItem,
    DeliveryList,
    DeliveryPageWrapper,
    DeliverySideMenu,
    DeliveryTime,
    SelectDeliveryBox,
    SelectDeliveryText
} from '../../Components/Styled/Deliveries';


export const Deliveries = () => {
    const dispatch = useDispatch()
    const deliveries = useSelector(state => state.deliveries)
    const sessionUser = useSelector(state => state.session.user)
    const posts = useSelector(state => state.posts.all);
    const organizations = useSelector(state => state.organizations);
    const [loaded, setLoaded] = useState(false);
    const [deliveryId, setDeliveryId] = useState('')
    const {theme} = useTheme();

    useEffect(() => {
        dispatch(getAllDeliveries());
        dispatch(getAllPosts());
        setLoaded(true)
    },[dispatch])


    const formatDateString = (someDate) => {
        // Only accepts strings
        const day = someDate.slice(5, 7);
        const month = someDate.slice(8, 11);
        const year = someDate.slice(12, 16);
        const formattedDate = month + '/' + day + '/' + year;

        return formattedDate;
    };

    const handleClick = (e, delivery) => {
        e.preventDefault();
        setDeliveryId(delivery.id)
    };

    if(!sessionUser) {
        return <Redirect to='/' />
    };

    const pending = Object.values(deliveries).filter(delivery => delivery.completed === 0);
    const accepted = Object.values(deliveries).filter(delivery => delivery.completed === 1);

    // delivery.completed 0=not approved yet 1=approved 2=accepted 3=picked up/droped off 4=cancelled

    return loaded && (
        <DeliveryPageWrapper theme={theme}>
            <DeliverySideMenu theme={theme}>
                <DeliveryList border={theme === 'light' ? '1px solid rgba(0, 0, 0, 0.2)' : '1px solid rgba(255, 255, 255, 0.2)'} theme={theme}>Find all of your deliveries here!</DeliveryList>
                <DeliveryList theme={theme}>Pending Deliveries</DeliveryList>
                {deliveries !== {} && pending.map((delivery) =>
                    <DeliveryItem key={delivery.id} onClick={e => handleClick(e, delivery)}>
                        <DeliveryTime theme={theme}>{sessionUser.isNonprofit ? `- Picking up on: ${formatDateString(delivery.date)} at ${timesObj[delivery.time]}` : `- Donating on: ${formatDateString(delivery.date)} at ${timesObj[delivery.time]}`}</DeliveryTime>
                        <OrganizationCard organization={!sessionUser.isNonprofit ? organizations.nonprofits[delivery.nonprofitId] : organizations.businesses[delivery.businessId]} preview='true'/>
                    </DeliveryItem>

                )}
                <DeliveryList theme={theme}>Accepted Deliveries</DeliveryList>
                {deliveries !== {} && accepted.map((delivery) =>
                    <DeliveryItem key={delivery.id} onClick={e => handleClick(e, delivery)}>
                        <DeliveryTime theme={theme}>{sessionUser.isNonprofit ? `- Picking up on: ${formatDateString(delivery.date)} at ${timesObj[delivery.time]}` : `- Donating on: ${formatDateString(delivery.date)} at ${timesObj[delivery.time]}`}</DeliveryTime>
                        <OrganizationCard organization={!sessionUser.isNonprofit ? organizations.nonprofits[delivery.nonprofitId] : organizations.businesses[delivery.businessId]} preview='true'/>
                    </DeliveryItem>

                )}
            </DeliverySideMenu>

                {!Object.values(deliveries).length &&
                    <DeliveryField theme={theme}>
                        <SelectDeliveryBox>
                            <SelectDeliveryText theme={theme}>
                                {
                                    sessionUser.isNonprofit && sessionUser.isManager ?
                                    "You do not have any deliveries scheduled. Please send requests to businesses to initiate a delivery."
                                    : sessionUser.isNonprofit && !sessionUser.isManager ?
                                    "You do not have any pick-ups or drop-offs scheduled. Hang tight or notify your manager about good posts."
                                    : 'You do not have any pick-ups scheduled. Hang tight and wait for a nonprofit to send you a request.'
                                }
                            </SelectDeliveryText>
                        </SelectDeliveryBox>
                    </DeliveryField>
                }
                {(Object.values(deliveries)?.length > 0 && !deliveryId) &&
                    <DeliveryField theme={theme}>
                        <SelectDeliveryBox theme={theme}>
                            <SelectDeliveryText theme={theme}>
                            Please click on a delivery card in the left menu to see item details.
                            </SelectDeliveryText>
                        </SelectDeliveryBox>
                    </DeliveryField>
                }
                {(Object.values(deliveries)?.length > 0 && deliveryId) &&
                <DeliveryField theme={theme} >
                    <SelectDeliveryBox theme={theme} style={colors[theme][posts[deliveries[deliveryId].postId].categoryId]}>
                        <PostCard post={posts[deliveries[deliveryId].postId]} preview='true'/>
                    </SelectDeliveryBox>
                </DeliveryField>
                }
        </DeliveryPageWrapper>
    )
}
