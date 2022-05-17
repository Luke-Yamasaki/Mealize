//Hooks
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { useTheme } from "../../Context/ThemeContext";

//Actions
import { deleteMessage, getBoards, deleteConversation} from "../../store/messages";

//Components
import { PostCard } from "../../Components/Cards/PostCard";
import {
    MessageItem,
    MessageList,
    MessagePreviewBox,
    MessageProfileIcon,
    MessageSideMenu,
    MessageTime,
    MessageUserBox,
    MessageUserName,
    MessageContentPreview,
    MessagePageWrapper,
    MessageThreadField,
    MessengerBanner,
    SelectMessageBox,
    SelectMessageText,
    MessageContainer,
    UserAndTime,
    PostContainer,
    PostBox,
    MessageContent,
    BannerTextBox,
    MessageFeed,
    MessageBox
} from "../../Components/Styled/Messages";

import { MessagePageInput } from "../../Forms/Message/MessagePageInput";

import { daysAgo } from "../../utils/Dates";
import { ButtonText, CancelButton, MessageButtonBox, SubmitButton } from "../../Components/Styled/Buttons";
import { EditMessageInput } from "../../Forms/Message/EditMessageInput";

export const MessagesPage = () => {
    const sessionUser = useSelector(state => state.session.user);
    const messageBoards = useSelector(state => state.messageBoards);
    const posts = useSelector(state => state.posts.all);
    const organizations = useSelector(state => state.organizations);
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [messageBoardId, setMessageBoardId] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const {theme} = useTheme();

    useEffect(() => {
        if(sessionUser) {
            dispatch(getBoards());
        }
    },[dispatch])

    useEffect(() => {
        if(Object.values(messageBoards).length > 0) {
            setLoaded(true);
        }
    },[messageBoards])

    const handleClick = (e, id) => {
        e.preventDefault();
        setMessageBoardId(id)
    };

    const handleDelete = async(e, message) => {
        e.preventDefault();
        if(messageBoards[message.boardId].messages.length === 1) {
            setMessageBoardId('')
            const data = await dispatch(deleteConversation(message.boardId))
        } else {
            const data = await dispatch(deleteMessage(message.id))
        }
    };

    const handleDecline = (e, post) => {
        e.preventDefault();
        console.log(post)
    };

    const handleAccept = (e, post) => {
        e.preventDefault();
        console.log(post)

    }

    if(!sessionUser) {
        return <Redirect to='/' />
    }

    return loaded && (
        <MessagePageWrapper>
            <MessageSideMenu theme={theme}>
                <MessageList theme={theme}> All messages
                    <MessageItem key='placeholderItem'/>
                    { Object.values(messageBoards).reverse().map((messageBoard) =>
                       (<MessageItem key={messageBoard.id} theme={theme} onClick={(e) => handleClick(e, messageBoard.id)}>
                            <MessageProfileIcon src={users[messageBoard.messages[messageBoard.messages.length - 1].senderId].profileImageUrl} alt='User profile.'/>
                            <MessageUserBox>
                                <MessagePreviewBox>
                                    <MessageUserName theme={theme} size='14px' width='250px'>
                                        {sessionUser.id === messageBoard.messages[messageBoard.messages.length - 1].senderId ?
                                        'You' :
                                        users[messageBoard.messages[messageBoard.messages.length - 1].senderId].firstName + ' ' + users[messageBoard.messages[messageBoard.messages.length - 1].senderId].lastName}
                                    </MessageUserName>
                                    <MessageContentPreview theme={theme}>{messageBoard.messages[messageBoard.messages.length - 1].content.length > 30 ? messageBoard.messages[messageBoard.messages.length - 1].content.slice(0, 30) + '...' : messageBoard.messages[messageBoard.messages.length - 1].content}</MessageContentPreview>
                                </MessagePreviewBox>
                                <MessageTime theme={theme}>{daysAgo(new Date(messageBoard.messages[messageBoard.messages.length - 1].createdAt))}</MessageTime>
                            </MessageUserBox>
                        </MessageItem>)
                    )}
                </MessageList>
            </MessageSideMenu>
            <MessageThreadField theme={theme}>
                {(!messageBoardId && Object.values(messageBoards).length > 0) &&
                    <SelectMessageBox>
                        <SelectMessageText theme={theme}>
                            Please select a message from the left menu.
                        </SelectMessageText>
                    </SelectMessageBox>
                }
                {(!messageBoardId && !Object.values(messageBoards).length) &&
                    <SelectMessageBox>
                        <SelectMessageText theme={theme}>
                            {sessionUser.isManaer ? "You can send messages by clicking on the 'Ask a question' button on items or request." : "You can send messages by clicking on the 'Ask a question' or 'Notify manager' button on items or request."}
                        </SelectMessageText>
                    </SelectMessageBox>
                }
                {(messageBoardId && Object.values(messageBoards).length > 0) &&
                    <>
                        <MessengerBanner theme={theme}>
                            <MessageProfileIcon square='55px'
                            src={sessionUser.id === messageBoards[messageBoardId].user_one ?
                            users[messageBoards[messageBoardId].user_two].profileImageUrl
                            :
                            users[messageBoards[messageBoardId].user_one].profileImageUrl
                            }
                            alt='User profile.'
                            />
                            <MessageUserName theme={theme} size='18px'>
                            {sessionUser.id === messageBoards[messageBoardId].user_one ?
                                users[messageBoards[messageBoardId].user_two].firstName + ' ' + users[messageBoards[messageBoardId].user_two].lastName
                                :
                                users[messageBoards[messageBoardId].user_one].firstName + ' ' + users[messageBoards[messageBoardId].user_one].lastName
                            }
                            </MessageUserName>
                            <BannerTextBox>
                                <MessageUserName theme={theme} size='18px' width='120px'>
                                    {
                                        sessionUser.id === messageBoards[messageBoardId].user_one &&
                                        users[messageBoards[messageBoardId].user_two].isManager ?
                                        'Manager at -'
                                        :
                                        sessionUser.id === messageBoards[messageBoardId].user_one &&
                                        !users[messageBoards[messageBoardId].user_two].isManager ?
                                        'Volunteer at -'
                                        :
                                        sessionUser.id === messageBoards[messageBoardId].user_two &&
                                        users[messageBoards[messageBoardId].user_one].isManager ?
                                        'Manager at -'
                                        :
                                        'Volunteer at -'
                                    }
                                </MessageUserName>
                                <MessageUserName theme={theme} size='18px' font='italic'>
                                    {sessionUser.id === messageBoards[messageBoardId].user_one && users[messageBoards[messageBoardId].user_two].isNonprofit ?
                                        organizations.nonprofits[users[messageBoards[messageBoardId].user_two].organizationId].name
                                        :
                                        sessionUser.id === messageBoards[messageBoardId].user_one && !users[messageBoards[messageBoardId].user_two].isNonprofit ?
                                        organizations.businesses[users[messageBoards[messageBoardId].user_two].organizationId].name
                                        :
                                        sessionUser.id === messageBoards[messageBoardId].user_two && users[messageBoards[messageBoardId].user_one].isNonprofit ?
                                        organizations.nonprofits[users[messageBoards[messageBoardId].user_one].organizationId].name
                                        :
                                        organizations.businesses[users[messageBoards[messageBoardId].user_one].organizationId].name
                                    }
                                </MessageUserName>
                            </BannerTextBox>
                        </MessengerBanner>
                        <MessageFeed>
                            {Object.values(messageBoards[messageBoardId].messages).map((message) =>
                                <MessageBox key={message.id}>
                                    <MessageContainer  direction={message.senderId === sessionUser.id ? 'row-reverse' : 'row'}>
                                        <UserAndTime>
                                            <MessageProfileIcon src={users[message.senderId].profileImageUrl} alt='User profile.' square='40px'/>
                                            <MessageTime theme={theme}>{daysAgo(message)}</MessageTime>
                                        </UserAndTime>
                                        <MessageContent theme={theme} direction={message.senderId === sessionUser.id ? 'row-reverse' : 'row'}>
                                            {message.content}
                                        </MessageContent>
                                    </MessageContainer>
                                    {message.postId &&
                                    <>
                                        <PostContainer theme={theme} direction={message.senderId === sessionUser.id ? 'row-reverse' : 'row'}>
                                            <PostBox theme={theme}>
                                                <PostCard post={posts[message.postId]} />
                                            </PostBox>
                                        </PostContainer>
                                        {message.senderId === sessionUser.id &&
                                            <div onClick={e => handleDelete(e, message)}>Delete</div>
                                        }
                                    </>
                                    }
                                    {(!sessionUser.isNonprofit && message.content.includes('I would like to pick up this item')) &&
                                        <MessageButtonBox>
                                            <CancelButton onClick={e => handleDecline(e, posts[message.postId])}>
                                                <ButtonText>Decline</ButtonText>
                                            </CancelButton>
                                            <SubmitButton onClick={e => handleAccept(e, posts[message.postId])}>
                                                <ButtonText>Accept</ButtonText>
                                            </SubmitButton>
                                        </MessageButtonBox>
                                    }
                                </MessageBox>
                            )}
                        </MessageFeed>
                        <MessagePageInput boardId={messageBoardId}/>
                    </>
                }
            </MessageThreadField>
        </MessagePageWrapper>
    )
}
