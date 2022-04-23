import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createDelivery } from '../../store/deliveries';
import { getOneUser } from '../../store/users';
import { useHistory } from 'react-router-dom';

import { ItemCard } from '../../Components/ItemCard';

import styled from 'styled-components';

const DeliveryBox = styled.div`
    diplay: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-betwee;
    background: linear-gradient(#76D97E, #28A690);
    margin: 0px;
    padding: 0px;
    width: 800px;l
    height: 600px;
`;

const DeliveryFormContainer= styled.div`
    width: 400px;
    height: 600px;
    display: flex;
    align-items: center;
    jsutify-content: center;
`;

const Form = styled.form`
    width: 375px;
    height: 575px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
`;

const DeliveryField = styled.fieldset`
    width: 350px;
    height: 75px;
    background-color: white;
    border-radius: 5px;
    border: none;
`;

const DeliveryLegend = styeld.legend`
width: 75px;
height: 45px;
color: black;
background-color: red;

`;

const DeliveryActions = styled.div`
    width: 200px;
    height: 45px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const DeliveryForm = ({ post }) => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [date, setDate] = useState("");
	const [time, setTime] = useState("");
    const [errors, setErrors] = useState([])

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

        if(!date) {
            alert('Please select a date for your delivery.');
            return
        } else if (!time) {
            alert('Please select a timeslot for your delivery.');
            return
        }

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

		await dispatch(getOneUser(sessionUser.id))

		if (newDelivery.error) {
			setErrors(newDelivery.error);
		} else {
			history.push("/");
		}

    }

    return (

        <form style={{width: '800px', height: '600px', backgroundColor: 'white', display: 'flex', flexDirection: 'row', margin: '0px', padding: '0px'}} onSubmit={handleSubmit}>
            <DeliveryBox>
                <ItemCard post={post}/>
                <DeliveryFormContainer>
                    <Form>
                        <DeliveryField>
                            <DeliveryLegend>Select a date</DeliveryLegend>
                        </DeliveryField>
                        <DeliveryField>

                        </DeliveryField>

                    </Form>
                </DeliveryFormContainer>



                <fieldset>
                    <legend>Select a date</legend>
                    <input
                        type="date"
                        name="date"
                        min={today}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <legend>Select a time</legend>
                    <select value={time} onChange={(e) => setTime(e.target.value)}>
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
                <div>
                    <div>Cancel</div>
                    <button onSubmit={handleSubmit}>Submit</button>
                </div>
            </DeliveryBox>
        </form>
    )
}
