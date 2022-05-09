import styled from "styled-components";

export const ButtonBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 170px;
    height: 30px;
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

export const DemoBox = styled.div`
    width: 500px;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
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

export const LoginBtn = styled(Button)`
    background-color: #005C4D;
`;

export const SignupBtn = styled(Button)`
    background-color: #D49524;
    color: black;
`;

export const SubmitBtn = styled(Button)`
    background-color: #76D97E;
    color: black;
    font-weight: 700;
`;

export const CancelBtn = styled(Button)`
    background-color: #28A690;
    color: black;
    font-weight: 700;
`;

const DemoButton = styled.div`
    width: 115px;
    height: 35px;
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

export const NonprofitBtn = styled(DemoButton)`
    background-color: #024A59;
`;

export const BusinessBtn = styled(DemoButton)`
    background-color: #024A59;
`;

export const VolunteerBtn = styled(DemoButton)`
    background-color: #9AF2C0;
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

export const RequestBtn = styled(ItemButton)`
    background: linear-gradient(#76D97E, #28A690);
`;

export const PostButton = styled.div`
    width: 100px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: ${props => props.theme === 'light' ? 'green' : 'blue'}
`;

export const SearchSubmitInput = styled.input`
    display: none;
`;

export const ResetSearchBox = styled.div`
    display: ${props => props.entering ? 'flex' : 'none'};
    width: 20px;
    height: 20px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const ResetSearchIcon = styled.p`
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    font-size: 1em;
`;

export const ProfileButton = styled.img`
    width: 30px;
    height: 30px;
    object-fit: cover;
    object-position: center;
`;
