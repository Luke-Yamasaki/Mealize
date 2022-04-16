import styled from 'styled-components';

export const Background = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #6B6B6B;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow-x: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 20px;
    }
    &::-webkit-scrollbar-track {
        background:  linear-gradient(0deg, #76d97e 0%, #28A690 100%);
    }
    &::-webkit-scrollbar-thumb {
        background: transparent;
        box-shadow: 0px 0px 0px 100000vh black;
    }
`;
