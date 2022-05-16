import styled, {css, keyframes} from 'styled-components';
import { Black, Bold, ExtraBold, Paragraph, Regular } from './Fonts';
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
    color: ${props => props.theme === 'light' ? 'white' : '#191919'};
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
    color: ${props => props.color ? props.color : props.theme === 'light' ? '#191919' : 'white'};
    font-size: ${props => props.fontSize ? props.fontSize : '1.1em'};
    margin: ${props => props.margin ? props.margin : '0px'};
`;

export const FormContent = styled.div`
    width: 400px;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

export const MessageFormContent = styled(FormContent)`
    height: auto;
    max-height: 350px;
    min-height: 350px;
    justify-content: flex-start;
`;

export const InputContainer = styled(FormContent)`
    height: ${props => props.height};
    margin: ${props => props.margin ? props.margin : '0px'};
`;

export const InputErrorBox = styled(FormContent)`
    min-height: 70px;
    height: ${props => props.height ? props.height : 'auto'};
    justify-content: flex-end;
    align-items: left;
    gap: 5px;
`;

export const Fieldset = styled.fieldset`
    width: 340px;
    height: ${props => props.height ? props.height : '35px'};
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
    width: ${props => props.width ? props.width : '70px'};
    height: 15px;
    font-weight: 600;
`;

export const MessageFieldset = styled.fieldset`
    width: 340px;
    height: ${props => props.height ? props.height : '35px'};
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

export const MessageLegend = styled.legend`
    color: ${props => props.error ? 'rgba(255, 0, 0, 0.75)' : '#28A690'};
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    font-size: 16px;
    width: ${props => props.width ? props.width : '70px'};
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
    width: ${props => props.width ? props.width : '348px'};
    height: ${props => props.height ? props.height : '30px'};
    font-size: 16px;
    margin-left: -6px;
    margin-top: 1px;
    padding-left: 5px;
    border-radius: none;
    cursor: ${props => props.cursor ? props.cursor : 'pointer'};
    outline: none;
    border: none;
    border-radius: 3px;
    background-color: ${props => props.bg ? props.bg : props.theme === 'light' ? 'white' : '#191919'};
    color: ${props => props.bg ? 'white' : props.theme === 'light' ? '#191919' : 'white'};
    ::-webkit-calendar-picker-indicator {
        filter: ${props => props.theme === 'light' ? '' : 'invert(1)'};
    }
`;

export const MessageArea = styled.textarea`
    width: 335px;
    height: auto;
    resize: vertical;
    max-height: 180px;
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
    display: flex;
    alignItems: center;
    justifyContent: center;
`;

export const InfoLabelText = styled(Bold)`
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 2px;
    margin-right: 5px;
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

export const CheckBoxContainer = styled.div`
    width: ${props => props.long ? '350px' : '200px'};
    height: 40px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: flex-start;
    padding-left: 5px;
    margin-bottom: 5px;
    margin-top: ${props => props.long ? '5px' : '0px'};
`;

export const OrganizationSelect = styled.select`
    border: 1.5px solid green;
    border-radius: 3px;
    height: 20px;
    margin-top: 5px;
`;

export const InputResetContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 330px;
    height: 20px;
    padding: 5px;
    padding-right: 20px;
`;

export const DragNDrop = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: ${props => props.width};
    height: ${props => props.height};
    margin: ${props => props.margin};
    border-radius: 2px;
    font-family: motiva-sans, sans-serif;
    background-color: rgba(0, 0, 0, 0.75);
    color: white;
    gap: 15px;
`;
