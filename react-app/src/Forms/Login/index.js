//Hooks
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '../../Context/ThemeContext';
import { Redirect } from 'react-router-dom';
//Packages
import validator from 'validator';

//Actions
import { login } from '../../store/session';
import { hideModal, setCurrentModal } from '../../store/modal';

//Components
import { Logo } from '../../Assets/Logo';
import { SignupForm } from '../Signup';
import { VectorBox } from '../../Components/Styled/Layout';
import { PasswordIcon } from '../../Assets/Icons/Password';
import { ResetIcon } from '../../Components/Styled/Buttons';
import { InputResetContainer } from '../../Components/Styled/AuthenticationForm';

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



export const LoginForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState([]);
    const [passwordError, setPasswordError] = useState([]);
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const {theme} = useTheme();

    useEffect(() => {
        setPasswordError([])
    },[password])

    useEffect(() => {
        setEmailError([])
    },[email])

    const handleEmail = (e) => {
        e.preventDefault();
        setEmailError([])
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
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
            return setEmailError(['Please enter your email.'])
        } else if (validateEmail(email) === false) {
            return setEmailError(['Please enter a valid email address.'])
        } else if(emailError.length > 0) {
            return setEmailError(['Please enter a valid email.'])
        } else if(!password.length) {
            return setPasswordError(['Please enter you password.'])
        } else if(password.length < 6 ) {
            return setPasswordError(['Passwords must be at least 6 characters long.'])
        }  else if (passwordError.length > 0) {
            return setPasswordError(['Please resolve the following: '])
        } else {
            const data = await dispatch(login(email, password));
            if(data && data.errors) {
                data.errors.forEach(error => (error.toLowerCase().includes('password') && !error.toLowerCase().includes('email')) ? passwordErrArr.push(error) : emailErrArr.push(error));
                setEmailError(emailErrArr);
                return setPasswordError(passwordErrArr);
            } else {
                setEmailError(emailErrArr);
                setPasswordError(passwordErrArr);
                dispatch(hideModal());
                return <Redirect to='/' />
            }
        }
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
                    <FormTitle theme={theme}>Welcome back!</FormTitle>
                </FormTitleBox>
                <FormContent>
                    <InputContainer height={emailError.length > 0 ? '170px' : '150px'}>
                        <InputErrorBox>
                            <ErrorBox theme={theme} height={emailError.length > 0 ? '20px' : '0px'}>
                                <Error>{emailError[0]}</Error>
                            </ErrorBox>
                            <Fieldset error={emailError.length > 0}>
                                <EmailLegend htmlFor='email' theme={theme} error={emailError.length > 0}>Email
                                    <InputResetContainer>
                                        <Input name="email" type="email" placeholder='Email' value={email} theme={theme} onChange={handleEmail}/>
                                        <ResetIcon theme={theme} onClick={() => setEmail('')} data={email}>&#10006;</ResetIcon>
                                    </InputResetContainer>
                                </EmailLegend>
                            </Fieldset>
                        </InputErrorBox>
                        <InputErrorBox>
                            <ErrorBox theme={theme} height={passwordError.length > 0 ? '20px' : '0px'}>
                                <Error>{passwordError[0]}</Error>
                            </ErrorBox>
                            <Fieldset error={passwordError.length > 0}>
                                <PasswordLegend htmlFor="password" theme={theme} error={passwordError.length > 0}>Password
                                    <InputResetContainer>
                                        <Input theme={theme} cursor='text' name="password" type={passwordVisibility === false ? 'password' : 'text'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                        <VectorBox data={password} square='30px' onClick={() => setPasswordVisibility(!passwordVisibility)} cursor='pointer'>
                                            <PasswordIcon theme={theme} />
                                        </VectorBox>
                                        <ResetIcon theme={theme} onClick={() => setPassword('')} data={password}>&#10006;</ResetIcon>
                                    </InputResetContainer>
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
                        <DemoBox onClick={handleDemo}>
                            <VolunteerDemoButton>
                                <ButtonText weight='800'>Volunteer demo</ButtonText>
                            </VolunteerDemoButton>
                            <NonprofitDemoButton>
                                <ButtonText>Nonprofit demo</ButtonText>
                            </NonprofitDemoButton>
                            <BusinessDemoButton>
                                <ButtonText color='white' weight='500'>Business demo</ButtonText>
                            </BusinessDemoButton>
                        </DemoBox>
                    </ButtonBox>
                    <ActionBox>
                        <ActionText theme={theme}>Don't have an account?</ActionText>
                        <SignupText theme={theme} onClick={showSignupForm}>Sign up</SignupText>
                    </ActionBox>
                </FormContent>
            </Form>
        </FormContainer>
    )
}
