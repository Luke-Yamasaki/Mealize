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

export const LoginBtn = styled(Button)`


`;

export const SignupBtn = styled(Button)`

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

export const NonprofitBtn = styled(DemoButton)`
    background-color: #024A59;
`;

export const BusinessBtn = styled(DemoButton)`
    background-color: #024A59;
`;

export const VolunteerBtn = styled(DemoButton)`
    background-color: #9AF2C0;
`;
