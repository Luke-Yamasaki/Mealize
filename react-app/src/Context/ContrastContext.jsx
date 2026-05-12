import { createContext, useContext, useState } from "react";

export const ContrastContext = createContext();
export const useContrast = () => useContext(ContrastContext);

export default function ContrastProvider(props) {
    const [contrast, setContrast] = useState(false);

    return (
        <ContrastContext.Provider value={{ contrast, setContrast }}>
            {props.children}
        </ContrastContext.Provider>
    )
};
