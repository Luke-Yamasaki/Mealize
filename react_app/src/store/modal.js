const SHOW_MODAL = 'SHOW_MODAL';
const HIDE_MODAL = 'HIDE_MODAL';
const SET_CURRENT_MODAL = 'SET_CURRENT_MODAL';
const SET_MODAL_MOUNT = 'SET_MODAL_MOUNT';

export const showModal = () => ({
    type: SHOW_MODAL
})

export const hideModal = () => ({
    type: HIDE_MODAL
})

export const setCurrentModal = (jsxComponent) => ({
    type: SET_CURRENT_MODAL,
    payload: jsxComponent
})

export const setModalMount = (mount) => ({
    type: SET_MODAL_MOUNT,
    payload: mount
})

const initialState = {
    currentModal: null,
    modalMount: null,
    display: false
}

export default function modals (state = initialState, action) {
    switch(action.type) {
        case SHOW_MODAL: {
            return {
                ...state,
                display: true
            }
        }
        case HIDE_MODAL: {
            return {
                ...state,
                display: false
            }
        }
        case SET_CURRENT_MODAL: {
            return {
                ...state,
                currentModal: action.payload
            }
        }
        case SET_MODAL_MOUNT: {
            return {
                ...state,
                modalMount: action.payload
            }
        }
        default:
            return state
    }
}
