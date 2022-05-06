import { createContext, useContext, useState } from "react";

export const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

export default function ModalProvider(props) {
    const [modalName, setModalName] = useState('');

    return (
        <ModalContext.Provider value={{ modalName, setModalName }}>
            {props.children}
        </ModalContext.Provider>
    )
};
