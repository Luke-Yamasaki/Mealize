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
import { editMessage } from '../../../store/messages';

//Components
import {
    Input,
    Error,
    ErrorBox,
    InputErrorBox
} from '../../../Components/Styled/AuthenticationForm';

import {
    SubmitButton,
    ButtonText,
    CancelButton,
    MessageButtonBox
} from '../../../Components/Styled/Buttons';

import { MessageErrorBox, MessageFileAndButtons, MessageFileLabel, MessageInput, MessageInputBox, MessageInputForm } from '../../../Components/Styled/Messages';


export const EditMessageInput = ({message}) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState(message.content);
    const [image, setImage] = useState(message.imageUrl);
    const [imageValidating, setImageValidating] = useState(false);
    const [contentError, setContentError] = useState([]);
    const [imageError, setImageError] = useState([]);
    const {theme} = useTheme();

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
            if(predictions[i].className === 'Neutral') {
                i++
            } else {
                if(predictions[i].probability > 0.6) {
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
            setImageError(['The file size is too large. Images must be under 2MB.'])
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
        const contentErrArr = [];
        const imageErrArr = [];

        if(!content.length) {
            contentErrArr.push('Please enter a message.');
        } else if(content.length > 1000) {
            contentErrArr.push('Messages must be under 1000 characters.')
        } else if(content.length < 2) {
            contentErrArr.push('Messages must be at least 2 characters long.')
        } else if(imageValidating) {
            contentErrArr.push('We are validating your image.')
        } else if(content === message.content) {
        } else {
            const messageData = {content, image, boardId: message.boardId}
            const data = await dispatch(editMessage(messageData));
            if(data && data.errors) {
                data.errors.forEach(error => error.toLowerCase().includes('message') ? contentErrArr.push(error) : imageErrArr.push(error));
            } else {
                const input = document.getElementById('image');
                input.value = '';
                setImage('');
                setContent('')
            }
        }
        setContentError(contentErrArr);
        setImageError(imageErrArr);
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

    return (
        <MessageInputForm theme={theme} onSubmit={handleSubmit}>
            {contentError.length > 0 &&
                <MessageErrorBox>
                    <ErrorBox theme={theme} height='20px'>
                        <Error>{contentError[0]}</Error>
                    </ErrorBox>
                    <MessageInputBox theme={theme}>
                        <MessageInput type='text' theme={theme} value={content} onChange={handleContent} required/>
                    </MessageInputBox>
                </MessageErrorBox>
                }
                {!contentError.length &&
                    <MessageInputBox theme={theme}>
                        <MessageInput type='text' theme={theme} value={content} onChange={handleContent} required/>
                    </MessageInputBox>
                }
            <MessageFileAndButtons>
                <MessageFileLabel htmlFor='image'>{!image.length && !imageValidating ? '(Optional image)' : imageError.length > 0 ? imageError[0] : imageValidating ? 'Validating image...' : 'Image validated!'}</MessageFileLabel>
                <Input id='image' theme={theme} lineHeight='10px' width='230px' type="file" accept="image/png, image/jpeg, image/jpg" onChange={updateImage}/>
                <MessageButtonBox>
                    <CancelButton onClick={cancel}>
                        <ButtonText>Cancel</ButtonText>
                    </CancelButton>
                    <SubmitButton onClick={handleSubmit}>
                        <ButtonText>Submit</ButtonText>
                    </SubmitButton>
                </MessageButtonBox>
            </MessageFileAndButtons>
        </MessageInputForm>
    )
}
