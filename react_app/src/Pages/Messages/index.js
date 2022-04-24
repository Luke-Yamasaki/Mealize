// packages
import styled from 'styled-components';

import { useDispatch, useSelector} from 'react-redux';

import { getMessages } from '../../store/messages';
import { getAllDeliveries } from '../../store/deliveries';
import { useEffect } from 'react';

const Wrapper = styled.div`
    width: 1550px;
    height: auto;
    min-height: 2000px;
    display: flex;
    flex-direction: row;
    align-items: top;
    justify-content: flex-start;
    gap: 50px;
    padding-left: 50px;
    padding-top: 50px;
`

const Header = styled.section`
    width: 300px;
    height: auto;
    min-height: 2000px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: left;
    gap: 10px;
`

const MessageContent = styled.section`
    width: 1300px;
    height: auto;
    min-height: 2000px;
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

export const Messages = ({sessionUser}) => {
    const dispatch = useDispatch()
    const messages = useSelector(state => state.messages)
    console.log(messages)
    const deliveries = useSelector(state => state.deliveries)
    const users = useSelector(state => state.users)

    useEffect(() => {
        dispatch(getAllDeliveries(sessionUser.organizationId))
        dispatch(getMessages(sessionUser.id))
    },[])

    return (
        <Wrapper>
            <Header>
                <PageLabel>Messages</PageLabel>
                {messages.length && Object.values(messages).map((message, idx) => message.senderId !== sessionUser.id ?
                    <div key={idx}>
                        <div>
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
                    </div>
                )}
            </Header>
            <MessageContent>
                <div>
                    <div>
                        Hello
                    </div>
                </div>
            </MessageContent>
        </Wrapper>
    )
}
