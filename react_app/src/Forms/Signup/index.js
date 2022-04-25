import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login, signup } from '../../store/session';
import { validateSignup, uploadProfileImage } from '../../Helpers/FormValidations/signup';
import { setCurrentModal, hideModal } from '../../store/modal';
import { LoginForm } from '../Login';
import { Business } from '../../Assets/Icons/Business';
import { Nonprofit } from '../../Assets/Icons/Nonprofit';
import { Volunteer } from '../../Assets/Icons/Volunteers';

import styles from './Signup.module.css';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 1200px;
    height: 900px;
    background: linear-gradient(#28A690,#76D97E);
    border-radius: 5px;
    overflow: hidden;
`;

const PreviewBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 600px;
    height: 900px;
`;

const UploadingBox = styled.div`
    width: 400px;
    height: 100px;
    background-color: white;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const UploadingMessage = styled.div`
    font-family: motiva-sans, sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 900;
    color: black;
`;

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
    const history = useHistory();
    const organizations = useSelector(state => state.organizations);

    // states
    const [isPrivate, setIsPrivate] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [image, setImage] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [dob, setDob] = useState(new Date().toISOString());
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
    const [passwordError, setPasswodError] = useState([]);
    const [confirmError, setConfirmError] = useState([]);
    const [responseErrors, setResponseErrors] = useState([]);
    const [formErrors, setFormErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);

        const descriptionCap = jobDescription.slice(0, 1).toUpperCase().concat(jobDescription.slice(1, jobDescription.length));

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
            isNonprofit,
            isManager,
            email,
            phone,
            confirm
        }
        const stagedPost = await validateSignup(inputData);

        if(stagedPost.errors) {
            setFormErrors(stagedPost.errors)
        }

        if(stagedPost.message === 'success') {
            setImageUploading(true);
            const response = await uploadProfileImage(formData);

            if(response.ok) {
                const data = await response.json();
                const profileImageUrl = await data.imageUrl
                inputData.profileImageUrl = profileImageUrl;
                const newUser = await dispatch(signup(inputData))

                if(!newUser.errors || !newUser.error) {
                    setImageUploading(false);
                    history.pushState('/')
                    dispatch(hideModal())
                } else {
                    const responseErrArr = []
                    responseErrArr.push(newUser)
                    console.log(newUser)
                    setImageUploading(false);
                    setResponseErrors(responseErrArr);
                }
                dispatch(hideModal());
            }
        }
    };

    const reset = (e) => {
        e.preventDefault();
        setFirstName('');
        setLastName('');
        setJobDescription('');
        setImage(null);
        setDob(new Date().toISOString());
        setDeaf(false);
        setWheelchair(false);
        setLearningDisabled(false);
        setLgbtq(false);
        setOrganizationId('');
        setIsNonprofit(false);
        setIsManager(false);
        setEmail(false);
        setPhone(false);
        setPassword('');
        setConfirm('');
        setIsPrivate(false);

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

    const volunteerDemo = async (e) => {
        e.preventDefault();
        const emailErrArr =[]
        const passwordErrArr =[];

        const data = await dispatch(login('volunteer_demo@testing.com', '064324651d0-72fe-49c5-aa1-0ba223f4fcmv3'));
        if(data.errors) {
            data.errors.forEach(error => error.toLowerCase().includes('password') ? passwordErrArr.push(error) : emailErrArr.push(error));
            setEmailError(emailErrArr);
            setConfirmError(passwordErrArr)
        }
        dispatch(hideModal())
    }

    const nonprofitDemo = async (e) => {
        e.preventDefault();
        const emailErrArr =[]
        const passwordErrArr =[];

        const data = await dispatch(login('nonprofit_demo@testing.com', '062651d0-01fe-49c5-aaa1-0829ba3f4ff3'));
        if(data.errors) {
            data.errors.forEach(error => error.toLowerCase().includes('password') ? passwordErrArr.push(error) : emailErrArr.push(error));
            setEmailError(emailErrArr);
            setConfirmError(passwordErrArr)
        }
        dispatch(hideModal())
    };

    const businessDemo = async (e) => {
        e.preventDefault();
        const emailErrArr =[]
        const passwordErrArr =[];

        const data = await dispatch(login('business_demo@testing.com', '8f08d594-2275-4c8f-93f3-4cb6dbed4b70'));
        if(data.errors) {
            data.errors.forEach(error => error.toLowerCase().includes('password') ? passwordErrArr.push(error) : emailErrArr.push(error));
            setEmailError(emailErrArr);
            setConfirmError(passwordErrArr)
        }
        dispatch(hideModal())
    };

    const showLoginForm = () => {
		dispatch(setCurrentModal(LoginForm));
	};

    const updateImage = (e) => {
        const file = e.target.files[0];
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

    return (
        <Wrapper>
            <PreviewBox>
                <div className={styles.idCard}>
                    <section className={styles.header}>
                        <div className={styles.logoBox}>
                            <p className={styles.logoType}>Mealize</p>
                            <p className={styles.subText}>{ isManager ? 'Manager Id Card' : 'Volunteer Id Card' }</p>
                        </div>
                        <div className={styles.sloganBox}>
                            <p className={styles.slogan}></p>
                        </div>
                        <div className={styles.iconBox}>
                            <div className={styles.iconBg}>
                                {isNonprofit ? <Nonprofit /> : <Business />}
                            </div>
                        </div>
                    </section>
                    <section className={styles.content}>
                        <div className={styles.imageBox}>
                            <img src={image ? URL.createObjectURL(image) : 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'} className={styles.image} alt='User profile.'/>
                            <p className={styles.subText}>Id: 12345 </p>
                            <p className={styles.subText}>Issued: {new Date().toISOString()}</p>
                        </div>
                        <div className={styles.userInfoBox}>
                            <div className={styles.labels}>
                                Name:
                                <p className={styles.subText}>{firstName + ' ' + lastName}</p>
                            </div>
                            <div className={styles.labels}>
                                DOB:
                                <p className={styles.subText}>{dob}</p>
                            </div>
                            <div className={styles.labels}>
                                Job description:
                                <p className={styles.subText}>{jobDescription.slice(0, 1).toUpperCase().concat(jobDescription.slice(1, jobDescription.length))}</p>
                            </div>
                        {!isPrivate && (
                            <>
                                {deaf && (
                                    <div className={styles.labels}>
                                        Deaf:
                                        <p className={styles.subText}>This member is deaf.</p>
                                    </div>
                                )
                                }
                                {wheelchair && (
                                    <div className={styles.labels}>
                                        Wheelchair:
                                        <p className={styles.subText}>This member uses a wheelchair.</p>
                                    </div>
                                )
                                }
                                {learningDisabled && (
                                    <div className={styles.labels}>
                                        Learning disabled:
                                        <p className={styles.subText}>This member has learning disabilities.</p>
                                    </div>
                                )
                                }
                                {lgbtq && (
                                    <div className={styles.labels}>
                                        <p className={styles.subText}>This member belongs to the LGBTQIA+ community.</p>
                                    </div>
                                )
                                }
                            </>
                        )}
                    </div>
                    <div className={styles.jobInfoBox}>
                        <div className={styles.labels}>
                            Organization name:
                            <p className={styles.subText}>{organizationId ? organizations[organizationId].name : "Your organization's details."}</p>
                        </div>
                        <div className={styles.labels}>
                            Email:
                            <p className={styles.subText}>{organizationId ? organizations[organizationId].email : "Your organization's details."}</p>
                        </div>
                        <div className={styles.labels}>
                            Phone:
                            <p className={styles.subText}>{organizationId ? `(${organizations[organizationId].phone.slice(0, 3)}) - ${organizations[organizationId].phone.slice(3, 6)}-${organizations[organizationId].phone.slice(6, 10)}` : "Your organization's details."} </p>
                        </div>
                        <div className={styles.labels}>
                            Address:
                            <div className={styles.addressBox}>
                                <p className={styles.subText}>{organizationId ? organizations[organizationId].street : "Your organization's details."},</p>
                                <p className={styles.subText}>{organizationId ? `${organizations[organizationId].city}, ${organizations[organizationId].state[0].toUpperCase()+organizations[organizationId].state[1].toUpperCase()} ${organizations[organizationId].zip}` : "Your organization's details."}</p>
                            </div>
                        </div>
                    </div>
                </section>
                </div>
                {imageUploading && (
                    <UploadingMessage>Uploading your profile image...</UploadingMessage>
                )}
            </PreviewBox>
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
                <Legend style={{width: '100px'}}> Profile image
                    <input
                        id="profileImage"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={updateImage} required
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
                        type="date"
                        min='2004/04/24'
                        max='1932/04/24'
                        placeholder="Your DOB (must be 18 or older)."
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
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
                            name="wheelchair"
                            type="checkbox"
                            value={wheelchair}
                            onChange={() => setWheelchair(!wheelchair)}
                            style={{width: '50px', height: '50px'}}
                        />
                        <Label htmlFor='wheelchair'> Do you use a wheelchair?</Label>
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
                        name="confirm"
                        type="password"
                        placeholder="Confirm password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                    />
                </Legend>
            </Fieldset>
            <ButtonBox>
                <div role='button' className={styles.cancel} onClick={reset}>Reset</div>
                <div role='button' className={styles.submit} onClick={handleSubmit}>Submit</div>
            </ButtonBox>
            <div role='button' className={styles.nonprofit} onClick={nonprofitDemo}>Nonprofit demo</div>
            <div role='button' className={styles.business} onClick={businessDemo}>Business demo</div>
            <div className={styles.question}>Already have an account?<div className={styles.modalOption} onClick={showLoginForm}>Log in</div></div>
            </Form>
        </Wrapper>
    )
}
