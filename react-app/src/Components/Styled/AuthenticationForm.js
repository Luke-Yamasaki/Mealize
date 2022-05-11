import styled, {css, keyframes} from 'styled-components';
import { Black, ExtraBold, Paragraph } from './Fonts';
import { DemoBox } from './Buttons';

const left = keyframes`
    from { margin-left: 0px; opacity: 100% }
    to { margin-left: -500px; opacity: 0%; width: 0px; }
`;

const slideLeft = () =>
    css`
    ${left} 0.5s forwards;
    `

export const FormContainer = styled.fieldset`
    width: ${props => props.width ? props.width : '450px'};
    height: ${props => props.height ? props.height : '600px'};
    background: linear-gradient(#76D97E, #28A690);
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: ${props => props.marginTop ? props.marginTop : '0px'};
`;

export const FormLegend = styled.legend`
    width: 300px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin: 0px;
    padding-top: 0px;
    background: linear-gradient(#76D97E, #28A690);
`;

export const LogoType = styled(ExtraBold)`
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    font-size: 2em;
`;

export const Form = styled.form`
    width: ${props => props.width ? props.width : '400px'};
    height: ${props => props.height ? props.height : '450px'};
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 25px;
    border-radius: 5px;
    border: 1px solid;
    border-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    font-size: 32px;
    font-family: motiva-sans, sans-serif;
    font-weight: 900;
    text-align: left;
`;

export const FormTitleBox = styled.div`
    width: 400px;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const FormTitle = styled(Black)`
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    font-size: 1.1em;
`;

export const FormContent = styled.div`
    width: 400px;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

export const InputContainer = styled(FormContent)`
    height: ${props => props.height};
`;

export const InputErrorBox = styled(FormContent)`
    max-height: 120px;
    min-height: 70px;
    height: auto;
    justify-content: flex-end;
    align-items: left;
    gap: 5px;
`;

export const Fieldset = styled.fieldset`
    width: 340px;
    height: 35px;
    border: ${props => props.error ? '1px solid rgba(255, 0, 0, 0.75)' : '1px solid #28A690'};
    border-radius: 3px;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0px;
    padding-left: 5px;
`;

export const Legend = styled.legend`
    color: ${props => props.error ? 'rgba(255, 0, 0, 0.75)' : '#28A690'};
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    font-size: 16px;
    width: 70px;
    height: 15px;
    font-weight: 600;
`;

export const EmailLegend = styled(Legend)`
    width: 40px;
`;

export const PasswordLegend = styled(Legend)`
    width: 72px;
`;

export const Input = styled.input`
    width: 348px;
    height: 30px;
    font-size: 16px;
    margin-left: -6px;
    margin-top: 1px;
    padding-left: 5px;
    border-radius: none;
    cursor: pointer;
    outline: none;
    border: none;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
`;

export const ErrorBox = styled.div`
    width: 350px;
    height: ${props => props.height};
    display: flex;
    justify-content: left;
    align-items: center;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    font-weight: ${props => props.theme === 'light' ? '700' : '500'};
`;

export const Error = styled(Paragraph)`
    color: red;
    font-size: 12px;
    text-align: center;
    height: 12px;
    margin-left: 5px;
    margin-top: 5px;
`;

export const ActionBox = styled(DemoBox)`
    justify-content: flex-end;
    align-items: center;
    width: 380px;
    padding-right: 20px;
    gap: 10px;
`;

export const ActionText = styled(Black)`
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    font-weight: ${props => props.theme === 'light' ? '900' : '700'};
    letter-spacing: ${props => props.theme === 'light' ? '0px' : '0.1px'};
    font-size: 16px;
`;

export const SignupText = styled(ActionText)`
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
`;

export const OptInfoLabel = styled.label`
    font-family: motiva-sans, sans-serif;
    font-weight: 700;
    font-size: 12px;
`;

export const SlidingFormContainer = styled.div`
    width: 400px;
    height: 400px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`;

export const SlidingForm = styled.div`
    animation: ${props => props.next === 'slide' ? slideLeft : 'none'};
`;
