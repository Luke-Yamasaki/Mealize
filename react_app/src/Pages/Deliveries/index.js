// packages
import styled from 'styled-components';

import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { getAllDeliveries, updateDelivery, deleteDelivery } from '../../store/deliveries';
import { useEffect } from 'react';
import { setCurrentModal } from '../../store/modal';
import { ItemCard } from '../../Components/Cards/ItemCard';
import { DeliveryForm } from '../../Forms/Delivery';
import { OrganizationCard } from '../../Components/Cards/OrganizationCard';

const Wrapper = styled.div`
    width: 1550px;
    height: auto;
    min-height: 900px;
    display: flex;
    flex-direction: row;
    align-items: top;
    justify-content: flex-start;
    gap: 50px;
    padding-left: 50px;
    padding-top: 50px;
    background-color: white;
`

const Header = styled.section`
    width: 700px;
    height: auto;
    min-height: 600px;
    max-height: 900px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: left;
    gap: 10px;
    background-color: #F5F5F5;
`

const MessageContent = styled.section`
    width: 1300px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
`;

const PageLabel = styled.div`
    width: 300px;
    height: 50px;
    font-family: motiva-sans, sans-serif;
    font-size: 24px;
    color: black;
    display: flex;
    flex-direction: center;
    align-items: center;
`

export const Deliveries = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const deliveries = useSelector(state => state.deliveries)
    const sessionUser = useSelector(state => state.session.user)
    const posts = useSelector(state => state.posts);
    const [selected, setSelected] = useState('')

    return (
        <Wrapper>
            <Header>
                <PageLabel>Deliveries</PageLabel>
                {deliveries && deliveries.deliveries.map((delivery, idx) => <div style={{width: '500px', height: '200px', display: 'flex', alignItems: 'left', justifyContent: 'left', flexDirection: 'column'}} key={idx} id={delivery.postId} onClick={(e) => setSelected(e.target.id)}>Picking up at: <div>{`${delivery.date}`}</div><OrganizationCard organization={delivery.location} /></div>)}
            </Header>
            <MessageContent>
                <div>
                    <div>
                        {selected !== '' &&  <div style={{width: '500px', height: '600px', backgroundColor: 'rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><ItemCard post={posts.posts[selected]} /></div>}
                    </div>
                </div>
            </MessageContent>
        </Wrapper>
    )
}
