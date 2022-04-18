const MODAL_SHOWN = 'MODAL_SHOWN';
const MODAL_HIDDEN = 'MODAL_HIDDEN';
const CURRENT_MODAL_SET = 'CURRENT_MODAL_SET';
const MODAL_MOUNT_SET = 'MODAL_MOUNT_SET';

export const showModal = () => ({
    type: MODAL_SHOWN
})

export const hideModal = () => ({
    type: MODAL_HIDDEN
})

export const setCurrentModal = (jsxComponent) => ({
    type: CURRENT_MODAL_SET,
    payload: jsxComponent
})

export const setModalMount = (mount) => ({
    type: MODAL_MOUNT_SET,
    payload: mount
})

const initialState = {
    currentModal: null,
    modalMount: null,
    display: false
}

export default function modals (state = initialState, action) {
    switch(action.type) {
        case MODAL_SHOWN: {
            return {
                ...state,
                display: true
            }
        }
        case MODAL_HIDDEN: {
            return {
                ...state,
                display: false
            }
        }
        case CURRENT_MODAL_SET: {
            return {
                ...state,
                currentModal: action.payload
            }
        }
        case MODAL_MOUNT_SET: {
            return {
                ...state,
                modalMount: action.payload
            }
        }
        default:
            return state
    }
}
