//Hooks
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '../../Context/ThemeContext';
import { useHistory } from 'react-router-dom';
//Packages
import * as nsfwjs from 'nsfwjs';
import Filter from 'bad-words';

//Helpers
import { getIp } from '../../utils/Forms/signup';
import { swearWords } from './swearWords';
import { uploadImage } from '../../utils/Forms/items';
//Actions
import { sendMessage } from '../../store/messages';
import { hideModal } from '../../store/modal';

//Components
import { Logo } from '../../Assets/Logo';
//Styled-components
import { LogoBox } from '../../Components/Styled/Navbar';
import {
    FormContainer,
    FormLegend,
    LogoType,
    Form,
    Fieldset,
    Legend,
    Input,
    Error,
    ErrorBox,
    FormTitleBox,
    FormTitle,
    MessageFormContent,
    InputContainer,
    InputErrorBox,
    MessageArea,
    MessageFieldset
} from '../../Components/Styled/AuthenticationForm';

import {
    SubmitButton,
    ButtonText,
    CancelButton,
    InputButtonBox,
    MessageButtonBox
} from '../../Components/Styled/Buttons';


export const MessageForm = ({ post }) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imageValidating, setImageValidating] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [contentError, setContentError] = useState([]);
    const [imageError, setImageError] = useState([]);
    const {theme} = useTheme();
    const history = useHistory();

    const filter = new Filter();

    filter.addWords(...swearWords);

    const handleContent = (e) => {
        e.preventDefault();
        setContentError([]);
        setImageError([]);
        setContent(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
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
                    const badUser = getIp();
                    return badUser
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
            return setContentError(contentErrArr)
        } else if(content.length > 500) {
            contentErrArr.push('Messages must be under 500 characters.')
            return setContentError(contentErrArr);
        } else if(content.length < 10) {
            contentErrArr.push('Messages must be greater than 10 characters.')
            return setContentError(contentErrArr);
        } else if(imageValidating) {
            return setImageError(['We are still validating your image.'])
        } else if(image && !imageError.length) {
            const formData = new FormData();
            formData.append("image", image);

            setImageUploading(true);

            const response = await uploadImage(formData)

                if (response.ok) {
                    const data = await response.json();
                    const imageUrl = await data.imageUrl;

                    const messageData = {content, imageUrl, receiverId: post.userId, postId: post.id};

                    const resData = await dispatch(sendMessage(messageData));
                    if(resData && resData.errors) {
                        resData.errors.forEach(error => error.toLowerCase().includes('message') ? contentErrArr.push(error) : imageErrArr.push(error));
                        setContentError(contentErrArr);
                        setImageError(imageErrArr);
                    } else {
                        setContentError(contentErrArr);
                        setImageError(imageErrArr);
                        dispatch(hideModal());
                        return history.push(`/messages/${resData.id}`);
                    }
                }
        } else {
            const messageData = {content, imageUrl: image, receiverId: post.userId, postId: post.id}
            const data = await dispatch(sendMessage(messageData));
            if(data && data.errors) {
                data.errors.forEach(error => error.toLowerCase().includes('message') ? contentErrArr.push(error) : imageErrArr.push(error));
                setContentError(contentErrArr);
                setImageError(imageErrArr);
            } else {
                setContentError(contentErrArr);
                setImageError(imageErrArr);
                dispatch(hideModal());
                return history.push(`/messages/${data.id}`);
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
        dispatch(hideModal());
    };

    const handleNull = (e) => {
        e.preventDefault();
        return null
    }

    return (
        <FormContainer>
            <FormLegend>
                <LogoBox width='175px'>
                    <Logo theme={theme} />
                    <LogoType theme={theme}>Mealize</LogoType>
                </LogoBox>
            </FormLegend>
            <Form theme={theme}>
                <FormTitleBox>
                    <FormTitle theme={theme}>Message form</FormTitle>
                </FormTitleBox>
                <MessageFormContent>
                    <InputContainer height='auto'>
                        <InputErrorBox>
                            <ErrorBox theme={theme} height={contentError.length > 0 ? '20px' : '0px'}>
                                <Error>{contentError[0]}</Error>
                            </ErrorBox>
                            <MessageFieldset error={contentError.length > 0} height='auto'>
                                <Legend htmlFor='content' theme={theme} error={contentError.length > 0}>Message</Legend>
                                    <MessageArea name="content" type="text" placeholder='Enter a message... (500 character limit)' maxLength='500' value={content} theme={theme} onChange={handleContent} required/>
                            </MessageFieldset>
                        </InputErrorBox>
                        <InputErrorBox>
                            <ErrorBox theme={theme} height={imageError.length > 0 ? '20px' : '0px'}>
                                <Error>{imageValidating ? 'Validating image' : imageError[0]}</Error>
                            </ErrorBox>
                            <Fieldset error={imageError.length > 0}>
                                <Legend htmlFor="image" theme={theme} width={imageValidating ? '145px' : imageUploading ? '150px' : '130px'} error={imageError.length > 0}>
                                    (Optional image)
                                    <Input id='image' theme={theme} lineHeight='10px' width='300px' type="file" accept="image/png, image/jpeg, image/jpg" onChange={updateImage}/>
                                </Legend>
                            </Fieldset>
                        </InputErrorBox>
                    </InputContainer>
                    <MessageButtonBox>
                        <InputButtonBox>
                            <CancelButton onClick={cancel}>
                                <ButtonText>Cancel</ButtonText>
                            </CancelButton>
                            <SubmitButton onClick={imageValidating ? handleNull : handleSubmit}>
                                <ButtonText>Submit</ButtonText>
                            </SubmitButton>
                        </InputButtonBox>
                    </MessageButtonBox>
                </MessageFormContent>
            </Form>
        </FormContainer>
    )
}
