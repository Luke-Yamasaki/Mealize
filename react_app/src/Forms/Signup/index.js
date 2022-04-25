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

const FormBox = styled.div`
    width: 600px;
    height: 900px;
    background-color: #F5F5F5;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Form = styled.form`
    width: 575px;
    height: 875px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-radius: 5px;
    1px solid rgb(213, 213, 213);
    font-family: motiva-sans, sans-serif;
    font-weight: 900;
    font-size: 32px;
`;

const Fieldset = styled.fieldset`
    width: 500px;
    height: 40px;
    border: 1px solid #28A690;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    margin: 0px;
    padding-left: 10px;
    font-weight: 500;
`;

const Legend = styled.legend`
    color: #28A690;
    font-size: 16px;
    width: 300px;
    height: 15px;
    font-weight: 500;
    color: black;
`;

const Label = styled.label`
    font-size: 12px;
    width: 1000px;
    height: 30px;
    display: flex;
    align-items: center;
`;

const Input = styled.input`
    width: 200px;
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

const DemoButtonBox = styled.div`
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
        setDob((new Date().toISOString().split('T')[0].slice(0,4)-18).toString() + new Date().toISOString().split('T')[0].slice(4,11))
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
                            <img src={image ? URL.createObjectURL(image) : 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'} className={styles.image} alt='User profile.'/>
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
                            <div className={styles.labelText}>
                                <div className={styles.labels}>Job description:</div>
                                <div className={styles.subText}>{jobDescription.slice(0, 1).toUpperCase().concat(jobDescription.slice(1, jobDescription.length))}</div>
                            </div>
                        {!isPrivate && (
                            <>
                                {deaf && (
                                    <div className={styles.labelText}>
                                        <div className={styles.labels}></div>Deaf:
                                        <div className={styles.subText}>This member is deaf.</div>
                                    </div>
                                )
                                }
                                {wheelchair && (
                                    <div className={styles.labelText}>
                                        <div className={styles.labels}></div>Wheelchair:
                                        <div className={styles.subText}>This member uses a wheelchair.</div>
                                    </div>
                                )
                                }
                                {learningDisabled && (
                                    <div className={styles.labelText}>
                                        <div className={styles.labels}>Learning disabled:</div>
                                        <div className={styles.subText}>This member has learning disabilities.</div>
                                    </div>
                                )
                                }
                                {lgbtq && (
                                    <div className={styles.labelText}>
                                        <div className={styles.labels}>LGBTQIA+:</div>
                                        <div className={styles.subText}>This member belongs to the LGBTQIA+ community.</div>
                                    </div>
                                )
                                }
                            </>
                        )}
                    </div>
                    <div className={styles.jobInfoBox}>
                        <div className={styles.labels}>Organization info</div>
                        <div className={styles.labelText}>
                            <div className={styles.labels}>Name:</div>
                            <div className={styles.subText}>{organizationId ? organizations[organizationId].name : "Company details."}</div>
                        </div>
                        <div className={styles.labelText}>
                            <div className={styles.labels}>Email:</div>
                            <div className={styles.subText}>{organizationId ? organizations[organizationId].email : "Company details."}</div>
                        </div>
                        <div className={styles.labelText}>
                            <div className={styles.labels}>Phone:</div>
                            <div className={styles.subText}>{organizationId ? `(${organizations[organizationId].phone.slice(0, 3)}) - ${organizations[organizationId].phone.slice(3, 6)}-${organizations[organizationId].phone.slice(6, 10)}` : "Company details."} </div>
                        </div>
                        <div className={styles.labelText}>
                            <div className={styles.labels}>Address:</div>
                            <div className={styles.subText}>{organizationId ? `${organizations[organizationId].street}, ${organizations[organizationId].city}, ${organizations[organizationId].state[0].toUpperCase()+organizations[organizationId].state[1].toUpperCase()} ${organizations[organizationId].zip}` : "Company details."}</div>
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
                <div style={{width: '520px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Fieldset style={{width: '235px'}}>
                    <Legend style={{width: '200px'}}> Select your organization
                    <div style={{display: 'flex', flexDirection: 'row', width: '200px', height: '30px', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <select style={{width: '200px', height: '25px'}} value={organizationId} onChange={(e) => setOrganizationId(e.target.value)}>
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
                <div style={{width: '520px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Fieldset style={{width: '235px'}}>
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
                    <Fieldset style={{width: '235px'}}>
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
                </div>
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
                                min='2004/04/24'
                                max='1932/04/24'
                                placeholder="Your DOB (must be 18 or older)."
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                            />
                        </Legend>
                    </Fieldset>
                </div>
                <Fieldset style={{height: '100px'}}>
                    <Legend style={{width: '120px'}}> Job description
                        <textarea
                            name="jobDescription"
                            placeholder="Add your job description (255 character limit)."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            style={{width: "475px", height: "75px", resize: 'none', fontSize: '14px', marginTop: '7px'}}
                        />
                    </Legend>
                </Fieldset>
                <div style={{width: '520px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Fieldset style={{height: '40px', width: '235px'}}>
                        <Legend style={{width: '50px'}}> Email
                            <Input
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Legend>
                    </Fieldset>
                </div>
                <div style={{width: '520px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Fieldset style={{height: '40px', width: '235px'}}>
                    <Legend style={{width: '100px'}}> Password
                        <Input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            onChange={(e) => setConfirm(e.target.value)}
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
                <DemoButtonBox>
                    <div className={styles.cancel} onClick={reset}>Reset</div>
                    <div className={styles.submit} onClick={handleSubmit}>Submit</div>
                </DemoButtonBox>
                <DemoBox>
                    <VolunteerDemoButton onClick={volunteerDemo}>Volunteer demo</VolunteerDemoButton>
                    <NonprofitDemoButton onClick={nonprofitDemo}>Nonprofit demo</NonprofitDemoButton>
                    <BusinessDemoButton onClick={businessDemo}>Business demo</BusinessDemoButton>
                </DemoBox>
                <div className={styles.question}>Already have an account?<div className={styles.modalOption} onClick={showLoginForm}>Log in</div></div>
                </Form>
            </FormBox>
        </Wrapper>
    )
}
