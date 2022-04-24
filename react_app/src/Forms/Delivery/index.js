import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createDelivery } from '../../store/deliveries';
import { getOneUser } from '../../store/users';
import { useHistory } from 'react-router-dom';

import { ItemCard } from '../../Components/ItemCard';
import { Business } from '../../Assets/Icons/Business';
import { hideModal } from '../../store/modal';
import { OrganizationCard } from '../../Components/OrganizationCard'
import styles from './Delivery.module.css';
import styled from 'styled-components';

const DeliveryBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(#76D97E, #28A690);
    width: 900px;
    height: 600px;
    border-radius: 5px;
`;

const ItemContainer= styled.div`
    width: 450px;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
`;

const DeliveryFormContainer= styled.div`
    width: 450px;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #E8E8E8;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
`;

const Form = styled.form`
    width: 425px;
    height: 550px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    border: 1px solid rgb(213, 213, 213);
    padding-top: 25px;
`;

const FormTitle = styled.div`
    font-family: motiva-sans, sans-serif;
    font-size: 32px;
    color: black;
    font-weight: 900;
    height: 32px;
    width: 240px;
`;

const DeliveryActions = styled.div`
    width: 400px;
    height: 45px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
    align-items: center;
`;

const ErrorMessage = styled.div`
    width: 400px;
    height: 30px;
    color: #C2462A;
    font-size: 10px;
`;

const TitleBox = styled.div`
    width: 400px;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: -20px;
`;

const DateTimeBox = styled.div`
    width: 400px;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;




export const DeliveryForm = ({ post }) => {
    const sessionUser = useSelector(state => state.session.user);
    const business = useSelector(state => state.organizations.businesses[post.organizationId])
    const dispatch = useDispatch();
    const history = useHistory();
    const [date, setDate] = useState("");
	const [time, setTime] = useState("");
   const [dateErrors, setDateErrors] = useState([]);
   const [timeErrors, setTimeErrors] = useState([]);


    const timeObj = new Date();
	// convert local time zone offset from minutes to milliseconds
	const zone = timeObj.getTimezoneOffset() * 60 * 1000;
	// subtract offset from t
	let tLocal = timeObj - zone;
	// create shifted Date object
	const localTime = new Date(tLocal);
	// convert to iso format string
	const iso = localTime.toISOString();
	// drop the milliseconds and zone
	const isoNoZone = iso.slice(0, 19);
	// replace the T
	const today = isoNoZone.replace("T", " ").slice(0, 10);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dateErrArr = [];
        const timeErrArr = [];

        if(!date) {
            dateErrArr.push('Please select a date for your delivery.');
        }

        if (!time) {
            timeErrArr.push('Please select a timeslot for your delivery.');
        }

        if(date && time) {

            const deliveryData = {
                postId: post.id,
                organizationId: post.organizationId,
                userId: sessionUser.id,
                date: date,
                time: time,
            };

            const newDelivery = await dispatch(
                createDelivery(deliveryData)
            )

            // await dispatch(getOneUser(sessionUser.id))

            if (newDelivery.error) {
                newDelivery.error.map(err => {
                    if(err.includes('date')) {
                        dateErrArr.push('Invalid date.')
                    } else {
                        timeErrArr.push('Invalid time.')
                    }
                })
            } else {
                history.push(`/${newDelivery.id}`);
                dispatch(hideModal())
            }
        }

        setDateErrors(dateErrArr);
        setTimeErrors(timeErrArr);
    }

    return (
        <DeliveryBox>
            <ItemContainer>
                <ItemCard post={post}/>
            </ItemContainer>
            <DeliveryFormContainer>
                <Form onSubmit={handleSubmit} >
                    <TitleBox>
                        <Business />
                        <FormTitle>Pickup request</FormTitle>
                    </TitleBox>
                    <div style={{height: '175px'}}>
                        <div style={{width: '395px', height: '25px'}}><div style={{fontFamily: 'motiva-sans, sans-serif', fontWeight: '700', fontSize: '16px'}}>Pick up <i style={{color: '#C2462A'}}>{post.title}</i> from:</div></div>
                        <OrganizationCard organization={business} />
                    </div>
                    <div style={{width: '400px', height: '250px', display: 'flex', flexDirection: 'column'}}>
                        <div style={{color: '#C2462A', width: '400px', height: '35px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', fontSize: '12px', fontFamily: 'motiva-sans, sans-serif', fontWeight: '700'}}>
                            * Both fields required
                        </div>
                        <DateTimeBox>
                            {dateErrors && (
                                <ErrorMessage>{dateErrors[0]}</ErrorMessage>
                            )}
                            <fieldset style={{width: '200px', height: '50px'}} className={styles.fieldsets}>
                                <legend className={date && !dateErrors.length ? `${styles.legends} ${styles.confirmed}` : `${styles.legends} ${styles.error}`}>Select a date</legend>
                                <input required type="date" name="date" style={{width: '170px', padding: '0px'}} className={styles.date} min={today} value={date} onChange={(e) => setDate(e.target.value) }/>
                            </fieldset>
                            {timeErrors && (
                                <ErrorMessage>{timeErrors[0]}</ErrorMessage>
                            )}
                            <fieldset style={{width: '200px', height: '50px'}} className={styles.fieldsets}>
                                <legend className={time && !timeErrors.length ? `${styles.legends} ${styles.confirmed}` : `${styles.legends} ${styles.error}`}>Select a time</legend>
                                <select required value={time} style={{width: '170px', height: '20px', padding: '0px'}} className={styles.time} onChange={(e) => setTime(e.target.value)}>
                                    <option value="">--Select a time--</option>
                                    <optgroup label="Morning">
                                        <option value={"9"}> 9:00 AM </option>
                                        <option value={"9.5"}> 9:30 AM</option>
                                        <option value={"10"}>10:00 AM</option>
                                        <option value={"10.5"}>10:30 AM</option>
                                    </optgroup>
                                    <optgroup label="Noon">
                                        <option value={"11"}>11:00 AM</option>
                                        <option value={"11.5"}>11:30 AM</option>
                                        <option value={"12"}>12:00 PM</option>
                                        <option value={"12.5"}>12:30 PM</option>
                                    </optgroup>
                                    <optgroup label="Early afternoon">
                                        <option value={"13"}>1:00 PM</option>
                                        <option value={"13.5"}>1:30 PM</option>
                                        <option value={"14"}>2:00 PM</option>
                                    </optgroup>
                                    <optgroup label="Late afternoon">
                                        <option value={"14.5"}>2:30 PM</option>
                                        <option value={"15"}>3:00 PM</option>
                                        <option value={"15.5"}>3:30 PM</option>
                                        <option value={"16"}>4:00 PM</option>
                                    </optgroup>
                                </select>
                            </fieldset>
                        </DateTimeBox>
                        <DeliveryActions>
                            <div className={`${styles.button} ${styles.cancel}`} onClick={() => dispatch(hideModal())}>Cancel</div>
                            <div className={`${styles.button} ${styles.submit}`} onClick={handleSubmit}>Submit</div>
                        </DeliveryActions>
                    </div>
                </Form>
            </DeliveryFormContainer>
        </DeliveryBox>
    )
}
