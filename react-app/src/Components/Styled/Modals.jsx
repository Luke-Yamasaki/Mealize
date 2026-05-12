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
    background-color: rgba(0, 0, 0, 0.75);
`;

export const ModalField = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor-pointer;
    z-index: 202;
`;
