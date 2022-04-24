import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import { setCurrentModal, hideModal } from '../../store/modal';
import { SignupForm } from '../Signup';
import styles from './Login.module.css';
import styled from 'styled-components';
import banner from '../../Assets/Images/Mealize-banner.png'

const FormContainer = styled.fieldset`
    width: 450px;
    height: 650px;
    background: linear-gradient(#76D97E, #28A690);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const FormLegend = styled.legend`
    width: 300px;
    height: 80px;
    background-image: url(${banner});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    margin: 0px;
    padding-top: 0px;
`;

const Form = styled.form`
    width: 400px;
    height: 500px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-radius: 5px;
    border: 1px solid #F5F5F5;
    font-size: 32px;
    font-family: motiva-sans, sans-serif;
    font-weight: 900;
    text-align: left;
`;

const Fieldset = styled.fieldset`
    width: 340px;
    height: 35px;
    border: 1px solid #28A690;
    border-radius: 3px;
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
    font-weight: 600;
`;

const Input = styled.input`
    width: 348px;
    height: 30px;
    font-size: 16px;
    border: none;
    margin-left: -6px;
    margin-top: 1px;
    padding-left: 5px;
    border-radius: none;
    cursor: pointer;
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
    justify-content: flex-end;
    gap: 10px;
    align-items: center;
    width: 400px;
    height: 30px;
    margin-right: 20px;
`;

const DemoBox = styled.div`
    width: 400px;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

const VolunteerDemoButton = styled.div`
    width: 115px;
    height: 35px;
    background-color: #9AF2C0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    font-size: 12px;
    font-weight: 800;
    font-family: motiva-sans, sans-serif;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
`;

const NonprofitDemoButton = styled.div`
    width: 115px;
    height: 35px;
    background-color: #04B1D9;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    font-size: 12px;
    font-weight: 800;
    font-family: motiva-sans, sans-serif;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
`;

const BusinessDemoButton = styled.div`
    width: 115px;
    height: 35px;
    background-color: #024A59;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 12px;
    font-weight: 500;
    font-family: motiva-sans, sans-serif;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
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
        const data = await dispatch(login('nonprofit_demo@testing.com', '062651d0-01fe-49c5-aaa1-0829ba3f4ff3'));
        if(data && data.errors) {
            data.errors.forEach(error => error.toLowerCase().includes('email') ? setEmailError(error) : setPasswordError(error));
            return 'Error';
        }
        dispatch(hideModal());
    };

    const businessDemo = async (e) => {
        e.preventDefault();
        const data = await dispatch(login('business_demo@testing.com', '8f08d594-2275-4c8f-93f3-4cb6dbed4b70'));
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
        <FormContainer>
            <FormLegend/>
            <Form> Welcome back!
                {emailError.length > 0 && (
                    emailError.map((error, idx) => (
                        <Error key={idx}>{error}</Error>
                    ))
                )}
                <Fieldset>
                    <Legend style={{width: '40px'}} htmlFor='email'> Email
                        <Input
                            name="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Legend>
                </Fieldset>
                {passwordError.length > 0 && (
                    passwordError.map((error, idx) => (
                        <Error key={idx}>{error}</Error>
                    ))
                )}
                <Fieldset>
                    <Legend htmlFor="password">Password
                        <Input
                            name='password'
                            type='password'
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
                <DemoBox>
                    <VolunteerDemoButton onClick={nonprofitDemo}>Volunteer demo</VolunteerDemoButton>
                    <NonprofitDemoButton onClick={businessDemo}>Nonprofit demo</NonprofitDemoButton>
                    <BusinessDemoButton onClick={businessDemo}>Business demo</BusinessDemoButton>
                </DemoBox>
                <div className={styles.question}>Don't have an account?<div className={styles.modalOption} onClick={showSignupForm}>Sign up</div></div>
            </Form>
        </FormContainer>
    )
}
