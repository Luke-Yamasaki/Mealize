import { createContext, useContext, useState } from "react";

export const DyslexicContext = createContext();
export const useDyslexic = () => useContext(DyslexicContext);

export default function DyslexicProvider(props) {
    const [Dyslexic, setDyslexic] = useState(true);

    return (
        <DyslexicContext.Provider value={{ Dyslexic, setDyslexic }}>
            {props.children}
        </DyslexicContext.Provider>
    )
};
