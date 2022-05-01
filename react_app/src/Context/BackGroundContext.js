import { createContext, useContext, useState } from "react";

export const BackGroundContext = createContext();
export const useBackGround = () => useContext(BackGroundContext);

export default function BackGroundProvider(props) {
    const [backGround, setBackGround] = useState(true);

    return (
        <BackGroundContext.Provider value={{ backGround, setBackGround }}>
            {props.children}
        </BackGroundContext.Provider>
    )
};
