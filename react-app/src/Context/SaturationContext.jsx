import { createContext, useContext, useState } from "react";

export const SaturationContext = createContext();
export const useSaturation = () => useContext(SaturationContext);

export default function SaturationProvider(props) {
    const [saturation, setSaturation] = useState(100);

    return (
        <SaturationContext.Provider value={{ saturation, setSaturation }}>
            {props.children}
        </SaturationContext.Provider>
    )
};
