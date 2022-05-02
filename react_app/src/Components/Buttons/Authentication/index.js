import {
    SignupBtn,
    LoginBtn,
    SubmitBtn,
    CancelBtn,
    NonprofitBtn,
    BusinessBtn,
    VolunteerBtn
} from '../../Styled/Buttons';

export const AuthButton = ({ action }) => {
    return (
        <>
            {
            action === 'Log in' ?
                <LoginBtn>{action}</LoginBtn>
            :
            action === 'Sign up' ?
                <SignupBtn>{action}</SignupBtn>
            :
            action === 'Submit' ?
                <SubmitBtn>{action}</SubmitBtn>
            :
            action=== 'Cancel' ?
                <CancelBtn>{action}</CancelBtn>
            :
            action === 'Volunteer Demo' ?
                <VolunteerBtn>{action}</VolunteerBtn>
            :
            action === 'Nonprofit Demo' ?
                <NonprofitBtn>{action}</NonprofitBtn>
            :
            <BusinessBtn>{action}</BusinessBtn>
            }
        </>
    )
};
