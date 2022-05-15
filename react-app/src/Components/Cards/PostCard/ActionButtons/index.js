//Hooks
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from '../../../../Context/ThemeContext';
//Actions
import { setCurrentModal, showModal } from '../../../../store/modal';
import { removePost } from "../../../../store/posts";
//Components
import { ButtonBox } from "../../../Styled/PostCard";
import { QuestionBtn, RequestBtn, ButtonText } from "../../../Styled/Buttons";
import { QuestionText } from "../../../Styled/PostCard";
import  { DeliveryForm } from '../../../../Forms/Delivery';
import { MessageForm } from "../../../../Forms/Message";
import  { EditPostForm } from '../../../../Forms/Post/EditPost';

export const ActionButtons = ({post}) => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const {theme} = useTheme();

    const handleQuestion = () => {
        dispatch(setCurrentModal(() => <MessageForm post={post}/>));
        dispatch(showModal());
    };

    const handleRequest = () => {
        dispatch(setCurrentModal(() => <DeliveryForm post={post}/>));
        dispatch(showModal());
    };

    const handleEdit = () => {
        dispatch(setCurrentModal(() => <EditPostForm post={post}/>));
        dispatch(showModal());
    };

    const handleDelete = () => {
        dispatch(removePost(post.id))
    };

    return (
        <>
            {sessionUser?.isNonprofit && sessionUser.isManager ?
                <ButtonBox>
                {sessionUser?.id === post.userId &&
                    <>
                        <QuestionBtn theme={theme} onClick={handleEdit}>
                            <QuestionText theme={theme}>Edit Request</QuestionText>
                        </QuestionBtn>
                        <RequestBtn onClick={handleDelete}>
                            <ButtonText>Delete Item</ButtonText>
                        </RequestBtn>
                    </>
                }
                {sessionUser?.id !== post.userId &&
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
            !sessionUser?.isNonprofit ?
            <ButtonBox>
                <QuestionBtn theme={theme} onClick={sessionUser.id === post.userId ? handleEdit : handleQuestion}>
                    <QuestionText theme={theme}>{sessionUser.id === post.userId ? 'Edit Item' : 'Ask a question'}</QuestionText>
                </QuestionBtn>
                {post.isItem &&
                <RequestBtn onClick={sessionUser.id === post.userId ? handleDelete : handleRequest}>
                    <ButtonText>{sessionUser.id === post.userId ? 'Delete Item' : 'Send a request'}</ButtonText>
                </RequestBtn>
                }
            </ButtonBox>
            :
            <ButtonBox>
                <QuestionBtn theme={theme} onClick={sessionUser.id === post.userId ? handleEdit : handleQuestion}>
                    <QuestionText theme={theme}>{sessionUser.id === post.userId ? 'Edit Item' : 'Ask a question'}</QuestionText>
                </QuestionBtn>
                {post.isItem &&
                <RequestBtn onClick={sessionUser.id === post.userId ? handleDelete : handleRequest}>
                    <ButtonText>{sessionUser.id === post.userId ? 'Delete Item' : 'Send a request'}</ButtonText>
                </RequestBtn>
                }
            </ButtonBox>
            }
        </>



    )
}
