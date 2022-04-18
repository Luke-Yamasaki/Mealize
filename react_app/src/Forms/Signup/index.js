import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, signup } from '../../store/session';
import { setCurrentModal, hideModal } from '../../store/modal';
import { LoginForm } from '../Login';
import styles from './Signup.module.css';
import styled from 'styled-components';

const Form = styled.form`
    width: 600px;
    height: 900px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-radius: 5px;
    font-size: 28px;
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

const Label = styled.label`
    font-size: 12px;
    width: 1000px;
    height: 30px;

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


export const SignupForm = () => {
    const dispatch = useDispatch();
    const organizations = useSelector(state => state.organizations);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState(''); // Add a default placeholder image in src
    const [jobDescription, setJobDescription] = useState('');
    const [age, setAge] = useState(18);
    const [deaf, setDeaf] = useState(false);
    const [autism, setAutism] = useState(false);
    const [learningDisabled, setLearningDisabled] = useState(false);
    const [lgbtq, setLgbtq] = useState(false);
    const [organizationId, setOrganizationId] = useState('');
    const [isNonprofit, setIsNonprofit] = useState(false);
    const [isManager, setIsManager] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            organizationId,
            firstName,
            lastName,
            profileImageUrl,
            jobDescription,
            age,
            deaf,
            autism,
            learningDisabled,
            lgbtq,
            isNonprofit,
            isManager,
            email,
            phone,
            confirm
        }
        const response = await dispatch(signup(data));
        if(response && response.errors) {
            setErrors(response.errors)
            return 'Errors were found.';
        }
        dispatch(hideModal());
    };

    const cancel = (e) => {
        e.preventDefault();
        setFirstName('');
        setLastName('');
        setProfileImageUrl('');
        setJobDescription('');
        setAge(18);
        setDeaf(false);
        setAutism(false);
        setLearningDisabled(false);
        setLgbtq(false);
        setOrganizationId('');
        setIsNonprofit(false);
        setIsManager(false);
        setEmail(false);
        setPhone(false);
        setPassword('');
        setConfirm('');
        dispatch(hideModal());
    };

    const nonprofitDemo = async (e) => {
        e.preventDefault();
        const data = await dispatch(login('nonprofit_demo@testing.com', '062651d0-01fe-49c5-aaa1-0829ba3f4ff3'));
        if(data && data.errors) {
            setErrors(data.errors)
            return 'Errors were found.';
        }
        dispatch(hideModal());
    };

    const businessDemo = async (e) => {
        e.preventDefault();
        const data = await dispatch(login('business_demo@testing.com', '8f08d594-2275-4c8f-93f3-4cb6dbed4b70'));
        if(data && data.errors) {
            setErrors(data.errors)
            return 'Errors were found.';
        }
        dispatch(hideModal());
    };

    const showLoginForm = () => {
		dispatch(setCurrentModal(LoginForm));
	};

    return (
        <Form> Welcome to Mealize!
            <Fieldset>
                <Legend style={{width: '80px'}}> First name
                    <Input
                        name="firstName"
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Legend>
            </Fieldset>
            <Fieldset>
                <Legend style={{width: '80px'}}> Last name
                    <Input
                        name="lastName"
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Legend>
            </Fieldset>
            <Fieldset>
                <Legend style={{width: '100px'}}> Profile picture
                    <Input
                        name="profileImageUrl"
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={profileImageUrl}
                        onChange={(e) => setProfileImageUrl(e.target.value)}
                    />
                </Legend>
            </Fieldset>
            <Fieldset style={{height: '200px'}}>
                <Legend style={{width: '110px'}}> Job description
                    <textarea
                        name="jobDescription"
                        placeholder="Add your job description (255 character limit)."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        style={{width: "300px", height: "100px", resize: 'none', fontSize: '14px'}}
                    />
                </Legend>
            </Fieldset>
            <Fieldset>
                <Legend style={{width: '40px'}}> Age
                    <Input
                        name="age"
                        type="number"
                        min='18'
                        max='90'
                        placeholder="Your age (must be 18 or older)."
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </Legend>
            </Fieldset>
            <Fieldset style={{height: '200px'}}>
                <Legend style={{width: '85px'}}> User details
                    <ButtonBox>
                        <Input
                                name="deaf"
                                type="checkbox"
                                value={deaf}
                                onChange={() => setDeaf(!deaf)}
                                style={{width: '50px', height: '50px'}}
                            />
                        <Label htmlFor='deaf'> Are you deaf?
                        </Label>
                    </ButtonBox>
                    <ButtonBox>
                        <Input
                            name="autism"
                            type="checkbox"
                            value={autism}
                            onChange={() => setAutism(!autism)}
                            style={{width: '50px', height: '50px'}}
                        />
                        <Label htmlFor='autism'> Do you have autism?</Label>
                    </ButtonBox>
                    <ButtonBox>
                        <Input
                            name="learningDisabled"
                            type="checkbox"
                            value={learningDisabled}
                            onChange={() => setLearningDisabled(!learningDisabled)}
                            style={{width: '50px', height: '50px'}}
                        />
                        <Label htmlFor='learningDisabled'> Do you have learning disabilities?</Label>
                    </ButtonBox>
                    <ButtonBox>
                        <Input
                            name="lgbtq"
                            type="checkbox"
                            value={lgbtq}
                            onChange={() => setLgbtq(!lgbtq)}
                            style={{width: '50px', height: '50px'}}
                        />
                        <Label htmlFor='lgbtq'> Are you a part of the LGBTQIA+ community?</Label>
                    </ButtonBox>
                </Legend>
            </Fieldset>
            <Fieldset style={{height: '200px'}}>
                <Legend style={{width: '150px'}}> Your organization
                    <Input
                        name='organizationId'
                        type='text'
                        value={organizationId}
                        onChange={(e) => setOrganizationId(e.target.value)}
                    />
                    <ButtonBox>
                        <Input
                            name="isNonprofit"
                            type="checkbox"
                            value={isNonprofit}
                            onChange={() => setIsNonprofit(!isNonprofit)}
                        />
                        <Label htmlFor='isNonprofit'> Is this a nonprofit?</Label>
                    </ButtonBox>
                    <ButtonBox>
                        <Input
                            name="isManager"
                            type="checkbox"
                            value={isManager}
                            onChange={() => setIsManager(!isManager)}
                        />
                        <Label htmlFor='isManager'> Are you a manager?</Label>
                    </ButtonBox>
                </Legend>
            </Fieldset>
            <Fieldset style={{height: '80px'}}>
                <Legend style={{width: '140px'}}> Contact information
                    <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        name="phone"
                        type="tel"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </Legend>
            </Fieldset>
            <Fieldset style={{height: '80px'}}>
                <Legend style={{width: '100px'}}> Set password
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholder="Confirm password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                    />
                </Legend>
            </Fieldset>
            <ButtonBox>
                <div role='button' className={styles.cancel} onClick={cancel}>Cancel</div>
                <div role='button' className={styles.submit} onClick={handleSubmit}>Submit</div>
            </ButtonBox>
            <div role='button' className={styles.nonprofit} onClick={nonprofitDemo}>Nonprofit demo</div>
            <div role='button' className={styles.business} onClick={businessDemo}>Business demo</div>
            <div className={styles.question}>Already have an account?<div className={styles.modalOption} onClick={showLoginForm}>Log in</div></div>
        </Form>
    )
}
