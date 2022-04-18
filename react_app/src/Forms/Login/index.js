import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import { setCurrentModal, hideModal } from '../../store/modal';
import { SignupForm } from '../Signup';
import { AuthButton } from '../../Components/AuthButton.js';
import styles from './Login.module.css';
import styled from 'styled-components';

const Form = styled.form`
    width: 500px;
    height: 600px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: center;
`;

const Fieldset = styled.fieldset`
    width: 300px;
    height: 35px;
    border: none;
`;

const Legend = styled.legend`
    color: #28A690;
`;

const Input = styled.input`
    width: 300px;
    height: 30px;
    border: none;
`;

const Error = styled.p`
    color: #90311D;
    font-size: 14px;
    padding: 0px;
    margin: 0px;
`;

const ButtonBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 400px;
    height: 30px;
`;


export const LoginForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState([]);
    const [passwordError, setPasswordError] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if(data && data.errors) {
            data.errors.forEach(error => error.toLowerCase().includes('email') ? setEmailError(error) : setPasswordError(error));
            return 'Error';
        }
        dispatch(hideModal());
    };

    const cancel = (e) => {
        e.preventDefault();
        setEmail('');
        setPassword('');
        dispatch(hideModal());
    };

    const nonprofitDemo = async (e) => {
        e.preventDefault();
        const data = await dispatch(login('nonprofit-demo@testing.com', '062651d0-01fe-49c5-aaa1-0829ba3f4ff3'));
        if(data && data.errors) {
            data.errors.forEach(error => error.toLowerCase().includes('email') ? setEmailError(error) : setPasswordError(error));
            return 'Error';
        }
        dispatch(hideModal());
    };

    const businessDemo = async (e) => {
        e.preventDefault();
        const data = await dispatch(login('business-demo@testing.com', '8f08d594-2275-4c8f-93f3-4cb6dbed4b70'));
        if(data && data.errors) {
            data.errors.forEach(error => error.toLowerCase().includes('email') ? setEmailError(error) : setPasswordError(error));
            return 'Error';
        }
        dispatch(hideModal());
    };

    const showSignupForm = () => {
		dispatch(setCurrentModal(SignupForm));
	};

    return (
        <Form>
            {emailError.length && (
                emailError.map((error, i) => (
                    <Error key={i}>{error}</Error>
                ))
            )}
            <Fieldset>
                <Legend>Email
                    <Input
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Legend>
            </Fieldset>
            {passwordError.length && (
                passwordError.map((error, i) => (
                    <Error key={i}>{error}</Error>
                ))
            )}
            <Fieldset>
                <Legend>Password
                    <Input
                        name='password'
                        type='password'
                        htmlFor="password"
                        placeholder="Password"
                        autoComplete="none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Legend>
            </Fieldset>
            <ButtonBox>
                <AuthButton action={'submit'} onClick={handleSubmit}>Submit</AuthButton>
                <AuthButton action={'cancel'} onClick={cancel}>Cancel</AuthButton>
            </ButtonBox>
            <AuthButton action={'Nonprofit demo'} onClick={nonprofitDemo} />
            <AuthButton action={'Business demo'} onClick={businessDemo} />
            <div>Don't have an account?<div onClick={showSignupForm}>Sign up</div></div>
        </Form>
    )
}
