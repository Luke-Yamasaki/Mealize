//Hooks
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';

//Store
import { login, signup } from '../../store/session';
import { setCurrentModal, hideModal } from '../../store/modal';

//Helper
import { validateSignup, uploadProfileImage } from '../../utils/Forms/signup';
import { ageBoundary } from '../../utils/Dates';
import { getIp } from '../../utils/Forms/signup';
import validator from 'validator';

//Packages
import * as nsfwjs from 'nsfwjs';
import { exportComponentAsJPEG } from "react-component-export-image";

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
    Input,
    Error,
    ErrorBox,
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
    PrintId,
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
    const componentRef = useRef();

    // form states
    const [formSection, setFormSection] = useState('first');
    //first section
    const [organizationId, setOrganizationId] = useState('');
    const [isNonprofit, setIsNonprofit] = useState(false);
    const [isManager, setIsManager] = useState(false);
    //second section
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
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
    const [imageValidating, setImageValidating] = useState(false);
    // errors
    //first
    const [organizationIdError, setOrganizationIdError] = useState([]);
    //second
    const [firstNameError, setFirstNameError] = useState([]);
    const [lastNameError, setLastNameError] = useState([]);
    const [dobError, setDobError] = useState([]);
     //third
    const [imageError, setImageError] = useState([]);
    //fourth
    const [emailError, setEmailError] = useState([]);
    const [phoneError, setPhoneError] = useState([]);
    const [passwordError, setPasswordError] = useState([]);
    const [confirmError, setConfirmError] = useState([]);

    useEffect(() => {
        setOrganizationIdError([])
    },[organizationId])

    useEffect(() => {
        setFirstNameError([])
    },[firstName])

    useEffect(() => {
        setLastNameError([])
    },[lastName])

    useEffect(() => {
        setDobError([])
    },[dob])

    useEffect(() => {
        setImageError([])
    },[image])

    useEffect(() => {
        setEmailError([])
    },[email])

    useEffect(() => {
        setPhoneError([])
    },[phone])

    useEffect(() => {
        setPasswordError([])
    },[password])

    useEffect(() => {
        setConfirmError([])
    },[confirm])


    const ageBoundariesObj = ageBoundary();
    const minDate = ageBoundariesObj.old;
    const maxDate = ageBoundariesObj.young;

    const specialCharacters = '(){}[]|`¬¦! "£$%^&*"<>:;#~_-';

    let props = {
        organizationId,
        isNonprofit,
        isManager,
        firstName,
        lastName,
        dob,
        image,
        deaf,
        wheelchair,
        learningDisabled,
        lgbtq
    };

    const cancel = (e) => {
        e.preventDefault();
        dispatch(hideModal());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const inputData = { organizationId, firstName, lastName, dob, deaf, wheelchair, learningDisabled, lgbtq, isNonprofit, isManager, email, phone, password, confirm}

        const stagedPost = await validateSignup(inputData);
        if(stagedPost.message === 'success') {
            const formData = new FormData();
            formData.append("image", image);
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
                }
            }
        } else {
            console.log(stagedPost.errors)
        }
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
                //If good, preview the image
                repaint(file);
            }
        }
        setImageValidating(false);
    };

    const droppedImage = async (e) => {
        e.preventDefault();
        setImageValidating(true);
        setImageError([]);
        if(e.dataTransfer.items) {
            for(let i = 0; i < e.dataTransfer.items.length; i++) {
                if(e.dataTransfer.items[i].kind === 'file') {
                    const file = e.dataTransfer.items[i].getAsFile();
                    //Validate file size
                    const fileSize = file.size / 1024 / 1024; //convert to megabytes

                    if(fileSize > 2) {
                        e.target.value = '';
                        setImage('');
                        setImageError(['The file size is too large. Images must be under 2MB.'])
                    } else if(!file.type.match('image/jpeg') || !file.type.match('image/png')) {
                        setImage('');
                        setImageError(['We can only accept jpeg or png format images.'])
                    } else {
                        //Filter adult content
                        const url = URL.createObjectURL(file);
                        const img = new Image();
                        img.src = url;
                        const nsfwArr = await nsfwCheck(img);
                        if(nsfwArr.length > 0) {
                            setImageError(["Adult content violates Mealize's community standards."]);
                            window.location.href = 'https://www.google.com';
                        } else {
                            e.target.style.color = '#608F41'
                            setImageError([])
                            setImage(file)
                            //If good, preview the image
                            repaint(file);
                        }
                    }
                }
            }
        }
        setImageValidating(false);
    };

    const handleFName = () => {
        setFirstNameError([])
        const fNameArr = [];
        const regex = /\d+/g;

        if(!firstName.length) {
            fNameArr.push('Please enter your first name.')
        } else if(firstName.length >= 50) {
            fNameArr.push('First names must be shorter than 50 characters.')
        } else if(firstName.match(regex)) {
            fNameArr.push('You cannot add an integer to your name.')
        } else if(specialCharacters.includes(firstName)){
            fNameArr.push('Special characters are not allowed.')
        } else {
            setFirstNameError([])
            setFirstName(firstName)
        }
        setFirstNameError(fNameArr);
        return fNameArr
    };

    const handleLName = () => {
        setLastNameError([]);
        const lNameArr = [];
        const regex = /\d+/g;

        if(!lastName.length) {
            lNameArr.push('Please enter your last name.')
        } else if(lastName.length >= 50) {
            lNameArr.push('Last names must be shorter than 50 characters.')
        } else if(lastName.match(regex)) {
            lNameArr.push('You cannot add an integer to your name.')
        } else if(specialCharacters.includes(lastName)){
            lNameArr.push('Special characters are not allowed.')
        } else {
            setLastNameError([])
            setLastName(lastName)
        }
        setLastNameError(lNameArr);
        return lNameArr
    };

    const handleEmail = () => {
        setEmailError([]);
        const emailErrArr = [];

        if(!email.length) {
            emailErrArr.push('Please enter your email.');
        } else if(email.length >= 255) {
            emailErrArr.push('Your email is too long.');
        } else if(validator.isEmail(email) === false){
            emailErrArr.push('Please enter a valid email address.')
        }else {
            setEmailError([])
            setEmail(email)
        }
        setEmailError(emailErrArr);
        return emailErrArr
    };

    const handlePhone = () => {
        setPhoneError([])
        const phoneErrArr = [];

        if(!phone.length) {
            phoneErrArr.push('Please enter your phone number.');
        } else if(phone.toString().length >= 15) {
            phoneErrArr.push('The phone number is too long.')
        } else {
            setPhoneError([])
            setPhone(phone)
        }
        setPhoneError(phoneErrArr);
        return phoneErrArr
    };

    const handlePassword = () => {
        setPasswordError([]);
        const pwrdErrArr = [];

        if(!password.length) {
            pwrdErrArr.push('Please enter in a password longer than 6 characters.')
        } else if(specialCharacters.includes(password)) {
            pwrdErrArr.push('Special characters are not allowed.')
        } else {
            setPasswordError([])
            setPassword(password)
        }
        setPasswordError(pwrdErrArr);
        return pwrdErrArr
    };

    const handleConfirm = () => {
        setConfirmError([]);
        const confirmErrArr = [];

        if(!confirm.length) {
            confirmErrArr.push('Please confirm your password.')
        } else if(confirm !== password) {
            confirmErrArr.push('Passwords do not match.')
        } else {
            setConfirmError([])
            setConfirm(confirm)
        }
        setConfirmError(confirmErrArr)
        return confirmErrArr
    };

    const handleNext = (e) => {
        e.preventDefault();

        if(formSection === 'first') {
            if(organizationId === '') {
                setOrganizationIdError(['Please select your organization.'])
            } else {
                setFormSection('second')
            }
        } else if(formSection === 'second') {
            const fname = handleFName();
            const lname = handleLName();
            if(fname.length > 0 || lname.length > 0 || !dob.length) {
                setFormSection('second')
                if(!dob.length) {
                    setDobError(['Please select your date of birth.'])
                }
            } else {
                  setFormSection('third')
                }
        } else if(formSection === 'third') {
            if(!image) {
                setImageError(['Please select your profile image.'])
                setFormSection('third')
            } else {
                setFormSection('fourth')
            }
        } else {
            const emailErr = handleEmail();
            const phoneErr = handlePhone();
            const pwrdErr = handlePassword();
            const confirmErr = handleConfirm();
            if(!emailErr.length && !phoneErr.length && !pwrdErr.length && !confirmErr.length) {
                setFormSection('optional')
            } else {
                setFormSection('fourth')
            }
        }
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
                <PrintId ref={componentRef}>
                    <PreviewSection type='id' props={props} />
                </PrintId>
               <button onClick={() => exportComponentAsJPEG(componentRef)}>
                Export As JPEG
                </button>
               {imageUploading &&
                <UploadingBox>
                    <UploadingMessage>
                        Uploading image...
                    </UploadingMessage>
                </UploadingBox>
               }
                {imageValidating &&
                <UploadingBox>
                    <UploadingMessage>
                        Validating image...
                    </UploadingMessage>
                </UploadingBox>
               }
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
                            <ErrorBox theme={theme} height={organizationIdError.length > 0 ? '20px' : '0px'}>
                                <Error>{organizationIdError[0]}</Error>
                            </ErrorBox>
                            <Fieldset>
                                <Legend theme={theme} width='190px' error={organizationIdError.length > 0}> Select your organization
                                    <OrganizationSelect value={organizationId} onChange={(e) => setOrganizationId(e.target.value)} required>
                                        {isNonprofit &&
                                            <optgroup label='Nonprofits'>
                                                <option value='' disabled>--Select your organization--</option>
                                                {Object.values(organizations.nonprofits).map((organization) => <option key={organization.id} value={organization.id}>{organization.name}</option>)}
                                            </optgroup>
                                        }
                                        {!isNonprofit &&
                                            <optgroup label='Businesses'>
                                                <option value='' disabled>--Select your organization--</option>
                                                {Object.values(organizations.businesses).map((organization) => <option key={organization.id} value={organization.id}>{organization.name}</option>)}
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
                    <InputContainer height='225px' margin='50px 0px 0px 0px'>
                            <InputErrorBox>
                                <ErrorBox theme={theme} height={firstNameError.length > 0 ? '20px' : '0px'}>
                                    <Error>{firstNameError[0]}</Error>
                                </ErrorBox>
                                <Fieldset error={firstNameError.length > 0}>
                                    <Legend htmlFor='firstName' theme={theme} error={firstNameError.length > 0} width='85px'>First name
                                        <InputResetContainer>
                                            <Input name="firstName" cursor='text' type="text" placeholder='First name' autoComplete="none" value={firstName} theme={theme} onChange={(e)=> setFirstName(e.target.value)} required/>
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
                                            <Input name='lastName' cursor='text' type='text' placeholder='Last name' autoComplete="none" value={lastName} theme={theme} onChange={(e) => setLastName(e.target.value)} required/>
                                            <ResetIcon theme={theme} onClick={() => setLastName('')} data={lastName}>&#10006;</ResetIcon>
                                        </InputResetContainer>
                                    </Legend>
                                </Fieldset>
                            </InputErrorBox>
                            <InputErrorBox>
                                <ErrorBox theme={theme} height={dobError.length > 0 ? '20px' : '0px'}>
                                    <Error>{dobError[0]}</Error>
                                </ErrorBox>
                                <Fieldset>
                                    <Legend htmlFor="dob" theme={theme} width='100px' error={dobError.length > 0}>Date of birth
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
                        <InputContainer  height={imageError.length > 0 ? '290px' : '275px'} margin='50px 0px 0px 0px'>
                            <InputErrorBox height='275px'>
                                <ErrorBox theme={theme} height={imageError.length > 0 ? '20px' : '0px'}>
                                    <Error>{imageError[0]}</Error>
                                </ErrorBox>
                                <Fieldset error={imageError.length > 0} height='275px'>
                                    <Legend htmlFor='imageBox' theme={theme} error={imageError.length > 0} width='105px'>Profile image
                                        <DragNDrop onDrop={droppedImage} onDragOver={e => e.preventDefault()} width='357px' height={imageError.length > 0 ? '237px' : '253px'} margin='0px 0px 0px -7px'>
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
                                        <Input cursor='text' theme={theme} name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
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
                                        <Input theme={theme} cursor='text' name="phone" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
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
                                            <Input theme={theme} cursor='text' name="password" type={passwordVisibility === false ? 'password' : 'text'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
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
                                            <Input theme={theme} cursor='text' name="confirm" type={confirmVisibility === false ? 'password' : 'text'} placeholder="Confirm password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required/>
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
