import { useState } from 'react';

export const useLocalStorage = (key, startingValue) => {
    const [storedData, setStoredData] = useState(() => {
        if(typeof window === 'undefined') {
            return startingValue
        }
        try {
            const data = window.localStorage.getItem(key);
            return data ? JSON.parse(data) : startingValue;
        } catch (error) {
            return startingValue;
        }
    });
    const setSelection = (selection) => {
        try {
            const selectionToStore = selection instanceof Function ? selection(storedData) : selection;
            setStoredData(selectionToStore);

            if(typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(selectionToStore));
            }
        } catch (error) {
        }
    };
    return [storedData, setSelection];
};
