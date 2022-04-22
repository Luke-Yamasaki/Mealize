import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateDelivery } from '../../../store/deliveries';
import { getOneUser } from '../../../store/users';

export const EditDeliveryForm = ({ delivery }) => {
    const sessionUser = useSelector(state => state.session.user);
    const [date, setDate] = useState(delivery.date);
	const [time, setTime] = useState(delivery.time);

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
        <form onSubmit={handleSubmit}>
            Reservation form
            <div>
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
            </div>
        </form>
    )
};
