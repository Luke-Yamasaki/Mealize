export const LocationPin = ({theme}) => {
    if(theme === 'light' || theme === 'dark') {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="23.141" height="30" viewBox="0 0 23.141 30">
                <path id="Path_18239" dataname="Path 18239" d="M11.571,0A11.571,11.571,0,0,0,0,11.571c0,5.094,7.353,14.322,10.336,17.855a1.614,1.614,0,0,0,2.47,0c2.983-3.533,10.336-12.761,10.336-17.855A11.571,11.571,0,0,0,11.571,0m0,15.194a4.417,4.417,0,1,1,4.418-4.418,4.417,4.417,0,0,1-4.418,4.418" fill={theme === 'light' ? '#191919' : 'white'}/>
            </svg>
        )
    } else {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="23.141" height="30" viewBox="0 0 23.141 30">
                <defs>
                    <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                        <stop offset="0" stopColor="#76d97e"/>
                        <stop offset="1" stopColor="#28a690"/>
                    </linearGradient>
                </defs>
                <path id="Path_18240" dataname="Path 18240" d="M11.571,0A11.571,11.571,0,0,0,0,11.571c0,5.094,7.353,14.322,10.336,17.855a1.614,1.614,0,0,0,2.47,0c2.983-3.533,10.336-12.761,10.336-17.855A11.571,11.571,0,0,0,11.571,0m0,15.194a4.417,4.417,0,1,1,4.418-4.418,4.417,4.417,0,0,1-4.418,4.418" fill="url(#linear-gradient)"/>
            </svg>
        )
    }
};
