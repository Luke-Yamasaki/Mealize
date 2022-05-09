//Hooks
import { useDispatch } from 'react-redux';
import { useModal } from '../../Context/ModalContext';
//Actions
import { hideModal } from '../../store/modal';
//Forms
import { LoginForm } from '../Login';
import { SignupForm } from '../Signup';
import { DeliveryForm } from '../Delivery';
import { EditDeliveryForm } from '../Delivery/EditDelivery';

import { ModalBackGround, ModalField  } from '../../Components/Styled/Modals';

export const FormModal = () => {
    const dispatch = useDispatch();
    const {modalName, setModalName} = useModal();

    const closeModal = () => {
        setModalName('');
        dispatch(hideModal());
    };

    return (
        <ModalBackGround onClick={closeModal}>
            <ModalField onClick={e => e.stopPropagation()}>
                {modalName === 'login' && <LoginForm />}
                {modalName === 'signup' && <SignupForm />}
                {modalName === 'post' && <LoginForm />}
                {modalName === 'editPost' && <LoginForm />}
                {modalName === 'request' && <DeliveryForm />}
                {modalName === 'editRequest' && <EditDeliveryForm />}
            </ModalField>
        </ModalBackGround>
    )
};
