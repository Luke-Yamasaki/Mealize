//Hooks
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../../Context/ThemeContext';

//Packages
import * as nsfwjs from 'nsfwjs';
import Filter from 'bad-words';

//Helpers
import { getIp } from '../../../utils/Forms/signup';
import { swearWords } from '../swearWords';
//Actions
import { sendReply } from '../../../store/messages';
import { uploadImage } from '../../../utils/Forms/items';

//Components
import {
    Error,
    ErrorBox
} from '../../../Components/Styled/AuthenticationForm';


import {
    SubmitMessageButton,
    CancelMessageButton,
    FileBox,
    MessageErrorBox,
    MessageFileAndButtons,
    MessageFileInput,
    MessageFileLabel,
    MessageInput,
    MessageInputBox,
    MessageInputForm
} from '../../../Components/Styled/Messages';


export const MessagePageInput = ({boardId}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const messageBoard = useSelector(state => state.messageBoards[boardId])
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imageValidating, setImageValidating] = useState(false);
    const [contentError, setContentError] = useState([]);
    const [imageError, setImageError] = useState([]);
    const {theme} = useTheme();
    const [imageUploading, setImageUploading] = useState(false);

    const filter = new Filter();

    filter.addWords(...swearWords);

    const handleContent = (e) => {
        e.preventDefault();
        setContentError([])
        setContent(e.target.value)
    }

    const nsfwCheck = async(img) => {
        const nsfwArr = [];
        const model = await nsfwjs.load();
        const predictions = await model.classify(img);
        for(let i = 0; i < predictions.length; i++) {
            if(predictions[i].className === 'Neutral' || predictions[i].className === 'Drawing' || predictions[i].className === 'Sexy') {
                i++
            } else {
                if(predictions[i].probability > 0.7) {
                    nsfwArr.push("Adult content violates Mealize's community standards.");
                    const user = getIp();
                    return user
                }
            }
        }
        return nsfwArr;
    };

    const updateImage = async (e) => {
        e.preventDefault();
        setImageValidating(true);
        setImageError([]);
        const file = e.target.files[0];
        //Validate file size
        const fileSize = file.size / 1024 / 1024; //convert to megabytes
        if(fileSize > 2 ) {
            e.target.value = '';
            setImage('');
            return setImageError(['The file size is too large. Images must be under 2MB.']);
        } else {
            //Filter adult content
            const url = URL.createObjectURL(file);
            const img = new Image();
            img.src = url;
            const nsfwArr = await nsfwCheck(img);
            if(nsfwArr.length > 0) {
                setImage('');
                setContent('');
                const input = document.getElementById('image');
                input.value = '';
                window.location.href = 'https://www.google.com';
            } else {
                e.target.style.color = '#608F41'
                setImageError([])
                setImage(file)
            }
        }
        setImageValidating(false);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setImageError([]);
        setContentError([]);
        setImageUploading(false);
        setImageValidating(false);
        const contentErrArr = [];
        const imageErrArr = [];

        if(!content.length) {
            contentErrArr.push('Please enter a message.');
            return setContentError(contentErrArr)
        } else if(content.length > 500) {
            contentErrArr.push('Messages must be 500 characters or less.')
            return setContentError(contentErrArr)
        } else if(content.length < 2) {
            contentErrArr.push('Messages must be at least 2 characters long.')
            return setContentError(contentErrArr)
        } else if(imageValidating) {
            contentErrArr.push('We are validating your image.')
            return setContentError(contentErrArr)
        } else if(image && !imageError.length) {
            const formData = new FormData();
            formData.append("image", image);

            setImageUploading(true);

            const response = await uploadImage(formData)

                if (response.ok) {
                    const data = await response.json();
                    const imageUrl = await data.imageUrl;
                    const receiverId = messageBoard.user_one === sessionUser.id ? messageBoard.user_two : messageBoard.user_one

                    const messageData = {content, imageUrl, receiverId, boardId };

                    const resData = await dispatch(sendReply(messageData));
                    if(resData && resData.errors) {
                        resData.errors.forEach(error => error.toLowerCase().includes('message') ? contentErrArr.push(error) : imageErrArr.push(error));
                        setContentError(contentErrArr);
                        setImageError(imageErrArr);
                        setImageUploading(false);
                        setImageValidating(false);
                    } else {
                        const fileInput = document.getElementById('image');
                        fileInput.value = '';
                        setImage('');
                        setContent('')
                        setContentError(contentErrArr);
                        setImageError(imageErrArr);
                        setImageUploading(false);
                        setImageValidating(false);
                    }
                }
        } else {
            const receiverId = messageBoard.user_one === sessionUser.id ? messageBoard.user_two : messageBoard.user_one
            const messageData = {content, imageUrl: image, receiverId, boardId}
            const data = await dispatch(sendReply(messageData));
            if(data && data.errors) {
                data.errors.forEach(error => error.toLowerCase().includes('message') ? contentErrArr.push(error) : imageErrArr.push(error));
                setContentError(contentErrArr);
                setImageError(imageErrArr);
                setImageUploading(false);
                setImageValidating(false);
            } else {
                const fileInput = document.getElementById('image');
                fileInput.value = '';
                setImage('');
                setContent('');
                setContentError(contentErrArr);
                setImageError(imageErrArr);
                setImageUploading(false);
                setImageValidating(false);
            }
        }
    };


    const cancel = (e) => {
        e.preventDefault();
        setContentError([]);
        setImageError([]);
        setImageValidating(false);
        setContent('');
        setImage('');
        const input = document.getElementById('image');
        input.value = '';
    };

    const handleNull = (e) => {
        e.preventDefault();
        return null
    }

    return (
        <MessageInputForm theme={theme} onSubmit={handleSubmit}>
            {contentError.length > 0 &&
                <MessageErrorBox>
                    <ErrorBox theme={theme} height='20px'>
                        <Error>{contentError[0]}</Error>
                    </ErrorBox>
                    <MessageInputBox theme={theme}>
                        <MessageInput placeholder='Enter a message... (500 character limit)' maxLength='500' type='text' theme={theme} value={content} onChange={handleContent} required/>
                    </MessageInputBox>
                </MessageErrorBox>
            }
            {!contentError.length &&
                <MessageInputBox theme={theme}>
                    <MessageInput placeholder='Enter a message... (500 character limit)' maxLength='500' type='text' theme={theme} value={content} onChange={handleContent} required/>
                </MessageInputBox>
            }
            <MessageFileAndButtons>
                <MessageFileLabel htmlFor='image' error={imageError.length}>{imageUploading ? 'Image uploading...' : !image && !imageValidating ? '(Optional image)' : imageError.length > 0 ? imageError[0] : imageValidating ? 'Validating image...' : 'Image validated!'}</MessageFileLabel>
                <FileBox>
                    <MessageFileInput id='image' theme={theme} type="file" accept="image/png, image/jpeg, image/jpg" onChange={updateImage}/>
                </FileBox>
                <CancelMessageButton theme={theme} onClick={cancel}>Cancel</CancelMessageButton>
                <SubmitMessageButton theme={theme} onClick={imageValidating ? handleNull : handleSubmit}>Submit</SubmitMessageButton>
            </MessageFileAndButtons>
        </MessageInputForm>
    )
}
