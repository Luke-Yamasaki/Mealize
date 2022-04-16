import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>First name</legend>
                    <input type='text' name='firstname' value={firstName}></input>
                </fieldset>
            </form>
        </>
    )
}
