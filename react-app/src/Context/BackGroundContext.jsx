import { createContext, useContext, useState } from "react";

export const BackGroundContext = createContext();
export const useBackGround = () => useContext(BackGroundContext);

export default function BackGroundProvider(props) {
    const [backGround, setBackGround] = useState(localStorage.getItem('background') ? localStorage.getItem('background') : 'true');

    return (
        <BackGroundContext.Provider value={{ backGround, setBackGround }}>
            {props.children}
        </BackGroundContext.Provider>
    )
};
