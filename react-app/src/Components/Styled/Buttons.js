import styled from "styled-components";
import { Black, Paragraph } from './Fonts';

export const ButtonBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: right;
    width: 400px;
    height: 100px;
`;

export const InputButtonBox = styled(ButtonBox)`
    width: 380px;
    height: 50px;
    gap: 10px;
    padding-right: 20px;
    flex-direction: row;
    justify-content: flex-end;
`;

export const DemoBox = styled(ButtonBox)`
    width: 380px;
    height: 50px;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
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

export const PreviousButton = styled(FormButton)`
    background-color: #D49524;
`;

export const CancelButton = styled(FormButton)`
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

export const ActionBox = styled(DemoBox)`
    justify-content: flex-end;
    align-items: center;
    width: 380px;
    padding-right: 20px;
    padding-bottom: ${props => props.padding ? props.padding : '0px'};
    margin-top: ${props => props.marginTop ? props.marginTop : '0px'};
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

export const FormButtonBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
    align-items: center;
    width: 500px;
    height: 30px;
`;

const Button = styled.div`
    width: 80px;
    height: 30px;
    border: 1px solid #76D97E;
    background-color: transparent;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: white;
    cursor: pointer;
`;

export const LoginButton = styled(Button)`
    background-color: #005C4D;
`;

export const SignupButton = styled(Button)`
    background-color: #D49524;
    color: black;
`;

const ItemButton = styled.div`
    width: 120px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`;

export const QuestionBtn = styled(ItemButton)`
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    filter: drop-shadow(${props => props.theme === 'light' ? '0px 0px 1px rgba(0, 0, 0, 0.75)' : '0px 0px 1px rgba(255, 255, 255, 0.75)'});
`;

export const EditBtn = styled(ItemButton)`
    background-color: #D49524;
    filter: drop-shadow(${props => props.theme === 'light' ? '0px 0px 1px rgba(0, 0, 0, 0.75)' : '0px 0px 1px rgba(255, 255, 255, 0.75)'});
`;

export const RequestBtn = styled(ItemButton)`
    background: linear-gradient(#76D97E, #28A690);
`;

export const DeleteBtn = styled(ItemButton)`
    background-color: #C2462A;
`;

export const PostButton = styled.div`
    width: 75px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: #D49524;
    color: black;
    cursor: pointer;
`;

export const LogoutButton = styled(PostButton)`
    background-color: ${props => props.type === 'volunteer' ? '#D49524' : '#005C4D'};
`;

export const ResetIcon = styled.p`
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    font-size: 16px;
    cursor: pointer;
    height: 22.5px;
    opacity: ${props => props.data?.length > 0 ? '1' : '0.25' }
`;

export const ProfileButton = styled.img`
    width: 30px;
    height: 30px;
    object-fit: cover;
    object-position: center;
`;
