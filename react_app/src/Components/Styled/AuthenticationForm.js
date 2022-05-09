import styled from 'styled-components';
import { ExtraBold, Paragraph } from './Fonts';

export const FormContainer = styled.fieldset`
    width: 450px;
    height: 650px;
    background: linear-gradient(#76D97E, #28A690);
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
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
    width: 400px;
    height: 500px;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-radius: 5px;
    border: 1px solid;
    border-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    font-size: 32px;
    font-family: motiva-sans, sans-serif;
    font-weight: 900;
    text-align: left;
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
    height: 20px;
    display: flex;
    justify-content: left;
    align-items: center;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    font-weight: ${props => props.theme === 'light' ? '700' : '500'};
    margin-bottom: -25px;
`;

export const Error = styled(Paragraph)`
    color: red;
    font-size: 14px;
    text-align: center;
`;

export const ButtonBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
    align-items: center;
    width: 400px;
    height: 30px;
    margin-right: 20px;
`;

export const DemoBox = styled.div`
    width: 400px;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const FormButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 35px;
    border-radius: 5px;
    cursor: pointer;
`;

export const SubmitButton = styled(FormButton)`
    background-color: #76D97E;
`;

export const ResetButton = styled(FormButton)`
    background-color: #28A690;
`;

export const VolunteerDemoButton = styled(FormButton)`
    width: 115px;
    background-color: #9AF2C0;
`;

export const NonprofitDemoButton = styled(FormButton)`
    width: 115px;
    background-color: #04B1D9;
`;

export const BusinessDemoButton = styled(FormButton)`
    width: 115px;
    background-color: #024A59;
`;

export const ButtonText = styled(Paragraph)`
    font-size: 12px;
    color: ${props => props.color ? props.color : '#191919'};
    font-weight: ${props => props.weight ? props.weight : '700'};
    letter-spacing: ${props => props.color ? '0.3px' : '0.11px'}
`;
