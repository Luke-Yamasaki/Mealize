//Hooks
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { useTheme } from "../../Context/ThemeContext";

//Actions
import { deleteMessage, getBoards, deleteConversation} from "../../store/messages";
import { reviewRequest } from "../../store/deliveries";
import { getAllPosts } from "../../store/posts";

//Helpers
import { createdAtDaysAgo, daysAgo } from "../../utils/Dates";

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
    MessageBox,
    PreviewMessageTime,
    ImageMessage,
    MessageEditDelete,
    EditMessageButton,
    DeleteMessageButton
} from "../../Components/Styled/Messages";

import { MessagePageInput } from "../../Forms/Message/MessagePageInput";
import {
    ButtonText,
    CancelButton,
    MessageButtonBox,
    SubmitButton
} from "../../Components/Styled/Buttons";
import { EditMessageInput } from "../../Forms/Message/EditMessageInput";


export const MessagesPage = () => {
    const sessionUser = useSelector(state => state.session.user);
    const messageBoards = useSelector(state => state.messageBoards);
    const posts = useSelector(state => state.posts.all);
    console.log(posts)
    const organizations = useSelector(state => state.organizations);
    console.log(organizations)
    const users = useSelector(state => state.users);
    console.log(users)
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [messageBoardId, setMessageBoardId] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const {theme} = useTheme();

    useEffect(() => {
        if(sessionUser) {
            dispatch(getBoards());
            dispatch(getAllPosts())
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

    const handleDecline = async(e, post) => {
        e.preventDefault();
        console.log(post)
        const decline = {id:post.deliveryId, postId: post.id, approval: 'declined'}
        const data = await dispatch(reviewRequest(decline))
        console.log(data)
    };

    const handleAccept = async (e, post) => {
        e.preventDefault();
        console.log(post)
        const approve = {id:post.deliveryId, postId: post.id, approval: 'approved'}
        const data = await dispatch(reviewRequest(approve))
        console.log(data)
    };

    const handleEdit = (e) => {
        e.preventDefault();
        setEditMode(!editMode)
    };

    const changeMode = () => {
        setEditMode(false)
    };

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
                                <PreviewMessageTime theme={theme}>{createdAtDaysAgo(new Date(messageBoard.messages[messageBoard.messages.length - 1].createdAt))}</PreviewMessageTime>
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
                            {sessionUser.isManager ? "You can send messages by clicking on the 'Ask a question' button on items or request." : "You can send messages by clicking on the 'Ask a question' or 'Notify manager' button on items or request."}
                        </SelectMessageText>
                    </SelectMessageBox>
                }
                {(messageBoardId && Object.values(messageBoards).length > 0) &&
                    <>
                        <MessengerBanner theme={theme}>
                            {console.log(messageBoards[messageBoardId])}
                            {console.log(messageBoards[messageBoardId].user_one)}
                            {console.log(messageBoards[messageBoardId].user_two)}
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
                                        organizations.businesses[users[messageBoards[messageBoardId].user_two].organizationId].name
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
                                        {editMode === true ?
                                            <EditMessageInput message={message} changeMode={changeMode} />
                                            :
                                            <MessageContent theme={theme} direction={message.senderId === sessionUser.id ? 'row-reverse' : 'row'}>
                                                {message.content}
                                            </MessageContent>
                                        }
                                    </MessageContainer>
                                    {((!message.imageUrl && !message.postId) && message.senderId === sessionUser.id) &&
                                        <MessageEditDelete>
                                            <EditMessageButton theme={theme} onClick={e => handleEdit(e, message)}>Edit</EditMessageButton>
                                            <DeleteMessageButton theme={theme} onClick={e => handleDelete(e, message)}>Delete</DeleteMessageButton>
                                        </MessageEditDelete>
                                    }
                                    {((message.content.includes('I would like to pick up this item') && message.postId === null) || (message.content.includes('I found a good item!') && message.postId === null)) &&
                                    <>
                                        <PostContainer theme={theme} direction={message.senderId === sessionUser.id ? 'row-reverse' : 'row'}>
                                            <PostBox theme={theme}>
                                                <div>The item you found has been deleted...</div>
                                            </PostBox>
                                        </PostContainer>
                                        {message.senderId === sessionUser.id &&
                                        <MessageEditDelete>
                                            <EditMessageButton theme={theme} onClick={e => handleEdit(e, message)}>Edit</EditMessageButton>
                                            <DeleteMessageButton theme={theme} onClick={e => handleDelete(e, message)}>Delete</DeleteMessageButton>
                                        </MessageEditDelete>
                                        }
                                    </>
                                    }
                                    {message.postId &&
                                    <>
                                        <PostContainer theme={theme} direction={message.senderId === sessionUser.id ? 'row-reverse' : 'row'}>
                                            <PostBox theme={theme}>
                                                <PostCard post={posts[message.postId]} />
                                            </PostBox>
                                        </PostContainer>
                                        {message.senderId === sessionUser.id &&
                                        <MessageEditDelete>
                                            <EditMessageButton theme={theme} onClick={e => handleEdit(e, message)}>Edit</EditMessageButton>
                                            <DeleteMessageButton theme={theme} onClick={e => handleDelete(e, message)}>Delete</DeleteMessageButton>
                                        </MessageEditDelete>
                                        }
                                    </>
                                    }
                                     {message.imageUrl &&
                                    <>
                                        <PostContainer theme={theme} direction={message.senderId === sessionUser.id ? 'row-reverse' : 'row'}>
                                            <PostBox theme={theme}>
                                                <ImageMessage src={message.imageUrl} alt='User upload' style={{width:'300px', height:'300px'}}/>
                                            </PostBox>
                                        </PostContainer>
                                        {message.senderId === sessionUser.id &&
                                        <MessageEditDelete>
                                            <EditMessageButton theme={theme} onClick={e => handleEdit(e, message)}>Edit</EditMessageButton>
                                            <DeleteMessageButton theme={theme} onClick={e => handleDelete(e, message)}>Delete</DeleteMessageButton>
                                        </MessageEditDelete>
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
