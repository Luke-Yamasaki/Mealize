//Hooks
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '../../Context/ThemeContext';
import { useModal } from '../../Context/ModalContext';

//Actions
import { login } from '../../store/session';
import { setCurrentModal, hideModal } from '../../store/modal';

//Components
import { SignupForm } from '../Signup';
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
    ButtonBox,
    DemoBox,
    VolunteerDemoButton,
    NonprofitDemoButton,
    BusinessDemoButton,
    ErrorBox,
    PasswordLegend
} from '../../Components/Styled/AuthenticationForm';

import styles from './Login.module.css';

export const LoginForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState([]);
    const [passwordError, setPasswordError] = useState([]);
    const {theme} = useTheme();
    const {setModalName} = useModal();

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
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
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
    }

    const reset = (e) => {
        e.preventDefault();
        setEmailError([]);
        setPasswordError([]);
        setEmail('');
        setPassword('');
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

    const handleSignup = (e) => {
        e.preventDefault();
        setModalName('signup')
    }

    return (
        <FormContainer>
            <FormLegend>
                <LogoBox width='175px'>
                    <Logo theme={theme} />
                    <LogoType theme={theme}>Mealize</LogoType>
                </LogoBox>
            </FormLegend>
            <Form theme={theme}> Welcome back!
                {emailError.length > 0 && (
                    emailError.map((error, idx) => (
                        <ErrorBox id={idx} theme={theme}>
                            <Error>{error}</Error>
                        </ErrorBox>
                    ))
                )}
                <Fieldset error={emailError.length > 0}>
                    <EmailLegend htmlFor='email' theme={theme} error={emailError.length > 0}> Email
                        <Input
                            name="email"
                            type="text"
                            value={email}
                            theme={theme}
                            onChange={handleEmail}
                        />
                    </EmailLegend>
                </Fieldset>
                {passwordError.length > 0 && (
                    passwordError.map((error, idx) => (
                        <ErrorBox id={idx} theme={theme}>
                            <Error key={idx}>{error}</Error>
                        </ErrorBox>
                    ))
                )}
                <Fieldset error={passwordError.length > 0}>
                    <PasswordLegend htmlFor="password" theme={theme} error={passwordError.length > 0}>Password
                        <Input
                            name='password'
                            type='password'
                            autoComplete="none"
                            value={password}
                            theme={theme}
                            onChange={handlePassword}
                        />
                    </PasswordLegend>
                </Fieldset>
                <ButtonBox>
                    <div className={styles.cancel} onClick={reset}>Reset</div>
                    <div className={styles.submit} onClick={handleSubmit}>Submit</div>
                </ButtonBox>
                <DemoBox onClick={handleDemo}>
                    <VolunteerDemoButton>Volunteer demo</VolunteerDemoButton>
                    <NonprofitDemoButton>Nonprofit demo</NonprofitDemoButton>
                    <BusinessDemoButton>Business demo</BusinessDemoButton>
                </DemoBox>
                <div className={styles.question}>Don't have an account?
                    <div className={styles.modalOption} onClick={handleSignup}>Sign up</div>
                </div>
            </Form>
        </FormContainer>
    )
}
