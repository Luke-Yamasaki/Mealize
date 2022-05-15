//Hooks
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from '../../../../Context/ThemeContext';
//Actions
import { setCurrentModal, showModal } from '../../../../store/modal';
import { removePost } from "../../../../store/posts";
import { sendMessage } from "../../../../store/messages";
import { getOneOrganization } from '../../../../utils/Organizations';
//Components
import { ButtonBox } from "../../../Styled/PostCard";
import { QuestionBtn, RequestBtn, ButtonText, EditBtn, DeleteBtn } from "../../../Styled/Buttons";
import { QuestionText } from "../../../Styled/PostCard";
import  { DeliveryForm } from '../../../../Forms/Delivery';
import { MessageForm } from "../../../../Forms/Message";
import  { EditPostForm } from '../../../../Forms/Post/EditPost';
import { useEffect } from "react";

export const ActionButtons = ({post}) => {
    const sessionUser = useSelector(state => state.session.user);
    const [organization, setOrganization] = useState('');
    const dispatch = useDispatch();
    const {theme} = useTheme();


    useEffect(() => {
        (async() => {
            const org = await getOneOrganization(sessionUser.organizationId);
            setOrganization(org)
        })()
    },[dispatch])


    const handleQuestion = () => {
        dispatch(setCurrentModal(() => <MessageForm post={post}/>));
        dispatch(showModal());
    };

    const handleRequest = () => {
        dispatch(setCurrentModal(() => <DeliveryForm post={post}/>));
        dispatch(showModal());
    };

    const handleNotify = () => {
        const messages = [];
        const managersArr = Object.values(organization.managers);
        managersArr.forEach(manager => {
            messages.push({
                content: 'I found a good item!',
                postId: post.id,
                imageUrl: '',
                receiverId: manager.id
            })
        })

        messages.forEach(message => {
            dispatch(sendMessage(message))
        })
    };

    const handleEdit = () => {
        dispatch(setCurrentModal(() => <EditPostForm post={post}/>));
        dispatch(showModal());
    };

    const handleDelete = () => {
        dispatch(removePost(post.id))
    };

    if(!sessionUser) {
        return null
    }

    return (
        <>
            {sessionUser.isNonprofit && sessionUser.isManager ?
                <ButtonBox>
                {sessionUser.id === post.userId &&
                    <>
                        <EditBtn theme={theme} onClick={handleEdit}>
                            <QuestionText theme={theme}>Edit Request</QuestionText>
                        </EditBtn>
                        <DeleteBtn onClick={handleDelete}>
                            <ButtonText>Delete Item</ButtonText>
                        </DeleteBtn>
                    </>
                }
                {sessionUser.id !== post.userId &&
                    <>
                        <QuestionBtn theme={theme} onClick={handleQuestion}>
                            <QuestionText theme={theme}>Ask a question</QuestionText>
                        </QuestionBtn>
                        <RequestBtn onClick={handleRequest}>
                            <ButtonText>Send a request</ButtonText>
                        </RequestBtn>
                    </>
                }
            </ButtonBox>
            :
            !sessionUser.isNonprofit && sessionUser.isManager ?
            <ButtonBox>
               {sessionUser.id === post.userId &&
                    <>
                        <EditBtn theme={theme} onClick={handleEdit}>
                            <QuestionText theme={theme}>Edit Item</QuestionText>
                        </EditBtn>
                        <DeleteBtn onClick={handleDelete}>
                            <ButtonText>Delete Item</ButtonText>
                        </DeleteBtn>
                    </>
                }
                {sessionUser.id !== post.userId &&
                    <>
                        <QuestionBtn theme={theme} onClick={handleQuestion}>
                            <QuestionText theme={theme}>Ask a question</QuestionText>
                        </QuestionBtn>
                        <RequestBtn onClick={handleRequest}>
                            <ButtonText>Send a request</ButtonText>
                        </RequestBtn>
                    </>
                }
            </ButtonBox>
            :
            <ButtonBox>
                <QuestionBtn theme={theme} onClick={handleQuestion}>
                    <QuestionText theme={theme}>Ask a question</QuestionText>
                </QuestionBtn>
                {post.isItem &&
                <RequestBtn onClick={handleNotify}>
                    <ButtonText>Notify manager</ButtonText>
                </RequestBtn>
                }
            </ButtonBox>
            }
        </>



    )
}
