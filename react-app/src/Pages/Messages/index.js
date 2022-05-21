//Hooks
import { useEffect, useState } from "react";
import { Redirect, Route, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { useTheme } from "../../Context/ThemeContext";

//Actions
import { deleteMessage, getBoards, deleteConversation, sendReply} from "../../store/messages";
import { getAllDeliveries, reviewRequest } from "../../store/deliveries";
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
    AcceptButton,
    DeclineButton,
    MessageWithImages,
    SingleMessage,
    MessagesSpacer,
    MessageTitleBox,
    PostDeletedText
} from "../../Components/Styled/Messages";

import { MessagePageInput } from "../../Forms/Message/MessagePageInput";
import {
    ButtonText,
    MessageButtons,
    MessageButtonsDiv
} from "../../Components/Styled/Buttons";

import { EditMessageInput } from "../../Forms/Message/EditMessageInput";

import { EditIcon } from '../../Assets/Icons/Edit';
import { TrashIcon } from '../../Assets/Icons/Trash';
import { VectorBox } from "../../Components/Styled/Layout";

export const MessagesPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const messageBoards = useSelector(state => state.messageBoards);
    const posts = useSelector(state => state.posts.all);
    const organizations = useSelector(state => state.organizations);
    const users = useSelector(state => state.users);
    const deliveries = useSelector(state => state.deliveries);

    const [editMode, setEditMode] = useState(false);
    const {theme} = useTheme();

    useEffect(() => {
        if(sessionUser) {
            dispatch(getBoards());
            dispatch(getAllPosts());
            dispatch(getAllDeliveries());
        }
    },[dispatch])

    const handleClick = (e, id) => {
        e.preventDefault();
        return history.push(`/messages/${id}`)
    };

    const handleDelete = async(e, message) => {
        e.preventDefault();
        if(messageBoards[message.boardId].messages.length === 1) {
            const data = await dispatch(deleteConversation(message.boardId))
            return history.push('/messages');
        } else {
            const data = await dispatch(deleteMessage(message.id))
        }
    };

    const handleDecline = async(e, post, message) => {
        e.preventDefault();
        const deliveryArr = Object.values(deliveries).filter(delivery => delivery.postId === post.id);
        const decline = {id:deliveryArr[0].id, postId: post.id, approval: 'declined'}
        const data = await dispatch(reviewRequest(decline))
        if(data && !data.errors) {
            const messageData = {content: 'Your request has been declined.', imageUrl: '', receiverId: message.senderId, postId: post.id, boardId: message.boardId };
            dispatch(sendReply(messageData))
            dispatch(getAllPosts());
        } else {
            console.log(data)
        }
    };

    const handleAccept = async (e, post, message) => {
        e.preventDefault();
        const deliveryArr = Object.values(deliveries).filter(delivery => delivery.postId === post.id);
        const approve = {id:deliveryArr[0].id, postId: post.id, approval: 'approved'}
        const data = await dispatch(reviewRequest(approve));
        if(data && !data.errors) {
            const messageData = {content: 'Your request has been approved!', imageUrl: '', receiverId: message.senderId, postId: post.id, boardId: message.boardId };
            dispatch(sendReply(messageData))
            dispatch(getAllPosts());
        } else {
            console.log(data)
        }
    };

    const handleEdit = (e, message) => {
        e.preventDefault();
        editMode !== message.id ? setEditMode(message.id) : setEditMode(false)
    };

    const changeMode = () => {
        setEditMode(false)
    };

    if(!sessionUser) {
        return <Redirect to='/' />
    }

    return (
        <MessagePageWrapper>
            <MessageSideMenu theme={theme}>
                <MessageList theme={theme}>
                    All messages
                    <MessageItem key='placeholderItem'/>
                    {Object.values(messageBoards).reverse().map((messageBoard) =>
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
                {(!id && Object.values(messageBoards).length > 0) &&
                    <SelectMessageBox>
                        <SelectMessageText theme={theme}>
                            Please select a message from the left menu.
                        </SelectMessageText>
                    </SelectMessageBox>
                }
                {(!id && !Object.values(messageBoards).length) &&
                    <SelectMessageBox>
                        <SelectMessageText theme={theme}>
                            {sessionUser.isManager ? "You can send messages by clicking on the 'Ask a question' button on items or request." : "You can send messages by clicking on the 'Ask a question' or 'Notify manager' button on items or request."}
                        </SelectMessageText>
                    </SelectMessageBox>
                }
                <Route path='/messages/:id'>
                    {(id && (messageBoards[id] && Object.values(messageBoards).length > 0)) &&
                        <>
                            <MessengerBanner theme={theme}>
                                <MessageProfileIcon square='55px'
                                src={sessionUser.id === messageBoards[id].user_one ?
                                users[messageBoards[id].user_two].profileImageUrl
                                :
                                users[messageBoards[id].user_one].profileImageUrl
                                }
                                alt='User profile.'
                                />
                                <MessageUserName theme={theme} size='18px'>
                                {sessionUser.id === messageBoards[id].user_one ?
                                    users[messageBoards[id].user_two].firstName + ' ' + users[messageBoards[id].user_two].lastName
                                    :
                                    users[messageBoards[id].user_one].firstName + ' ' + users[messageBoards[id].user_one].lastName
                                }
                                </MessageUserName>
                                <BannerTextBox>
                                    <MessageUserName theme={theme} size='18px' width='120px'>
                                        {
                                            sessionUser.id === messageBoards[id].user_one &&
                                            users[messageBoards[id].user_two].isManager ?
                                            'Manager at -'
                                            :
                                            sessionUser.id === messageBoards[id].user_one &&
                                            !users[messageBoards[id].user_two].isManager ?
                                            'Volunteer at -'
                                            :
                                            sessionUser.id === messageBoards[id].user_two &&
                                            users[messageBoards[id].user_one].isManager ?
                                            'Manager at -'
                                            :
                                            'Volunteer at -'
                                        }
                                    </MessageUserName>
                                    <MessageUserName theme={theme} size='18px' font='italic'>
                                        {sessionUser.id === messageBoards[id].user_one && users[messageBoards[id].user_two].isNonprofit ?
                                            organizations.nonprofits[users[messageBoards[id].user_two].organizationId].name
                                            :
                                            sessionUser.id === messageBoards[id].user_one && !users[messageBoards[id].user_two].isNonprofit ?
                                            organizations.businesses[users[messageBoards[id].user_two].organizationId].name
                                            :
                                            sessionUser.id === messageBoards[id].user_two && users[messageBoards[id].user_one].isNonprofit ?
                                            organizations.nonprofits[users[messageBoards[id].user_one].organizationId].name
                                            :
                                            organizations.businesses[users[messageBoards[id].user_one].organizationId].name
                                        }
                                    </MessageUserName>
                                </BannerTextBox>
                            </MessengerBanner>
                            <MessageFeed>
                                {Object.values(messageBoards[id]?.messages).map((message) =>
                                    <MessageBox key={message.id}>
                                        <SingleMessage theme={theme}>
                                            <MessageContainer  direction={message.senderId === sessionUser.id ? 'row-reverse' : 'row'}>
                                                <UserAndTime>
                                                    <MessageProfileIcon src={users[message.senderId].profileImageUrl} alt='User profile.' square='40px'/>
                                                    <MessageTime theme={theme}>{daysAgo(message)}</MessageTime>
                                                </UserAndTime>
                                                {message.id === editMode && message.senderId === sessionUser.id ?
                                                    <EditMessageInput message={message} changeMode={changeMode} />
                                                    :
                                                    <MessageContent theme={theme} direction={message.senderId === sessionUser.id ? 'row-reverse' : 'row'}>
                                                        {message.content}
                                                    </MessageContent>
                                                }
                                            </MessageContainer>
                                            {((!message.imageUrl && !message.postId) && message.senderId === sessionUser.id) &&
                                                <MessageEditDelete>
                                                    <VectorBox square='20px' resize='true' cursor='pointer' onClick={e => handleEdit(e, message)}>
                                                        <EditIcon theme={theme} />
                                                    </VectorBox>
                                                    <VectorBox square='20px' resize='true' cursor='pointer' onClick={e => handleDelete(e, message)}>
                                                        <TrashIcon theme={theme} />
                                                    </VectorBox>
                                                </MessageEditDelete>
                                            }
                                            {((message.content.includes('I would like to pick up this item') && message.postId === null) || (message.content.includes('I found a good item!') && message.postId === null)) &&
                                            <MessageWithImages>
                                                <PostContainer theme={theme} direction={message.senderId === sessionUser.id ? 'row-reverse' : 'row'}>
                                                    <PostBox theme={theme}>
                                                        <PostDeletedText>The item you found has been deleted...</PostDeletedText>
                                                    </PostBox>
                                                </PostContainer>
                                                {message.senderId === sessionUser.id &&
                                                <MessageEditDelete>
                                                    <VectorBox square='20px' resize='true' cursor='pointer' onClick={e => handleEdit(e, message)}>
                                                        <EditIcon theme={theme} />
                                                    </VectorBox>
                                                    <VectorBox square='20px' resize='true' cursor='pointer' onClick={e => handleDelete(e, message)}>
                                                        <TrashIcon theme={theme} />
                                                    </VectorBox>
                                                </MessageEditDelete>
                                                }
                                            </MessageWithImages>
                                            }
                                            {(message.postId && !message.imageUrl) &&
                                            <MessageWithImages>
                                                <PostContainer theme={theme} marginTop='0px' direction={message.senderId === sessionUser.id ? 'row-reverse' : 'row'}>
                                                    <PostBox theme={theme}>
                                                        <PostCard post={posts[message.postId]} preview='true'/>
                                                    </PostBox>
                                                </PostContainer>
                                                {message.senderId === sessionUser.id &&
                                                <MessageEditDelete>
                                                    <VectorBox resize='true' cursor='pointer' square='20px' onClick={e => handleEdit(e, message)}>
                                                        <EditIcon  theme={theme} />
                                                    </VectorBox>
                                                    <VectorBox resize='true' cursor='pointer' square='20px' onClick={e => handleDelete(e, message)}>
                                                        <TrashIcon  theme={theme} />
                                                    </VectorBox>
                                                </MessageEditDelete>
                                                }
                                            </MessageWithImages>
                                            }
                                            {(message.imageUrl && !message.postId )&&
                                            <MessageWithImages>
                                                <PostContainer theme={theme} direction={message.senderId === sessionUser.id ? 'row-reverse' : 'row'}>
                                                    <PostBox theme={theme}>
                                                        <ImageMessage src={message.imageUrl} alt='User upload' style={{width:'300px', height:'300px'}}/>
                                                    </PostBox>
                                                </PostContainer>
                                                {message.senderId === sessionUser.id &&
                                                <MessageEditDelete>
                                                    <VectorBox square='20px' resize='true' cursor='pointer' onClick={e => handleEdit(e, message)}>
                                                        <EditIcon theme={theme}/>
                                                    </VectorBox>
                                                    <VectorBox square='20px' resize='true'cursor='pointer' onClick={e => handleDelete(e, message)}>
                                                        <TrashIcon theme={theme}/>
                                                    </VectorBox>
                                                </MessageEditDelete>
                                                }
                                            </MessageWithImages>
                                            }
                                            {(message.imageUrl && (message.postId && posts[message.postId])) &&
                                            <MessageWithImages>
                                                <PostContainer theme={theme} marginTop='10px' direction={message.senderId === sessionUser.id ? 'row-reverse' : 'row'}>
                                                    <PostBox theme={theme}>
                                                        <PostCard post={posts[message.postId]} preview='true'/>
                                                    </PostBox>
                                                </PostContainer>
                                                <PostContainer theme={theme} marginTop='15px' direction={message.senderId === sessionUser.id ? 'row-reverse' : 'row'}>
                                                    <PostBox theme={theme}>
                                                        <ImageMessage src={message.imageUrl} alt='User upload' style={{width:'300px', height:'300px'}}/>
                                                    </PostBox>
                                                </PostContainer>
                                                {message.senderId === sessionUser.id &&
                                                <MessageEditDelete>
                                                    <VectorBox square='20px' resize='true' cursor='pointer' onClick={e => handleEdit(e, message)}>
                                                        <EditIcon theme={theme} />
                                                    </VectorBox>
                                                    <VectorBox cursor='pointer' square='20px' onClick={e => handleDelete(e, message)}>
                                                        <TrashIcon  theme={theme} />
                                                    </VectorBox>
                                                </MessageEditDelete>
                                                }
                                            </MessageWithImages>
                                            }
                                            {((!sessionUser.isNonprofit && message.content.includes('I would like to pick up this item')) && (posts[message.postId]?.status === 1)) &&
                                                <MessageButtons>
                                                    <MessageButtonsDiv>
                                                        <DeclineButton onClick={e => handleDecline(e, posts[message.postId], message)}>
                                                            <ButtonText>Decline</ButtonText>
                                                        </DeclineButton>
                                                        <AcceptButton onClick={e => handleAccept(e, posts[message.postId], message)}>
                                                            <ButtonText>Accept</ButtonText>
                                                        </AcceptButton>
                                                    </MessageButtonsDiv>
                                                </MessageButtons>
                                            }
                                        </SingleMessage>
                                    </MessageBox>
                                )}
                            </MessageFeed>
                            <MessagePageInput boardId={id}/>
                        </>
                    }
                </Route>
            </MessageThreadField>
        </MessagePageWrapper>
    )
}
