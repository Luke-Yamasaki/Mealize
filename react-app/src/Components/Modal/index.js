import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactDOM from 'react-dom';
import { ModalBackGround, ModalField } from '../Styled/Modals';
import { hideModal } from '../../store/modal';

export const Modal = () => {
    const dispatch = useDispatch();

    const mount = useSelector(state => state.modals.modalMount);
    const display = useSelector(state => state.modals.display);
    const Current = useSelector(state => state.modals.currentModal);

    const closeModal = (e) => {
        e.preventDefault();
        dispatch(hideModal());
    };

    return display && mount && ReactDOM.createPortal(
        <ModalBackGround onClick={closeModal}>
            <ModalField onClick={e => e.stopPropagation()}>
                <Current />
            </ModalField>
        </ModalBackGround>
    , mount)
}

export default Modal;
