import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import { setCurrentModal, hideModal } from '../../store/modal';
import { SignupForm } from '../Signup';
import { AuthButton } from '../../Components/AuthButton.js';
import styles from './Login.module.css';
import styled from 'styled-components';

const Form = styled.form`
    width: 400px;
    height: 500px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-radius: 5px;
    font-size: 32px;
`;

const Fieldset = styled.fieldset`
    width: 300px;
    height: 35px;
    border: 1px solid #28A690;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    margin: 0px;
    padding-left: 5px;
`;

const Legend = styled.legend`
    color: #28A690;
    font-size: 16px;
    width: 70px;
    height: 15px;
`;

const Input = styled.input`
    width: 308px;
    height: 30px;
    font-size: 16px;
    border: none;
    margin-left: -6px;
    margin-top: 1px;
    padding-left: 5px;
    border-radius: none;
`;

const Error = styled.p`
    color: #90311D;
    font-size: 14px;
    padding: 0px;
    margin: 0px;
    font-size: 16px;
`;

const ButtonBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 170px;
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
        <Form> Welcome back!
            {emailError.length > 0 && (
                emailError.map((error, i) => (
                    <Error key={i}>{error}</Error>
                ))
            )}
            <Fieldset>
                <Legend style={{width: '40px'}} htmlFor='email'> Email
                    <Input
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Legend>
            </Fieldset>
            {passwordError.length > 0 && (
                passwordError.map((error, i) => (
                    <Error key={i}>{error}</Error>
                ))
            )}
            <Fieldset>
                <Legend htmlFor="password">Password
                    <Input
                        name='password'
                        type='password'
                        placeholder="Password"
                        autoComplete="none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Legend>
            </Fieldset>
            <ButtonBox>
                <div role='button' className={styles.cancel} onClick={cancel}>Cancel</div>
                <div role='button' className={styles.submit} onClick={handleSubmit}>Submit</div>
            </ButtonBox>
            <div role='button' className={styles.nonprofit} onClick={nonprofitDemo}>Nonprofit demo</div>
            <div role='button' className={styles.business} onClick={businessDemo}>Business demo</div>
            <div className={styles.question}>Don't have an account?<div className={styles.modalOption} onClick={showSignupForm}>Sign up</div></div>
        </Form>
    )
}
