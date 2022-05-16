//Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useTheme } from "../../Context/ThemeContext";
import { OrganizationCard } from "../../Components/Cards/OrganizationCard";
import { PostCard } from "../../Components/Cards/PostCard";
import { PostsSection }  from "../../Components/Styled/Layout"
import { MessageItem, MessageList, MessagePreviewBox,MessageProfileIcon, MessageSideMenu, MessageTime, MessageUserBox, MessageUserName, MessageContentPreview, MessagePageWrapper, MessageThreadField, MessengerBanner, SelectMessageBox, SelectMessageText } from "../../Components/Styled/Messages";
import { getBoards } from "../../store/messages";
import { daysAgo } from "../../utils/Dates";

export const MessagesPage = () => {
    const sessionUser = useSelector(state => state.session.user);
    const messages = useSelector(state => state.messages);
    const posts = useSelector(state => state.posts.all);
    const organizations = useSelector(state => state.organizations);
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [messageBoardId, setMessageBoardId] = useState(false);
    const {theme} = useTheme();

    let messageThread;

    useEffect(() => {
        dispatch(getBoards());
        setLoaded(true);
    },[dispatch])

    useEffect(() => {
        if(messageBoardId) {
            messageThread = messages[messageBoardId]
        }
    },[messageBoardId])

    return loaded && (
        <MessagePageWrapper>
            <MessageSideMenu theme={theme}>
                <MessageList> All messages
                    {Object.values(messages).map((message, idx) =>
                        <MessageItem key={idx} theme={theme} onClick={setMessageBoardId(message.boardId)}>
                            <MessageProfileIcon src={users[message.senderId].profileImageUrl} alt='User profile.'/>
                            <MessageUserBox>
                                <MessagePreviewBox>
                                    <MessageUserName theme={theme}>{users[message.senderId].firstName + ' ' + users[message.senderId].lastName}</MessageUserName>
                                    <MessageContentPreview>{message.content}</MessageContentPreview>
                                </MessagePreviewBox>
                                <MessageTime theme={theme}>{daysAgo(message)}</MessageTime>
                            </MessageUserBox>
                        </MessageItem>
                    )}
                </MessageList>
            </MessageSideMenu>
            <MessageThreadField theme={theme}>
                {(!messageBoardId && messages) &&
                    <SelectMessageBox>
                        <SelectMessageText theme={theme}>
                            Please select a message from the left menu.
                        </SelectMessageText>
                    </SelectMessageBox>
                }
                {(!messageBoardId && !messages) &&
                    <SelectMessageBox>
                        <SelectMessageText theme={theme}>
                            {sessionUser.isManaer ? "You can send messages by clicking on the 'Ask a question' button on items or request." : "You can send messages by clicking on the 'Ask a question' or 'Notify manager' button on items or request."}
                        </SelectMessageText>
                    </SelectMessageBox>
                }
                {messageBoardId &&
                    <>
                        {Object.values(messageThread).map((message, idx) =>
                            <MessengerBanner id={idx}>
                                <MessageProfileIcon src={users[message.senderId].profileImageUrl} alt='User profile.'/>
                                    <MessageUserBox>
                                        <MessagePreviewBox>
                                            <MessageUserName theme={theme}>{users[message.senderId].firstName + ' ' + users[message.senderId].lastName}</MessageUserName>
                                            <MessageContentPreview>{message.content}</MessageContentPreview>
                                        </MessagePreviewBox>
                                        <MessageTime theme={theme}>{daysAgo(message)}</MessageTime>
                                    </MessageUserBox>
                            </MessengerBanner>
                        )}
                    </>
                }
            </MessageThreadField>
        </MessagePageWrapper>
    )
}
