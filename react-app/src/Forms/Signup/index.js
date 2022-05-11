//Hooks
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';

//Store
import { login, signup } from '../../store/session';
import { setCurrentModal, hideModal } from '../../store/modal';

//Helper
import { validateSignup, uploadProfileImage } from '../../utils/Forms/signup';
import * as nsfwjs from 'nsfwjs';

//Components
import { PreviewSection } from '../../Components/Preview';
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
    InputErrorBox,
    Legend,
    OptInfoLabel
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

import {
    PreviewWrapper,
    PreviewBox,
    UploadingBox,
    UploadingMessage
} from '../../Components/Styled/PreviewSection';
import { LoginForm } from '../Login';

export const SignupForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const organizations = useSelector(state => state.organizations);
    const { theme } = useTheme();
    console.log(organizations)

    // states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [image, setImage] = useState(null);
    const [dob, setDob] = useState((new Date().toISOString().split('T')[0].slice(0,4)-18).toString() + new Date().toISOString().split('T')[0].slice(4,11));
    const [deaf, setDeaf] = useState(false);
    const [wheelchair, setWheelchair] = useState(false);
    const [learningDisabled, setLearningDisabled] = useState(false);
    const [lgbtq, setLgbtq] = useState(false);
    const [organizationId, setOrganizationId] = useState('');
    const [isNonprofit, setIsNonprofit] = useState(false);
    const [isManager, setIsManager] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [imageUploading, setImageUploading] = useState(false);

    // errors
    const [firstNameError, setFirstNameError] = useState([]);
    const [lastNameError, setLastNameError] = useState([]);
    const [imageError, setImageError] = useState([]);
    const [dobError, setDobError] = useState([]);
    const [organizationError, setOrganizationError] = useState([]);
    const [emailError, setEmailError] = useState([]);
    const [phoneError, setPhoneError] = useState([]);
    const [passwordError, setPasswordError] = useState([]);
    const [confirmError, setConfirmError] = useState([]);
    const [responseErrors, setResponseErrors] = useState([]);

    const allOrganizations = {...organizations.nonprofits, ...organizations.businesses}

    useEffect(() => {
        allOrganizations[organizationId]?.isNonprofit ? setIsNonprofit(true) : setIsNonprofit(false);
    },[organizationId])

    //dates
    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    const date = new Date().getDate()

    const formattedMonth = month <= 9 ? '0' + (month+1).toString() : (month+1).toString()
    const formattedDate = date <= 9 ? `0${date}` : date.toString();
    // const today = year.toString() + '-' + formattedDate + '-' + formattedMonth
    const tooOld = (year - 90).toString() + '-' + formattedMonth + '-' + formattedDate;

    const specialCharacters = '(){}[]|`¬¦! "£$%^&*"<>:;#~_-';

    let userData = { organizationId, firstName, dob, dob, deaf, wheelchair, learningDisabled, lgbtq, isNonprofit, isManager,};

    useEffect(() => {
        userData = {organizationId, firstName, lastName, dob, deaf, wheelchair, learningDisabled, lgbtq, isNonprofit, isManager};
    },[organizationId, firstName, lastName, dob, deaf, wheelchair, learningDisabled, lgbtq, isNonprofit, isManager,])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);

        const inputData = { organizationId, firstName, lastName, dob, deaf, wheelchair, learningDisabled, lgbtq, isNonprofit, isManager, email, phone, password, confirm}

        const stagedPost = await validateSignup(inputData);

        if(stagedPost.message === 'success') {
            setImageUploading(true);
            const response = await uploadProfileImage(formData);

            if(response.ok) {
                const data = await response.json();
                const profileImageUrl = await data.imageUrl
                const userDataObj = { organizationId, firstName, profileImageUrl, lastName, dob, deaf, wheelchair, learningDisabled, lgbtq, isNonprofit, isManager, email, phone, password, confirm };

                const newUser = await dispatch(signup(userDataObj))
                if(newUser && !newUser.errors || !newUser.error) {
                    setImageUploading(false);
                    history.push('/')
                    dispatch(hideModal())
                } else {
                    const responseErrArr = []
                    responseErrArr.push(newUser)
                    setImageUploading(false);
                    setResponseErrors(responseErrArr);
                }
            }
        } else {
            setResponseErrors(stagedPost.errors)
        }
    };

    const handleErrors = (e) => {
        e.preventDefault();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneReg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

        if((firstName && !firstNameError.length) &&
            (dob && !dobError.length) &&
            (image && !imageError.length) &&
            (dob && !dobError.length )&&
            (organizationId && !organizationError.length) &&
            (email && !emailError.length) &&
            (phone && !phoneError.length) &&
            (password && !passwordError.length) &&
            (confirm && !confirmError.length)
            )
            {
                setResponseErrors([]);
                handleSubmit(e);
            }
        else if(!firstName || !dob || !image || !dob || !organizationId || !email || !phone || !password || !confirm) {
            setResponseErrors(['Please fill out all required fields.'])
        } else if (regex.test(email) === false) {
            setEmailError(['Not a valid email.'])
        } else if(regex.test(phone) === false) {
            setPhoneError(['Invalid phone number.'])
        } else if(password.length < 6 || confirm.length < 6) {
            setPasswordError(['Passwords must be at least 6 characters long.'])
        } else {
            setResponseErrors(['Please resolve all errors.'])
        }
    }

    const cancel = (e) => {
        e.preventDefault();
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

    const showLoginForm = (e) => {
        e.preventDefault();
		dispatch(setCurrentModal(LoginForm));
	};

    const repaint = (file) => {
        setImage(file)
    };

    const nsfwCheck = async() => {
        const nsfwArr = [];
        const img = document.getElementById('imageBox');
        const model = await nsfwjs.load();
        const predictions = await model.classify(img);
        console.log('Predictions: ', predictions);
        for(let i = 1; i < predictions.length; i++) {
            if(predictions[i].probability > 0.5) {
                alert('NSFW!!!');
                nsfwArr.push(predictions[i])
            }
        }
        return nsfwArr;
    };

    const updateImage = async (e) => {
        e.preventDefault();
        setResponseErrors([]);

        const file = e.target.files[0];
        repaint(file);
        const nsfwArr = nsfwCheck();

        nsfwArr.length > 0 ? alert('NSFW!!!') : alert('Ok')

        const fileSize = file.size / 1024 / 1024; //convert to megabytes

        if(fileSize > 2 ) {
            e.target.value = '';
            setImage('');
            setImageError(['The file size is too large. Images must be under 2MB.'])
        }
        else {
            e.target.style.color = '#608F41'
            setImageError([])
            setImage(file)
        }
    }

    const handleFName = (e) => {
        e.preventDefault();
        setResponseErrors([])
        const regex = /\d+/g;

        if(firstName.length >= 50) {
            setFirstNameError(['First names must be shorter than 50 characters.'])
        } else if(firstName.match(regex)) {
            setFirstNameError(['You cannot add an integer to your name.'])
        } else if(specialCharacters.includes(e.target.value)){
            setFirstNameError(['Special characters are not allowed.'])
        } else {
            setFirstNameError([])
            setFirstName(e.target.value)
        }
    }

    const handleLName = (e) => {
        e.preventDefault();
        setResponseErrors([])
        const regex = /\d+/g;

        if(lastName.length >= 50) {
            setLastNameError(['First names must be shorter than 50 characters.'])
        } else if(lastName.match(regex)) {
            setLastNameError(['You cannot add an integer to your name.'])
        } else if(specialCharacters.includes(e.target.value)){
            setLastNameError(['Special characters are not allowed.'])
        } else {
            setLastNameError([])
            setLastName(e.target.value)
        }
    }

    const handleEmail = (e) => {
        e.preventDefault();
        setResponseErrors([])

        if(email.length >= 255) {
            setEmailError(['Your email is too long.'])
        } else {
            setEmailError([])
            setEmail(e.target.value)
        }
    }

    const handlePhone = (e) => {
        e.preventDefault();
        setResponseErrors([])
        if(e.target.value.toString().length >= 15) {
            setPhoneError(['The phone number is too long.'])
        } else {
            setPhoneError([])
            setPhone(e.target.value)
        }
    }

    const handlePassword = (e) => {
        e.preventDefault();
        setResponseErrors([])

        if(specialCharacters.includes(e.target.value)) {
            setPasswordError(['Special characters are not allowed.'])
        } else {
            setPasswordError([])
            setPassword(e.target.value)
        }
    }

    const handleConfirm = (e) => {
        e.preventDefault();
        setResponseErrors([])
        if(!e.target.value === password) {
            setConfirmError(['Passwords do not match.'])
        } else {
            setConfirmError([])
            setConfirm(e.target.value)
        }
    }

    return (
        <PreviewWrapper width='1200px' height='652px'>
           <PreviewSection type='id' userData={userData}/>
            <FormContainer marginTop='-35px' width='500px' height='670px'>
                <FormLegend>
                    <LogoBox width='175px'>
                        <Logo theme={theme} />
                        <LogoType theme={theme}>Mealize</LogoType>
                    </LogoBox>
                </FormLegend>
                <Form width='450px' height='550px' theme={theme}>
                <FormTitleBox>
                    <FormTitle theme={theme}>Welcome to Mealize!</FormTitle>
                    <FormTitle theme={theme}>- Let's get started -</FormTitle>
                </FormTitleBox>
                <FormContent>
        {/* Organization */}
                    <InputContainer height={emailError.length > 0 ? '170px' : '150px'}>
                        <Fieldset style={{width: '235px'}}>
                            <Legend style={{width: '200px'}}> Select your organization
                            <div style={{display: 'flex', flexDirection: 'row', width: '200px', height: '30px', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <select style={{width: '200px', height: '25px'}} value={organizationId} onChange={(e) => setOrganizationId(e.target.value)} required>
                                    <optgroup label='Nonprofits'>
                                        {Object.values(organizations.nonprofits).map((organization, idx) => <option key={idx} value={organization.id}>{organization.name}</option>)}
                                    </optgroup>
                                    <optgroup label='Businesses'>
                                        {Object.values(organizations.businesses).map((organization, idx) => <option key={idx} value={organization.id}>{organization.name}</option>)}
                                    </optgroup>
                                </select>
                            </div>
                            </Legend>
                        </Fieldset>
                        <Fieldset style={{width: '235px'}}>
                            <Legend style={{width: '160px'}}> Are you a manager?
                            <ButtonBox style={{width: '200px', height: '50px', display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center', justifyContent: 'flex-start'}}>
                                <OptInfoLabel htmlFor='isManager' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Input name="isManager" type="checkbox" value={isManager} style={{width: '20px', height: '20px'}} onChange={() => setIsManager(!isManager)} required/>
                                Yes
                                </OptInfoLabel>
                                <OptInfoLabel htmlFor='isvolunteer' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Input name="isVolunteer" type="checkbox" value={isManager} style={{width: '20px', height: '20px'}} onChange={() => setIsManager(!isManager)} required/>
                                No
                                </OptInfoLabel>
                            </ButtonBox>
                            </Legend>
                        </Fieldset>
                    </InputContainer>
                </FormContent>
        {/* Name and DOB */}
                <FormContent>
                  <InputContainer height={emailError.length > 0 ? '170px' : '150px'}>
                        <InputErrorBox>
                            <ErrorBox theme={theme} height={firstNameError.length > 0 ? '20px' : '0px'}>
                                <Error>{firstNameError[0]}</Error>
                            </ErrorBox>
                            <Fieldset error={firstNameError.length > 0}>
                                <EmailLegend htmlFor='firName' theme={theme} error={firstNameError.length > 0}>First name
                                    <Input name="firname" type="text" autoComplete="none" value={firstName} theme={theme} onChange={handleFName} required/>
                                </EmailLegend>
                            </Fieldset>
                        </InputErrorBox>
                        <InputErrorBox>
                            <ErrorBox theme={theme} height={dobError.length > 0 ? '20px' : '0px'}>
                                <Error>{dobError[0]}</Error>
                            </ErrorBox>
                            <Fieldset error={dobError.length > 0}>
                                <PasswordLegend htmlFor="dob" theme={theme} error={dobError.length > 0}>Last name
                                    <Input name='dob' type='text' placeholder='First name' autoComplete="none" value={dob} theme={theme} onChange={handleLName} required/>
                                </PasswordLegend>
                            </Fieldset>
                        </InputErrorBox>
                        <InputErrorBox>
                            <ErrorBox theme={theme} height={dobError.length > 0 ? '20px' : '0px'}>
                                <Error>{dobError[0]}</Error>
                            </ErrorBox>
                            <Fieldset error={dobError.length > 0}>
                                <PasswordLegend htmlFor="dob" theme={theme} error={dobError.length > 0}>Date of birth
                                    <Input name='dob' type='date' min={tooOld} max={(year - 18).toString + '-' + formattedMonth + '-' + formattedDate} placeholder="Your DOB (must be 18 or older)." value={dob}theme={theme} onChange={(e) => setDob(e.target.value)} required/>
                                </PasswordLegend>
                            </Fieldset>
                        </InputErrorBox>
                    </InputContainer>
                </FormContent>
        {/* Profile Iamge */}
                <FormContent>
                    <InputContainer>
                        <InputErrorBox>
                            <ErrorBox theme={theme} height={imageError.length > 0 ? '20px' : '0px'}>
                                <Error>{imageError[0]}</Error>
                            </ErrorBox>
                            <Fieldset error={imageError.length > 0}>
                                <PasswordLegend htmlFor="image" theme={theme} error={imageError.length > 0}>Profile image
                                    <Input id="profileImage" type="file" accept="image/png, image/jpeg, image/jpg" onChange={updateImage} required/>
                                </PasswordLegend>
                            </Fieldset>
                        </InputErrorBox>
                    </InputContainer>
                </FormContent>
        {/* Credentials */}
                <FormContent>
                    <InputContainer>
                        <InputErrorBox>
                            <ErrorBox theme={theme} height={emailError.length > 0 ? '20px' : '0px'}>
                                <Error>{emailError[0]}</Error>
                            </ErrorBox>
                            <Fieldset error={emailError.length > 0}>
                                <PasswordLegend htmlFor="email" theme={theme} error={emailError.length > 0}>Email
                                    <Input  name="email" type="email" placeholder="Email" value={email} onChange={handleEmail} required/>
                                </PasswordLegend>
                            </Fieldset>
                        </InputErrorBox>
                        <InputErrorBox>
                            <ErrorBox theme={theme} height={phoneError.length > 0 ? '20px' : '0px'}>
                                <Error>{emailError[0]}</Error>
                            </ErrorBox>
                            <Fieldset error={phoneError.length > 0}>
                                <PasswordLegend htmlFor="phone" theme={theme} error={phoneError.length > 0}>Phone number
                                    <Input   name="phone" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Phone number" value={phone} onChange={handlePhone} required/>
                                </PasswordLegend>
                            </Fieldset>
                        </InputErrorBox>
                        <InputErrorBox>
                            <ErrorBox theme={theme} height={passwordError.length > 0 ? '20px' : '0px'}>
                                <Error>{passwordError[0]}</Error>
                            </ErrorBox>
                            <Fieldset error={passwordError.length > 0}>
                                <PasswordLegend htmlFor="password" theme={theme} error={passwordError.length > 0}>Password
                                    <Input  name="password" type="password" placeholder="Password" value={password} onChange={handlePassword} required/>
                                </PasswordLegend>
                            </Fieldset>
                        </InputErrorBox>
                        <InputErrorBox>
                            <ErrorBox theme={theme} height={confirmError.length > 0 ? '20px' : '0px'}>
                                <Error>{confirmError[0]}</Error>
                            </ErrorBox>
                            <Fieldset error={confirmError.length > 0}>
                                <PasswordLegend htmlFor="confirm" theme={theme} error={confirmError.length > 0}>Confirm password
                                    <Input  name="confirm" type="password" placeholder="Password" value={password} onChange={handleConfirm} required/>
                                </PasswordLegend>
                            </Fieldset>
                        </InputErrorBox>
                    </InputContainer>
                </FormContent>
        {/* Credentials */}
                <FormContent>
                    <InputContainer>
                        <Fieldset style={{height: '100px', width: '500px', margin: 'none', padding: 'none'}}>
                            <Legend style={{width: '130px'}}> Optional details
                                <div style={{width: '400px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <div style={{display: 'flex', flexDirection: 'row', width: '400px', height: '20px'}}>
                                        <ButtonBox style={{width: '225px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: '5px'}}>
                                            <OptInfoLabel htmlFor='deaf'>
                                                <Input
                                                        name="deaf"
                                                        type="checkbox"
                                                        value={deaf}
                                                        onChange={() => setDeaf(!deaf)}
                                                        style={{width: '20px', height: '20px'}}
                                                    />
                                            Are you deaf?
                                            </OptInfoLabel>
                                        </ButtonBox>
                                        <ButtonBox style={{width: '225px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: '5px'}}>
                                            <OptInfoLabel htmlFor='wheelchair'>
                                                <Input
                                                    name="wheelchair"
                                                    type="checkbox"
                                                    value={wheelchair}
                                                    onChange={() => setWheelchair(!wheelchair)}
                                                    style={{width: '20px', height: '20px'}}
                                                />
                                            Do you use a wheelchair?</OptInfoLabel>
                                        </ButtonBox>
                                    </div>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'row', width: '400px', height: '20px'}}>
                                    <ButtonBox style={{width: '225px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: '5px'}}>
                                            <OptInfoLabel htmlFor='learningDisabled'>
                                            <Input
                                                name="learningDisabled"
                                                type="checkbox"
                                                value={learningDisabled}
                                                onChange={() => setLearningDisabled(!learningDisabled)}
                                                style={{width: '20px', height: '20px'}}
                                            />
                                            Do you have learning disabilities?</OptInfoLabel>
                                        </ButtonBox>
                                        <ButtonBox style={{width: '270px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: '5px'}}>
                                            <OptInfoLabel htmlFor='lgbtq'>
                                                <Input
                                                    name="lgbtq"
                                                    type="checkbox"
                                                    value={lgbtq}
                                                    onChange={() => setLgbtq(!lgbtq)}
                                                    style={{width: '20px', height: '20px'}}
                                                />
                                            Are you a part of the LGBTQIA+ community?</OptInfoLabel>
                                    </ButtonBox>
                                </div>
                            </Legend>
                        </Fieldset>
                    </InputContainer>
                </FormContent>
                <ButtonBox>
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
                    <ActionText theme={theme}>Already have an account?</ActionText>
                    <SignupText theme={theme} onClick={showLoginForm}>Log in</SignupText>
                </ActionBox>
                </Form>
            </FormContainer>
        </PreviewWrapper>
    )
}


// Final slide
{/* <InputButtonBox>
    <CancelButton onClick={cancel}>
        <ButtonText>Cancel</ButtonText>
    </CancelButton>
    <SubmitButton onClick={handleSubmit}>
        <ButtonText>Submit</ButtonText>
    </SubmitButton>
</InputButtonBox> */}