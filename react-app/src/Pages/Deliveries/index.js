//Hooks
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from '../../Context/ThemeContext';
//Actions
import { getAllDeliveries, updateDelivery, deleteDelivery } from '../../store/deliveries';
import { setCurrentModal } from '../../store/modal';
import { getAllPosts } from '../../store/posts';

//Components
import { PostCard } from '../../Components/Cards/PostCard';
import { DeliveryForm } from '../../Forms/Delivery';
import { OrganizationCard } from '../../Components/Cards/OrganizationCard';

//Helpers
import { timesObj } from '../../Forms/Delivery/times';
// packages
import {
    DeliveryField,
    DeliveryItem,
    DeliveryList,
    DeliveryPageWrapper,
    DeliverySideMenu,
    DeliveryTime
} from '../../Components/Styled/Deliveries';

export const Deliveries = () => {
    const dispatch = useDispatch()
    const deliveries = useSelector(state => state.deliveries)
    const sessionUser = useSelector(state => state.session.user)
    const posts = useSelector(state => state.posts.all);
    const [selected, setSelected] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [deliveryId, setDeliveryId] = useState('')
    const {theme} = useTheme();

    useEffect(() => {
        dispatch(getAllDeliveries());
        dispatch(getAllPosts());
        setLoaded(true)
    },[dispatch])

    useEffect(() => {
        console.log(deliveryId)
    },[deliveryId])

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
    }

    return loaded && (
            <DeliveryPageWrapper theme={theme}>
                <DeliverySideMenu theme={theme}>
                    <DeliveryList theme={theme}>Deliveries</DeliveryList>
                    {deliveries !== {} && Object.values(deliveries).map((delivery) =>
                    <DeliveryItem key={delivery.id} onClick={e => handleClick(e, delivery)}>
                        <DeliveryTime theme={theme}>{`Picking up on: ${formatDateString(delivery.date)} at ${timesObj[delivery.time]}`}</DeliveryTime>
                        <OrganizationCard organization={delivery.location} />
                    </DeliveryItem>
                    )}
                </DeliverySideMenu>
                <DeliveryField theme={theme}>
                    {deliveryId &&
                        <PostCard post={posts[deliveries[deliveryId].postId]}/>
                    }

                </DeliveryField>
            </DeliveryPageWrapper>
    )
}
