import React from 'react'
import { useSelector } from 'react-redux'
import ReactDOM from 'react-dom';

export const Modal = () => {

    const mount = useSelector(state => state.modals.modalMount);
    const display = useSelector(state => state.modals.display);
    const Current = useSelector(state => state.modals.currentModal);

    return display && mount && ReactDOM.createPortal(
        <Current />
    , mount)
}

export default Modal;
