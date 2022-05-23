//Hooks
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from '../../../../Context/ThemeContext';
import { useHistory } from "react-router-dom";
//Actions
import { setCurrentModal, showModal } from '../../../../store/modal';
import { removePost } from "../../../../store/posts";
import { sendMessage } from "../../../../store/messages";
//Components
import { ButtonBox } from "../../../Styled/PostCard";

import { QuestionBtn, RequestBtn, ButtonText, EditBtn, DeleteBtn } from "../../../Styled/Buttons";
import { QuestionText } from "../../../Styled/PostCard";
import  { DeliveryForm } from '../../../../Forms/Delivery';
import { MessageForm } from "../../../../Forms/Message";
import  { EditPostForm } from '../../../../Forms/Post/EditPost';


export const ActionButtons = ({ post }) => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const {theme} = useTheme();
    const history = useHistory();
    const organization = useSelector(state => state.organizations.session);

    const handleQuestion = () => {
        dispatch(setCurrentModal(() => <MessageForm post={post}/>));
        dispatch(showModal());
    };

    const handleRequest = () => {
        dispatch(setCurrentModal(() => <DeliveryForm post={post}/>));
        dispatch(showModal());
    };

    const handleNotify = async (e) => {
        e.preventDefault();
        const managersArr = Object.values(organization.managers);
        const messages = [];

        managersArr.forEach(manager => {
            messages.push({
                content: 'I found a good item!',
                postId: post?.id,
                imageUrl: '',
                receiverId: manager.id
            })
        })

        messages.forEach(message => {
            dispatch(sendMessage(message))
            .then(res => history.push(`/messages/${res.id}`))
        });
    };

    const handleEdit = () => {
        dispatch(setCurrentModal(() => <EditPostForm post={post}/>));
        dispatch(showModal());
    };

    const handleDelete = () => {
        dispatch(removePost(post.id))
        return history.push('/')
    };

    if(!sessionUser || (post?.status > 0 && post?.userId !== sessionUser?.id)) {
        return null
    }

    if(!post) {
        return null
    }

    return (
        <>
            {sessionUser.isNonprofit && sessionUser.isManager ?
                <ButtonBox number={!post?.isItem ? '1' : (sessionUser.id !== post?.userId && (post?.isItem && post?.status === 0) ) ? '2' : '1'}>
                    {(sessionUser.isManager && sessionUser.id === post?.userId) &&
                    <>
                        <EditBtn theme={theme} onClick={handleEdit}>
                            <QuestionText theme={theme}>Edit Request</QuestionText>
                        </EditBtn>
                        <DeleteBtn onClick={handleDelete}>
                            <ButtonText>Delete Item</ButtonText>
                        </DeleteBtn>
                    </>
                    }
                    {(sessionUser.id !== post?.userId && sessionUser.organizationId !== post?.organizationId) &&
                    <>
                        <QuestionBtn theme={theme} onClick={handleQuestion}>
                            <QuestionText theme={theme}>Ask a question</QuestionText>
                        </QuestionBtn>
                        {(post?.isItem && post?.status === 0) &&
                            <RequestBtn onClick={handleRequest}>
                                <ButtonText>Send a request</ButtonText>
                            </RequestBtn>
                        }
                    </>
                    }
                </ButtonBox>
            :
            !sessionUser.isNonprofit && sessionUser.isManager ?
            <ButtonBox number={sessionUser.id === post?.userId ? '2' : '1'}>
               {(sessionUser.id === post?.userId) &&
                    <>
                        <EditBtn theme={theme} onClick={handleEdit}>
                            <QuestionText theme={theme}>Edit Item</QuestionText>
                        </EditBtn>
                        <DeleteBtn onClick={handleDelete}>
                            <ButtonText>Delete Item</ButtonText>
                        </DeleteBtn>
                    </>
                }
                {(sessionUser.organizationId !== post?.organizationId && sessionUser.id !== post?.userId) &&
                    <>
                        <QuestionBtn theme={theme} onClick={handleQuestion}>
                            <QuestionText theme={theme}>Ask a question</QuestionText>
                        </QuestionBtn>
                    </>
                }
            </ButtonBox>
            :
            ((sessionUser.isNonprofit && !sessionUser.isManager) && sessionUser.organizationId !== post?.organizationId) ?
            <ButtonBox number={post?.isItem && post?.status === 0 ? '2' : '1'}>
                <QuestionBtn theme={theme} onClick={handleQuestion}>
                    <QuestionText theme={theme}>Ask a question</QuestionText>
                </QuestionBtn>
                {post?.isItem && post?.status === 0 &&
                <RequestBtn onClick={handleNotify}>
                    <ButtonText>Notify manager</ButtonText>
                </RequestBtn>
                }
            </ButtonBox>
            :
            <div style={{display: 'none'}}></div>
            }
        </>



    )
}
