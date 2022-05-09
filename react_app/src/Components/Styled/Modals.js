import styled from 'styled-components';

export const ModalBackGround = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    z-index: 201;
    background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalField = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor-pointer;
`;

export const SettingsModalBackGround = styled(ModalBackGround)`
    flex-direction: row;
    justify-content: flex-end;
    background-color: rgba(0, 0, 0, 0);
    padding-right: 11.75vw;
    z-index: 202;
`;

export const SettingsModalField = styled.div`
    width: 300px;
    height: 650px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;
