import styled from 'styled-components';

export const DarkBackGround = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding-right: 10.75vw;
    z-index: 501;
`;

export const TransparentBackGround = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding-right: 10.75vw;
    z-index: 501;
`;

export const ModalField = styled.div`
    width: 350px;
    height: 650px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;
