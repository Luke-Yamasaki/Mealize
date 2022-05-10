//Hooks
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';
import { useModal } from '../../Context/ModalContext';
//Store
import { login, signup } from '../../store/session';
import { hideModal } from '../../store/modal';
//Helper
import { validateSignup, uploadProfileImage } from '../../utils/Forms/signup';
import * as nsfwjs from 'nsfwjs';

//Components
import { LoginForm } from '../Login';
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

import {
    PreviewWrapper,
    PreviewBox,
    UploadingBox,
    UploadingMessage
} from '../../Components/Styled/PreviewSection';

//Icons
import { Business } from '../../Assets/Icons/Business';
import { Nonprofit } from '../../Assets/Icons/Nonprofit';
import { Volunteer } from '../../Assets/Icons/Volunteers';

import styles from './Signup.module.css';

export const SignupForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const organizations = useSelector(state => state.organizations);
    const { theme } = useTheme();
    const [ setModalName ] = useModal();

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
    const [jobDescriptionError, setJobDescriptionError] = useState([]);
    const [dobError, setDobError] = useState([]);
    const [organizationError, setOrganizationError] = useState([]);
    const [emailError, setEmailError] = useState([]);
    const [phoneError, setPhoneError] = useState([]);
    const [passwordError, setPasswordError] = useState([]);
    const [confirmError, setConfirmError] = useState([]);
    const [responseErrors, setResponseErrors] = useState([]);

    const allOrganizations = {...organizations.nonprofits, ...organizations.businesses}


    //dates
    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    const date = new Date().getDate()

    const formattedMonth = month <= 9 ? '0' + (month+1).toString() : (month+1).toString()
    const formattedDate = date <= 9 ? `0${date}` : date.toString();
    // const today = year.toString() + '-' + formattedDate + '-' + formattedMonth
    const tooOld = (year - 90).toString() + '-' + formattedMonth + '-' + formattedDate;

    const specialCharacters = '(){}[]|`¬¦! "£$%^&*"<>:;#~_-';

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);

        const descriptionCap = jobDescription.slice(0, 1).toUpperCase().concat(jobDescription.slice(1, jobDescription.length));
        const nonprofitStatus = allOrganizations[organizationId].isNonprofit ? true : false;
        const inputData = {
            organizationId,
            firstName,
            lastName,
            jobDescription: descriptionCap,
            dob,
            deaf,
            wheelchair,
            learningDisabled,
            lgbtq,
            isNonprofit: nonprofitStatus,
            isManager,
            email,
            phone,
            password,
            confirm
        }

        const stagedPost = await validateSignup(inputData);

        if(stagedPost.message === 'success') {
            setImageUploading(true);
            const response = await uploadProfileImage(formData);

            if(response.ok) {
                const data = await response.json();
                const profileImageUrl = await data.imageUrl

                const userData = {
                    organizationId,
                    firstName,
                    profileImageUrl,
                    lastName,
                    jobDescription: descriptionCap,
                    dob,
                    deaf,
                    wheelchair,
                    learningDisabled,
                    lgbtq,
                    isNonprofit: nonprofitStatus,
                    isManager,
                    email,
                    phone,
                    password,
                    confirm
                }

                const newUser = await dispatch(signup(userData))

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
            (lastName && !lastNameError.length) &&
            (image && !imageError.length) &&
            (jobDescription && !jobDescriptionError.length) &&
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
        else if(!firstName || !lastName || !image || !jobDescription || !dob || !organizationId || !email || !phone || !password || !confirm) {
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

    const reset = (e) => {
        e.preventDefault();
        setResponseErrors([]);
        setFirstName('');
        setLastName('');
        setJobDescription('');
        setImage(null);
        setDob((new Date().toISOString().split('T')[0].slice(0,4)-18).toString() + new Date().toISOString().split('T')[0].slice(4,11))
        setDeaf(false);
        setWheelchair(false);
        setLearningDisabled(false);
        setLgbtq(false);
        setOrganizationId('');
        setIsNonprofit(false);
        setIsManager(false);
        setEmail('');
        setPhone('');
        setPassword('');
        setConfirm('');

        setFirstNameError([]);
        setLastNameError([]);
        setJobDescriptionError([]);
        setDobError([]);
        setOrganizationError([]);
        setEmailError([]);
        setPhoneError([]);
        setConfirmError([]);
        setImageError([]);

        const imageInput = document.getElementById('profileImage');
        imageInput.value = '';
        imageInput.style.color = '#C2462A';
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
		setModalName('login')
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

    const handleDescription = (e) => {
        e.preventDefault();
        setResponseErrors([])

        if(jobDescription.length >= 100) {
            setJobDescriptionError(['Job descriptions must be less than 100 characters.'])
        } else if (jobDescription.length >= 24 && !jobDescription.includes(' ')) {
            setJobDescriptionError(['Please add a line break.'])
        } else {
            setJobDescriptionError([]);
            setJobDescription(e.target.value)
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
        if(!e.target.value.length === password) {
            setConfirmError(['Passwords do not match.'])
        } else {
            setConfirmError([])
            setConfirm(e.target.value)
        }
    }

    return (
        <PreviewWrapper>
            <PreviewBox>
                <div className={styles.idCard}>
                    <section className={styles.header}>
                        <div className={styles.logoBox}>
                            <p className={styles.logoType}>Mealize</p>
                        </div>
                        <div className={styles.sloganBox}>
                            <p className={styles.slogan}>- Share from your heart -</p>
                        </div>
                        <div className={styles.iconBox}>
                            <div className={styles.iconBg}>
                                {isNonprofit ? <Nonprofit /> : <Business />}
                            </div>
                        </div>
                    </section>
                    <p style={{width: '415px', padding: '0px', margin: '-10px 0px 0px 10px', fontFamily: 'motiva-sans, sans-serif', fontSize: '12px', fontWeight: '700'}}>{ isManager ? 'Manager Id Card' : 'Volunteer Id Card' }</p>
                    <section className={styles.content}>
                        <div className={styles.imageBox}>
                            <img id='imageBox' src={image ? URL.createObjectURL(image) : 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'} className={styles.image} alt='User profile.'/>
                            <p style={{fontFamily: 'motiva-sans, sans-serif', fontSize: '10px', fontWeight: '700', fontStyle: 'normal', paddingTop: '10px', margin: '0px', height: '15px'}}>Id: 12345 </p>
                            <p style={{fontFamily: 'motiva-sans, sans-serif', fontSize: '10px', fontWeight: '700', fontStyle: 'normal', paddingTop: '5px', paddingBottom: '5px', margin: '0px', height: '15px'}}>Issued: {new Date().toISOString().split('T')[0].slice(0,11)}</p>
                        </div>
                        <div className={styles.userInfoBox}>
                            <div className={styles.labelText}>
                                <div className={styles.labels}>Name:</div>
                                <div className={styles.subText}>{firstName + ' ' + lastName}</div>
                            </div>
                            <div className={styles.labelText}>
                                <div className={styles.labels}>DOB:</div>
                                <div className={styles.subText}>{dob}</div>
                            </div>
                            <div className={styles.descriptionText}>
                                <div className={styles.labels}>Job description:</div>
                                <div className={styles.subText}>{ jobDescription.length >= 25 && !jobDescription.includes(' ') ? 'Please add a line break.' : jobDescription.slice(0, 1).toUpperCase().concat(jobDescription.slice(1, jobDescription.length))}</div>
                            </div>
                    </div>
                    <div className={styles.jobInfoBox}>
                        <div className={styles.labels}>Organization info</div>
                        <div className={styles.labelText}>
                            <div style={{fontSize: '10px'}} className={styles.labels}>Name:</div>
                            <div style={{fontSize: '8px'}} className={styles.subText}>{organizationId ? allOrganizations[organizationId].name : "Company details."}</div>
                        </div>
                        <div className={styles.labelText}>
                            <div className={styles.labels}>Email:</div>
                            <div style={{fontSize: '8px'}} className={styles.subText}>{organizationId ? allOrganizations[organizationId].email : "Company details."}</div>
                        </div>
                        <div className={styles.labelText}>
                            <div className={styles.labels}>Phone:</div>
                            <div style={{fontSize: '8px'}} className={styles.subText}>{organizationId ? `(${allOrganizations[organizationId].phone.slice(0, 3)}) - ${allOrganizations[organizationId].phone.slice(3, 6)}-${allOrganizations[organizationId].phone.slice(6, 10)}` : "Company details."} </div>
                        </div>
                        <div className={styles.descriptionText}>
                            <div className={styles.labels}>Address:</div>
                            <div className={styles.subText}>{organizationId ? `${allOrganizations[organizationId].street}` : "Company details."}</div>
                            <div style={{marginTop: '-10px'}} className={styles.subText}>{organizationId ? `${allOrganizations[organizationId].city}, ${allOrganizations[organizationId].state[0].toUpperCase()+allOrganizations[organizationId].state[1].toUpperCase()} ${allOrganizations[organizationId].zip}`  : "Company details."}</div>
                        </div>
                    </div>
                </section>
                </div>
                {imageUploading && (
                    <UploadingBox>
                       <UploadingMessage>Uploading your profile image...</UploadingMessage>
                    </UploadingBox>
                )}
            </PreviewBox>
            <FormBox>
                <Form> Welcome to Mealize!
                {responseErrors.length > 0 && (
                        <ErrorMessage>{responseErrors[0]}</ErrorMessage>
                    )}
                    {organizationError.length > 0 && (
                        <ErrorMessage>{organizationError[0]}</ErrorMessage>
                )}
                <div style={{width: '520px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
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
                        <label style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Input
                            name="isManager"
                            type="checkbox"
                            value={isManager}
                            style={{width: '20px', height: '20px'}}
                            onChange={() => setIsManager(!isManager)}
                        />
                        Yes
                        </label>
                    </ButtonBox>
                    </Legend>
                </Fieldset>
                </div>
                {firstNameError.length > 0 && (
                        <ErrorMessage>{firstNameError[0]}</ErrorMessage>
                    )}
                {lastNameError.length > 0 && (
                        <ErrorMessage>{lastNameError[0]}</ErrorMessage>
                    )}
                <div style={{width: '520px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Fieldset style={{width: '235px'}}>
                        <Legend style={{width: '80px'}}> First name
                            <Input
                                name="firstName"
                                type="text"
                                placeholder="First name"
                                value={firstName}
                                onChange={handleFName}
                                required
                            />
                        </Legend>
                    </Fieldset>
                    <Fieldset style={{width: '235px'}}>
                        <Legend style={{width: '80px'}}> Last name
                            <Input
                                name="lastName"
                                type="text"
                                placeholder="Last name"
                                value={lastName}
                                onChange={handleLName}
                                required
                            />
                        </Legend>
                    </Fieldset>
                </div>
                {imageError.length > 0 && (
                        <ErrorMessage>{imageError[0]}</ErrorMessage>
                    )}
                    {dobError.length > 0 && (
                        <ErrorMessage>{dobError[0]}</ErrorMessage>
                    )}
                <div style={{width: '520px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Fieldset style={{width: '235px', height: '40px'}}>
                        <Legend style={{width: '100px'}}> Profile image
                            <input
                                id="profileImage"
                                type="file"
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={updateImage} required
                            />
                        </Legend>
                    </Fieldset>
                    <Fieldset style={{width: '235px', height: '40px'}}>
                        <Legend style={{width: '100px'}}> Date of birth
                            <Input
                                name="age"
                                type="date"
                                min={tooOld}
                                max={(year - 18).toString + '-' + formattedMonth + '-' + formattedDate}
                                placeholder="Your DOB (must be 18 or older)."
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                required
                            />
                        </Legend>
                    </Fieldset>
                </div>
                {jobDescriptionError.length > 0 && (
                        <ErrorMessage>{jobDescriptionError[0]}</ErrorMessage>
                    )}
                <Fieldset style={{height: '100px'}}>
                    <Legend style={{width: '120px'}}> Job description
                        <textarea
                            name="jobDescription"
                            placeholder="Add your job description (100 character limit)."
                            value={jobDescription}
                            minLength='1'
                            maxLength='100'
                            onChange={handleDescription}
                            style={{width: "475px", height: "75px", resize: 'none', fontSize: '14px', marginTop: '7px'}}
                            required
                        />
                    </Legend>
                </Fieldset>
                {emailError.length > 0 && (
                        <ErrorMessage>{emailError[0]}</ErrorMessage>
                    )}
                    {phoneError.length > 0 && (
                        <ErrorMessage>{phoneError[0]}</ErrorMessage>
                    )}
                <div style={{width: '520px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Fieldset style={{height: '40px', width: '235px'}}>
                        <Legend style={{width: '50px'}}> Email
                            <Input
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmail}
                                required
                            />
                        </Legend>
                    </Fieldset>
                    <Fieldset style={{height: '40px', width: '235px'}}>
                        <Legend style={{width: '50px'}}> Phone
                            <Input
                                name="phone"
                                type="tel"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                placeholder="Phone number"
                                value={phone}
                                onChange={handlePhone}
                                required
                            />
                        </Legend>
                    </Fieldset>
                </div>
                {passwordError.length > 0 && (
                        <ErrorMessage>{passwordError[0]}</ErrorMessage>
                )}
                {confirmError.length > 0 && (
                        <ErrorMessage>{confirmError[0]}</ErrorMessage>
                )}
                <div style={{width: '520px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Fieldset style={{height: '40px', width: '235px'}}>
                    <Legend style={{width: '100px'}}> Password
                        <Input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePassword}
                            required
                        />
                    </Legend>
                </Fieldset>
                <Fieldset style={{height: '40px', width: '235px'}}>
                    <Legend style={{width: '150px'}}> Confirm password
                        <Input
                            name="confirm"
                            type="password"
                            placeholder="Confirm password"
                            value={confirm}
                            onChange={handleConfirm}
                            required
                        />
                    </Legend>
                </Fieldset>
                </div>
                <Fieldset style={{height: '100px', width: '500px', margin: 'none', padding: 'none'}}>
                    <Legend style={{width: '130px'}}> Optional details
                    <div style={{width: '400px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <div style={{display: 'flex', flexDirection: 'row', width: '400px', height: '20px'}}>
                            <ButtonBox style={{width: '225px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: '5px'}}>
                                <Label htmlFor='deaf'>
                                    <Input
                                            name="deaf"
                                            type="checkbox"
                                            value={deaf}
                                            onChange={() => setDeaf(!deaf)}
                                            style={{width: '20px', height: '20px'}}
                                        />
                                Are you deaf?
                                </Label>
                            </ButtonBox>
                            <ButtonBox style={{width: '225px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: '5px'}}>
                                <Label htmlFor='wheelchair'>
                                    <Input
                                        name="wheelchair"
                                        type="checkbox"
                                        value={wheelchair}
                                        onChange={() => setWheelchair(!wheelchair)}
                                        style={{width: '20px', height: '20px'}}
                                    />
                                Do you use a wheelchair?</Label>
                            </ButtonBox>
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', width: '400px', height: '20px'}}>
                        <ButtonBox style={{width: '225px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: '5px'}}>
                                <Label htmlFor='learningDisabled'>
                                <Input
                                    name="learningDisabled"
                                    type="checkbox"
                                    value={learningDisabled}
                                    onChange={() => setLearningDisabled(!learningDisabled)}
                                    style={{width: '20px', height: '20px'}}
                                />
                                Do you have learning disabilities?</Label>
                            </ButtonBox>
                            <ButtonBox style={{width: '270px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: '5px'}}>
                                <Label htmlFor='lgbtq'>
                                    <Input
                                        name="lgbtq"
                                        type="checkbox"
                                        value={lgbtq}
                                        onChange={() => setLgbtq(!lgbtq)}
                                        style={{width: '20px', height: '20px'}}
                                    />
                                Are you a part of the LGBTQIA+ community?</Label>
                        </ButtonBox>
                    </div>
                    </Legend>
                </Fieldset>
                <FormButtonBox>
                    <CancelBtn onClick={reset}>Reset</CancelBtn>
                    <SubmitBtn onClick={handleErrors}>Submit</SubmitBtn>
                </FormButtonBox>
                <DemoBox>
                    <VolunteerBtn onClick={volunteerDemo}>Volunteer demo</VolunteerBtn>
                    <NonprofitBtn onClick={nonprofitDemo}>Nonprofit demo</NonprofitBtn>
                    <BusinessBtn onClick={businessDemo}>Business demo</BusinessBtn>
                </DemoBox>
                <div className={styles.question}>Already have an account?<div className={styles.modalOption} onClick={showLoginForm}>Log in</div></div>
                </Form>
            </FormBox>
        </PreviewWrapper>
    )
}
