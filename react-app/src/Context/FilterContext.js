import { createContext, useContext, useState, useEffect } from "react";

export const FilterContext = createContext();
export const useFilter = () => useContext(FilterContext);

export default function FilterProvider(props) {
    const [filter, setFilter] = useState('available');

    useEffect(() => {
        console.log(filter)
    },[filter])

    return (
        <FilterContext.Provider value={{ filter, setFilter }}>
            {props.children}
        </FilterContext.Provider>
    )
};
