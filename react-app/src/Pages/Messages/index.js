//Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useTheme } from "../../Context/ThemeContext";

//Actions
import { getBoards } from "../../store/messages";

//Components
import { OrganizationCard } from "../../Components/Cards/OrganizationCard";
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
    MessageContent
} from "../../Components/Styled/Messages";

import { MessagePageInput } from "../../Forms/Message/MessagePageInput";

import { daysAgo } from "../../utils/Dates";

export const MessagesPage = () => {
    const sessionUser = useSelector(state => state.session.user);
    const messageBoards = useSelector(state => state.messageBoards);
    const posts = useSelector(state => state.posts.all);
    const organizations = useSelector(state => state.organizations);
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [messageBoardId, setMessageBoardId] = useState(false);
    const {theme} = useTheme();

    useEffect(() => {
        dispatch(getBoards());
        setLoaded(true);
    },[dispatch])

    const handleClick = (e, id) => {
        e.preventDefault();
        setMessageBoardId(id)
    }

    return loaded && (
        <MessagePageWrapper>
            <MessageSideMenu theme={theme}>
                <MessageList theme={theme}> All messages
                    <MessageItem key='placeholderItem'/>
                    {Object.values(messageBoards).map((messageBoard, idx) =>
                       (<MessageItem key={idx} theme={theme} onClick={(e) => handleClick(e, messageBoard.id)}>
                            <MessageProfileIcon src={users[messageBoard.messages[messageBoard.messages.length - 1].senderId].profileImageUrl} alt='User profile.'/>
                            <MessageUserBox>
                                <MessagePreviewBox>
                                    <MessageUserName theme={theme}>
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
                            <MessageProfileIcon size='55px'
                            src={users[sessionUser.id === messageBoards[messageBoardId].user_one ?
                            messageBoards[messageBoardId].user_two
                            : messageBoards[messageBoardId].user_one].profileImageUrl}
                            alt='User profile.'
                            />
                            <MessagePreviewBox>
                                <MessageUserName theme={theme} size='18px'>
                                {sessionUser.id === messageBoards[messageBoardId].user_one ?
                                    users[messageBoards[messageBoardId].user_two].firstName + ' ' + users[messageBoards[messageBoardId].user_two].lastName
                                    :
                                    users[messageBoards[messageBoardId].user_one].firstName + ' ' + users[messageBoards[messageBoardId].user_one].lastName
                                }
                                </MessageUserName>
                            </MessagePreviewBox>
                            <MessageUserName theme={theme} size='18px'>
                                {sessionUser.id === messageBoards[messageBoardId].user_one ?
                                    organizations.nonprofits[users[messageBoards[messageBoardId].user_one].organizationId].name
                                    :
                                    organizations.nonprofits[users[messageBoards[messageBoardId].user_one].organizationId].name
                                }
                                </MessageUserName>
                        </MessengerBanner>
                        {Object.values(messageBoards[messageBoardId].messages).map((message) =>
                        <>
                            <MessageContainer id={message.id} direction={message.senderId === sessionUser.id ? 'row-reverse' : 'row'}>
                                <UserAndTime>
                                    <MessageProfileIcon src={users[message.senderId].profileImageUrl} alt='User profile.'/>
                                    <MessageTime theme={theme}>{daysAgo(message)}</MessageTime>
                                </UserAndTime>
                                <MessageContent theme={theme} direction={message.senderId === sessionUser.id ? 'row-reverse' : 'row'}>
                                    {message.content}
                                </MessageContent>
                            </MessageContainer>
                            {message.postId &&
                            <PostContainer id={message.id} theme={theme} direction={message.senderId === sessionUser.id ? 'row-reverse' : 'row'}>
                                <PostBox theme={theme}>
                                    <PostCard post={posts[message.postId]} />
                                </PostBox>
                            </PostContainer>
                            }
                        </>

                        )}
                        <MessagePageInput boardId={messageBoardId}/>
                    </>
                }
            </MessageThreadField>
        </MessagePageWrapper>
    )
}
