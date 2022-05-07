import { createContext, useContext, useState } from "react";

export const ColorContext = createContext();
export const useColor = () => useContext(ColorContext);

export default function ColorProvider(props) {
    const [color, setColor] = useState(false);

    return (
        <ColorContext.Provider value={{ color, setColor }}>
            {props.children}
        </ColorContext.Provider>
    )
};
