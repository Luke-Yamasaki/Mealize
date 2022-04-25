// packages
import styled from 'styled-components';

import { useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';
import { getAllDeliveries, updateDelivery, deleteDelivery } from '../../store/deliveries';
import { useEffect } from 'react';

import { ItemCard } from '../../Components/ItemCard';
import { OrganizationCard } from '../../Components/OrganizationCard';

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
    width: 300px;
    height: auto;
    min-height: 600px;
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

export const Deliveries = ({sessionUser, deliveries}) => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts);
    const users = useSelector(state => state.users);
    const [selected, setSelected] = useState('');
    console.log(Object.values(deliveries.deliveries))

    return (
        <Wrapper>
            <Header>
                <PageLabel>Deliveries</PageLabel>
                {Object.values(deliveries.deliveries).map((delivery, idx) => <OrganizationCard key={idx} organization={delivery.location} />)}
            </Header>
            <MessageContent>
                <div>
                    <div>
                        {/* {deliveries.map((delivery, idx) => <ItemCard key={idx} post={posts[delivery.postId]} /> )} */}
                    </div>
                </div>
            </MessageContent>
        </Wrapper>
    )
}

//<div key={idx}>
{/* <div>
<img src={users[messages.receiverId].profileImageUrl} alt='User profile.' />
<p>{users[messages.receiverId].firstName}</p>
</div>
<div>
<p>{message.title}</p>
<p>{message.content}</p>
</div>
</div>
:
<div key={idx}>
<div>
<img src={sessionUser.profileImageUrl} alt='Your profile.' />
<p>{sessionUser.firstName}</p>
</div>
<div>
<p>{message.title}</p>
<p>{message.content}</p>
</div>
</div> */}
