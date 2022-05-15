//Hooks
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '../../Context/ThemeContext';

//Packages
import * as nsfwjs from 'nsfwjs';
import Filter from 'bad-words';

//Helpers
import { getIp } from '../../utils/Forms/signup';

//Actions
import { login } from '../../store/session';
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
    EmailLegend,
    Input,
    Error,
    ErrorBox,
    PasswordLegend,
    FormTitleBox,
    FormTitle,
    FormContent,
    InputContainer,
    InputErrorBox
} from '../../Components/Styled/AuthenticationForm';

import {
    ButtonBox,
    SubmitButton,
    ButtonText,
    CancelButton,
    InputButtonBox
} from '../../Components/Styled/Buttons';


export const MessageForm = ({ post }) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imageValidating, setImageValidating] = useState(false);
    const [contentError, setContentError] = useState([]);
    const [imageError, setImageError] = useState([]);
    const {theme} = useTheme();

    const filter = new Filter();

    const swearWords = ['fuck', 'shit', 'ass', 'damn', 'dammit', 'ass', 'arse', 'bastard', 'bitch', 'cocksucker', 'cunt', 'nigger', 'nigga', 'chink', 'beaner', 'slut', 'whore', 'twat'];
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

        if(!content.length) {
            contentErrArr.push('Please enter a message.');
        } else if(content.length > 1000) {
            contentErrArr.push('Messages must be under 1000 characters.')
        } else {
            const data = await dispatch(login(email, password));
            if(data && data.errors) {
                data.errors.forEach(error => error.toLowerCase().includes('password') ? passwordErrArr.push(error) : emailErrArr.push(error));
            } else {
                dispatch(hideModal())
            }
        }

        setContentError(contentErrArr);
        setImageError(imagedErrArr);
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
                <FormContent>
                    <InputContainer height={contentError.length > 0 ? '170px' : '150px'}>
                        <InputErrorBox>
                            <ErrorBox theme={theme} height={contentError.length > 0 ? '20px' : '0px'}>
                                <Error>{contentError[0]}</Error>
                            </ErrorBox>
                            <Fieldset error={contentError.length > 0}>
                                <EmailLegend htmlFor='content' theme={theme} error={contentError.length > 0}>Message
                                    <Input name="content" type="text" value={content} theme={theme} onChange={handleContent} required/>
                                </EmailLegend>
                            </Fieldset>
                        </InputErrorBox>
                        <InputErrorBox>
                            <ErrorBox theme={theme} height={imageError.length > 0 ? '20px' : '0px'}>
                                <Error>{imageError[0]}</Error>
                            </ErrorBox>
                            <Fieldset error={imageError.length > 0}>
                                <PasswordLegend htmlFor="image" theme={theme} error={imageError.length > 0}>Optional image
                                    <Input id='image' theme={theme} bg='none' lineHeight='10px' width='300px' type="file" accept="image/png, image/jpeg, image/jpg" onChange={updateImage}/>
                                </PasswordLegend>
                            </Fieldset>
                        </InputErrorBox>
                    </InputContainer>
                    <ButtonBox>
                        <InputButtonBox>
                            <CancelButton onClick={cancel}>
                                <ButtonText>Cancel</ButtonText>
                            </CancelButton>
                            <SubmitButton onClick={handleSubmit}>
                                <ButtonText>Submit</ButtonText>
                            </SubmitButton>
                        </InputButtonBox>
                    </ButtonBox>
                </FormContent>
            </Form>
        </FormContainer>
    )
}
