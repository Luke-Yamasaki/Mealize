//Hooks
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '../../Context/ThemeContext';

//Packages
import validator from 'validator';

//Actions
import { login } from '../../store/session';
import { hideModal, setCurrentModal } from '../../store/modal';

//Components
import { Logo } from '../../Assets/Logo';
import { SignupForm } from '../Signup';
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
    DemoBox,
    VolunteerDemoButton,
    NonprofitDemoButton,
    BusinessDemoButton,
    SubmitButton,
    ButtonText,
    CancelButton,
    InputButtonBox,
    ActionBox,
    ActionText,
    SignupText,
} from '../../Components/Styled/Buttons';


export const MessageForm = ({ post }) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [contentError, setContentError] = useState([]);
    const [imgeError, setImageError] = useState([]);
    const {theme} = useTheme();

    const handleContent = (e) => {
        e.preventDefault();
        setContentError([])
        setContent(e.target.value)
    }

    const handleImage = (e) => {
        e.preventDefault();
        if (e.target.value.length > 6) {
            setPasswordError([]);
            setPassword(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    const validateEmail = (email) => {
        const validation = validator.isEmail(email);
        return validation
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailErrArr = [];
        const passwordErrArr = [];

        if(!email.length) {
            emailErrArr.push('Please enter your email.');
        } else if(!password.length) {
            passwordErrArr.push('Please enter you password.')
        } else if(password.length < 6 ) {
            passwordErrArr.push('Passwords must be at least 6 characters long.')
        } else if (validateEmail(email) === false) {
            emailErrArr.push('Please enter a valid email address.')
        } else if(emailError.length > 0) {
            emailErrArr.push('Please resolve the following: ');
        } else if (passwordError.length > 0) {
            passwordErrArr.push('Please resolve the following: ')
        } else {
            const data = await dispatch(login(email, password));
            if(data && data.errors) {
                data.errors.forEach(error => error.toLowerCase().includes('password') ? passwordErrArr.push(error) : emailErrArr.push(error));
            } else {
                dispatch(hideModal())
            }
        }

        setEmailError(emailErrArr);
        setPasswordError(passwordErrArr);
    };

    const cancel = (e) => {
        e.preventDefault();
        setEmailError([]);
        setPasswordError([]);
        setEmail('');
        setPassword('');
        dispatch(hideModal());
    };

    const handleDemo = async (e) => {
        e.preventDefault();
        const emailErrArr = [];
        const passwordErrArr = [];

        let data;

        if(e.target.innerText.includes('Volunteer')) {
            data = await dispatch(login('volunteer_demo@testing.com', '064324651d0-72fe-49c5-aa1-0ba223f4fcmv3'))
        } else if(e.target.innerText.includes('Nonprofit')) {
            data = await dispatch(login('nonprofit_demo@testing.com', '062651d0-01fe-49c5-aaa1-0829ba3f4ff3'));
        } else {
            data = await dispatch(login('business_demo@testing.com', '8f08d594-2275-4c8f-93f3-4cb6dbed4b70'));
        }

        if(data.errors) {
            data.errors.forEach(error => error.toLowerCase().includes('password') ? passwordErrArr.push('Someone tampered with our demo data.') : emailErrArr.push('Someone tampered with our demo data.'));
            setEmailError(emailErrArr);
            setPasswordError(passwordErrArr)
        }
        dispatch(hideModal())
    };

    const showSignupForm = (e) => {
        e.preventDefault();
        dispatch(setCurrentModal(SignupForm))
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
                                    <Input name="content" type="text" value={content} theme={theme} onChange={handleContent}/>
                                </EmailLegend>
                            </Fieldset>
                        </InputErrorBox>
                        <InputErrorBox>
                            <ErrorBox theme={theme} height={imageError.length > 0 ? '20px' : '0px'}>
                                <Error>{imageError[0]}</Error>
                            </ErrorBox>
                            <Fieldset error={imageError.length > 0}>
                                <PasswordLegend htmlFor="password" theme={theme} error={imageError.length > 0}>Password
                                    <Input name='password' type='password' autoComplete="none" value={image} theme={theme} onChange={handlePassword}/>
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
