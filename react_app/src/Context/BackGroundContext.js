import { createContext, useContext, useState } from "react";
import pattern from '../Assets/Images/Pattern_5.png';

export const BackGroundContext = createContext();
export const useBackGround = () => useContext(BackGroundContext);

export default function BackGroundProvider(props) {
    const [backGround, setBackGround] = useState(pattern);

    return (
        <BackGroundContext.Provider value={{ backGround, setBackGround }}>
            {props.children}
        </BackGroundContext.Provider>
    )
};
