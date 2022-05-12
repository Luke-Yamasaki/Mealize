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
import { ageBoundary } from '../../utils/Dates';
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
    OptInfoLabel,
    CheckBoxContainer,
    InfoLabelText,
    OrganizationSelect,
    InputResetContainer,
    DragNDrop
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
    PreviousButton,
    ResetIcon,
} from '../../Components/Styled/Buttons';

import {
    PreviewWrapper,
    PreviewBox,
    UploadingBox,
    UploadingMessage
} from '../../Components/Styled/PreviewSection';
import { LoginForm } from '../Login';
import { PasswordIcon } from '../../Assets/Icons/Password';
import { VectorBox } from '../../Components/Styled/Layout';

export const SignupForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const organizations = useSelector(state => state.organizations);
    const { theme } = useTheme();

    // form states
    const [formSection, setFormSection] = useState('first');
    //first section
    const [organizationId, setOrganizationId] = useState('');
    const [isNonprofit, setIsNonprofit] = useState(false);
    const [isManager, setIsManager] = useState(false);
    //second section
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState((new Date().toISOString().split('T')[0].slice(0,4)-18).toString() + new Date().toISOString().split('T')[0].slice(4,11));
    //third section
    const [image, setImage] = useState(null);
    //user auth credential section
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [confirmVisibility, setConfirmVisibility] = useState(false)
    //optional section
    const [deaf, setDeaf] = useState(false);
    const [wheelchair, setWheelchair] = useState(false);
    const [learningDisabled, setLearningDisabled] = useState(false);
    const [lgbtq, setLgbtq] = useState(false);
    //S3 uploading section
    const [imageUploading, setImageUploading] = useState(false);

    const [userData, setUserData] = useState('');
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

    //Spreading all organizations
    const allOrganizations = {...organizations.nonprofits, ...organizations.businesses}

    const ageBoundariesObj = ageBoundary();
    const minDate = ageBoundariesObj.old;
    const maxDate = ageBoundariesObj.young;

    const specialCharacters = '(){}[]|`¬¦! "£$%^&*"<>:;#~_-';

    //props to pass to preview Id card
    useEffect(() => {
        let userInfo = { organizationId, isNonprofit, isManager, firstName, lastName, dob, deaf, wheelchair, learningDisabled, lgbtq };
        console.log(userInfo);
        console.log(userData);
        setUserData(userInfo);
        return () => console.log('???')
    },[organizationId, isNonprofit, isManager, firstName, lastName, dob, image, deaf, wheelchair, learningDisabled, lgbtq ])

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

    const nsfwCheck = async(img) => {
        const nsfwArr = [];
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
        //Filter adult content
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.src = url;
        const nsfwArr = await nsfwCheck(img);
        nsfwArr.length > 0 ? setResponseErrors(["Adult content violates Mealize's community standards."]) : setResponseErrors([]);

        //If good, preview the image
        repaint(file);

        //Validate file size
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

    const droppedImage = async (e) => {
        e.preventDefault();
        if(e.dataTransfer.items) {
            for(let i = 0; i < e.dataTransfer.items.length; i++) {
                if(e.dataTransfer.items[i].kind === 'file') {
                    const file = e.dataTransfer.items[i].getAsFile();
                    //Filter adult content
                    const url = URL.createObjectURL(file);
                    const img = new Image();
                    img.src = url;
                    const nsfwArr = await nsfwCheck(img);
                    nsfwArr.length > 0 ? setResponseErrors(["Adult content violates Mealize's community standards."]) : setResponseErrors([]);
                    //If good, preview the image
                    repaint(file);
                    //Validate file size
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
            }
        } else {
            for(let i = 0; i < e.dataTransfer.files.length; i++) {
                console.log(e.dataTransfer.files[i].name)
            }
        }
    };

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

    const handleNext = (e) => {
        e.preventDefault();

        formSection === 'first' ?
        setFormSection('second')
        :
        formSection === 'second' ?
        setFormSection('third')
        :
        formSection === 'third' ?
        setFormSection('fourth')
        :
        setFormSection('optional')
    }

    const handlePrevious = (e) => {
        e.preventDefault();
        formSection === 'second' ?
        setFormSection('first')
        :
        formSection === 'third' ?
        setFormSection('second')
        :
        formSection === 'fourth' ?
        setFormSection('third')
        :
        setFormSection('fourth')
    }

    return (
        <PreviewWrapper width='1000px' height='652px'>
            <PreviewBox>
                {userData && <PreviewSection type='id' userData={userData}/>}
                <UploadingBox>
                    <UploadingMessage>Display when uploading image to S3</UploadingMessage>
                </UploadingBox>
            </PreviewBox>
            <FormContainer marginTop='-35px' width='500px' height='670px'>
                <FormLegend>
                    <LogoBox width='175px'>
                        <Logo theme={theme} />
                        <LogoType theme={theme}>Mealize</LogoType>
                    </LogoBox>
                </FormLegend>
                <Form width='450px' height='550px' theme={theme}>
                <FormTitleBox>
                    <FormTitle theme={theme} margin='80px 0px 0px 0px'>Welcome to Mealize!</FormTitle>
                    <FormTitle theme={theme} fontSize='16px' margin='10px 0px 0px 0px' color='rgba(255, 0, 0, 0.75)'>{formSection === 'optional' ? '- These fields are optional -' : '- All fields are required -'}</FormTitle>
                </FormTitleBox>
                {formSection === 'first' &&
                    <FormContent>
                        <InputContainer height='200px' margin='50px 0px 0px 0px'>
                            <Fieldset>
                                <Legend theme={theme} width='223px'> Do you work for a nonprofit?
                                <CheckBoxContainer>
                                    <OptInfoLabel htmlFor='isManager'>
                                    <Input name="isNonprofit" type="checkbox" width='20px' height='20px' onChange={() => isNonprofit === false ? setIsNonprofit(true) : setIsNonprofit(false)} checked={isNonprofit === true}/>
                                    <InfoLabelText theme={theme}>Yes</InfoLabelText>
                                    </OptInfoLabel>
                                    <OptInfoLabel htmlFor='isvolunteer'>
                                    <Input name="isNonprofit" type="checkbox" width='20px' height='20px' onChange={() => setIsNonprofit(!isNonprofit)} checked={isNonprofit === false}/>
                                    <InfoLabelText theme={theme}>No</InfoLabelText>
                                    </OptInfoLabel>
                                </CheckBoxContainer>
                                </Legend>
                            </Fieldset>
                            <Fieldset>
                                <Legend theme={theme} width='190px'> Select your organization
                                    <OrganizationSelect value={organizationId} onChange={(e) => setOrganizationId(e.target.value)} required>
                                        {isNonprofit &&
                                            <optgroup label='Nonprofits'>
                                                {Object.values(organizations.nonprofits).map((organization, idx) => <option key={idx} value={organization.id}>{organization.name}</option>)}
                                            </optgroup>
                                        }
                                        {!isNonprofit &&
                                            <optgroup label='Businesses'>
                                                {Object.values(organizations.businesses).map((organization, idx) => <option key={idx} value={organization.id}>{organization.name}</option>)}
                                            </optgroup>
                                        }
                                    </OrganizationSelect>
                                </Legend>
                            </Fieldset>
                            <Fieldset>
                                <Legend theme={theme} width='160px'> Are you a manager?
                                <CheckBoxContainer>
                                    <OptInfoLabel htmlFor='isManager'>
                                    <Input name="isManager" type="checkbox" width='20px' height='20px' onChange={() => isManager === false ? setIsManager(true) : setIsManager(false)} checked={isManager === true}/>
                                    <InfoLabelText theme={theme}>Yes</InfoLabelText>
                                    </OptInfoLabel>
                                    <OptInfoLabel htmlFor='isvolunteer'>
                                    <Input name="isVolunteer" type="checkbox" width='20px' height='20px' onChange={() => isManager === true ? setIsManager(false) : setIsManager(true)} checked={isManager === false}/>
                                    <InfoLabelText theme={theme}>No</InfoLabelText>
                                    </OptInfoLabel>
                                </CheckBoxContainer>
                                </Legend>
                            </Fieldset>
                        </InputContainer>
                    </FormContent>
                }
                {formSection === 'second' &&
                    <FormContent>
                    <InputContainer height='200px' margin='50px 0px 0px 0px'>
                            <InputErrorBox>
                                <ErrorBox theme={theme} height={firstNameError.length > 0 ? '20px' : '0px'}>
                                    <Error>{firstNameError[0]}</Error>
                                </ErrorBox>
                                <Fieldset error={firstNameError.length > 0}>
                                    <Legend htmlFor='firstName' theme={theme} error={firstNameError.length > 0} width='85px'>First name
                                        <InputResetContainer>
                                            <Input name="firstName" cursor='text' type="text" placeholder='First name' autoComplete="none" value={firstName} theme={theme} onChange={handleFName} required/>
                                            <ResetIcon theme={theme} onClick={() => setFirstName('')} data={firstName}>&#10006;</ResetIcon>
                                        </InputResetContainer>
                                    </Legend>
                                </Fieldset>
                            </InputErrorBox>
                            <InputErrorBox>
                                <ErrorBox theme={theme} height={lastNameError.length > 0 ? '20px' : '0px'}>
                                    <Error>{lastNameError[0]}</Error>
                                </ErrorBox>
                                <Fieldset error={lastNameError.length > 0}>
                                    <Legend htmlFor="lastName" theme={theme} error={lastNameError.length > 0} width='85px'>Last name
                                        <InputResetContainer>
                                            <Input name='lastName' cursor='text' type='text' placeholder='Last name' autoComplete="none" value={lastName} theme={theme} onChange={handleLName} required/>
                                            <ResetIcon theme={theme} onClick={() => setLastName('')} data={lastName}>&#10006;</ResetIcon>
                                        </InputResetContainer>
                                    </Legend>
                                </Fieldset>
                            </InputErrorBox>
                            <InputErrorBox>
                                <ErrorBox theme={theme} height={dobError.length > 0 ? '20px' : '0px'}>
                                    <Error>{dobError[0]}</Error>
                                </ErrorBox>
                                <Fieldset error={dobError.length > 0}>
                                    <Legend htmlFor="dob" theme={theme} error={dobError.length > 0} width='100px'>Date of birth
                                        <InputResetContainer>
                                            <Input name='dob' type='date' cursor='pointer' min={minDate} max={maxDate} width='125px' value={dob} theme={theme} onChange={(e) => setDob(e.target.value)} required/>
                                        </InputResetContainer>
                                    </Legend>
                                </Fieldset>
                            </InputErrorBox>
                        </InputContainer>
                    </FormContent>
                }
                {formSection === 'third' &&
                    <FormContent>
                        <InputContainer height='275px' margin='50px 0px 0px 0px'>
                            <InputErrorBox height='275px'>
                                <ErrorBox theme={theme} height={imageError.length > 0 ? '20px' : '0px'}>
                                    <Error>{imageError[0]}</Error>
                                </ErrorBox>
                                <Fieldset error={imageError.length > 0} height='275px'>
                                    <Legend htmlFor='imageBox' theme={theme} error={imageError.length > 0} width='105px'>Profile image
                                        <DragNDrop onDrop={droppedImage} onDragOver={e => e.preventDefault()} width='357px' height='253px' margin='0px 0px 0px -7px'>
                                            Darg and drop your profile image or
                                            <Input id='imageBox' theme={theme} bg='none' lineHeight='10px' width='300px' type="file" accept="image/png, image/jpeg, image/jpg" onChange={updateImage} required/>
                                        </DragNDrop>
                                    </Legend>
                                </Fieldset>
                            </InputErrorBox>
                        </InputContainer>
                    </FormContent>
                }
                {formSection === 'fourth' &&
                    <FormContent>
                        <InputContainer height='300px' margin='20px 0px 0px 0px'>
                            <InputErrorBox>
                                <ErrorBox theme={theme} height={emailError.length > 0 ? '20px' : '0px'}>
                                    <Error>{emailError[0]}</Error>
                                </ErrorBox>
                                <Fieldset error={emailError.length > 0}>
                                    <Legend width='40px' htmlFor="email" theme={theme} error={emailError.length > 0}>Email
                                    <InputResetContainer>
                                        <Input cursor='text' theme={theme} name="email" type="email" placeholder="Email" value={email} onChange={handleEmail} required/>
                                        <ResetIcon theme={theme} onClick={() => setEmail('')} data={email}>&#10006;</ResetIcon>
                                    </InputResetContainer>
                                    </Legend>
                                </Fieldset>
                            </InputErrorBox>
                            <InputErrorBox>
                                <ErrorBox theme={theme} height={phoneError.length > 0 ? '20px' : '0px'}>
                                    <Error>{emailError[0]}</Error>
                                </ErrorBox>
                                <Fieldset error={phoneError.length > 0}>
                                    <Legend width='112px' htmlFor="phone" theme={theme} error={phoneError.length > 0}>Phone number
                                    <InputResetContainer>
                                        <Input theme={theme} cursor='text' name="phone" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Phone number" value={phone} onChange={handlePhone} required/>
                                        <ResetIcon theme={theme} onClick={() => setPhone('')} data={phone}>&#10006;</ResetIcon>
                                    </InputResetContainer>
                                    </Legend>
                                </Fieldset>
                            </InputErrorBox>
                            <InputErrorBox>
                                <ErrorBox theme={theme} height={passwordError.length > 0 ? '20px' : '0px'}>
                                    <Error>{passwordError[0]}</Error>
                                </ErrorBox>
                                <Fieldset error={passwordError.length > 0}>
                                    <Legend htmlFor="password" theme={theme} error={passwordError.length > 0}>Password
                                        <InputResetContainer>
                                            <Input theme={theme} cursor='text' name="password" type={passwordVisibility === false ? 'password' : 'text'} placeholder="Password" value={password} onChange={handlePassword} required/>
                                            <VectorBox data={password} square='30px' onClick={() => setPasswordVisibility(!passwordVisibility)} cursor='pointer'>
                                                <PasswordIcon theme={theme} />
                                            </VectorBox>
                                            <ResetIcon theme={theme} onClick={() => setPassword('')} data={password}>&#10006;</ResetIcon>
                                        </InputResetContainer>
                                    </Legend>
                                </Fieldset>
                            </InputErrorBox>
                            <InputErrorBox>
                                <ErrorBox theme={theme} height={confirmError.length > 0 ? '20px' : '0px'}>
                                    <Error>{confirmError[0]}</Error>
                                </ErrorBox>
                                <Fieldset error={confirmError.length > 0}>
                                    <Legend width='140px' htmlFor="confirm" theme={theme} error={confirmError.length > 0}>Confirm password
                                        <InputResetContainer>
                                            <Input theme={theme} cursor='text' name="confirm" type={confirmVisibility === false ? 'password' : 'text'} placeholder="Confirm password" value={confirm} onChange={handleConfirm} required/>
                                            <VectorBox data={confirm} square='30px' onClick={() => setConfirmVisibility(!confirmVisibility)} cursor='pointer'>
                                                <PasswordIcon theme={theme} />
                                            </VectorBox>
                                                <ResetIcon theme={theme} onClick={() => setConfirm('')} data={confirm}>&#10006;</ResetIcon>
                                        </InputResetContainer>
                                    </Legend>
                                </Fieldset>
                            </InputErrorBox>
                        </InputContainer>
                    </FormContent>
                }
                {formSection === 'optional' &&
                    <FormContent>
                        <InputContainer height='275px' margin='50px 0px 0px 0px'>
                            <InputErrorBox height='200px'>
                                <Fieldset height='200px'>
                                    <Legend htmlFor='datails' theme={theme} width='125px'>Optional details
                                        <CheckBoxContainer long='long'>
                                            <OptInfoLabel htmlFor='deaf'>
                                                <Input name="deaf" width='20px' height='20px' type="checkbox" value={deaf} onChange={() => setDeaf(!deaf)}/>
                                                <InfoLabelText theme={theme}>Are you deaf?</InfoLabelText>
                                            </OptInfoLabel>
                                        </CheckBoxContainer>
                                        <CheckBoxContainer long='long'>
                                            <OptInfoLabel htmlFor='wheelchair'>
                                                <Input name="wheelchair" width='20px' height='20px'type="checkbox" value={wheelchair} onChange={() => setWheelchair(!wheelchair)}/>
                                                <InfoLabelText theme={theme}>Do you use a wheelchair?</InfoLabelText>
                                            </OptInfoLabel>
                                        </CheckBoxContainer>
                                        <CheckBoxContainer long='long'>
                                            <OptInfoLabel htmlFor='learningDisabled'>
                                                <Input name="learningDisabled" width='20px' height='20px'type="checkbox" value={learningDisabled} onChange={() => setLearningDisabled(!learningDisabled)}/>
                                                <InfoLabelText theme={theme}>Do you have learning disabilities?</InfoLabelText>
                                            </OptInfoLabel>
                                        </CheckBoxContainer>
                                        <CheckBoxContainer long='long'>
                                            <OptInfoLabel htmlFor='lgbtq'>
                                                <Input name="lgbtq" width='20px' height='20px'type="checkbox" value={lgbtq} onChange={() => setLgbtq(!lgbtq)}/>
                                                <InfoLabelText theme={theme}>Are you a part of the LGBTQIA+ community?</InfoLabelText>
                                            </OptInfoLabel>
                                        </CheckBoxContainer>
                                    </Legend>
                                </Fieldset>
                            </InputErrorBox>
                        </InputContainer>
                    </FormContent>
                }
                <ButtonBox>
                    <InputButtonBox>
                        <CancelButton onClick={cancel}>
                            <ButtonText>Cancel</ButtonText>
                        </CancelButton>
                        {formSection !== 'first' &&
                            <PreviousButton onClick={handlePrevious}>
                                <ButtonText>Previous</ButtonText>
                            </PreviousButton>
                        }
                        <SubmitButton onClick={formSection === 'optional' ? handleSubmit : handleNext}>
                            <ButtonText>{formSection === 'optional' ? 'Submit' : 'Next'}</ButtonText>
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
                <ActionBox padding='5px' marginTop='-10px'>
                    <ActionText theme={theme}>Already have an account?</ActionText>
                    <SignupText theme={theme} onClick={showLoginForm}>Log in</SignupText>
                </ActionBox>
                </Form>
            </FormContainer>
        </PreviewWrapper>
    )
};
