export const MicrophoneIcon = ({ theme }) => {
    return (
        <>
            {theme === 'light' || theme === 'dark' ?
                <svg xmlns="http://www.w3.org/2000/svg" width="22.457" height="30" viewBox="0 0 22.457 30">
                    <g id="Group_1063" dataname="Group 1063" transform="translate(-6358 1539)">
                    <path id="Path_17379" dataname="Path 17379" d="M11.229,18.75h0A5.624,5.624,0,0,1,5.6,13.125v-7.5a5.625,5.625,0,1,1,11.25,0v7.5a5.625,5.625,0,0,1-5.625,5.625" transform="translate(6358 -1539)" fill={theme === 'light' ? 'black' : 'white'}/>
                    <path id="Path_17380" dataname="Path 17380" d="M22.456,13.84A11.27,11.27,0,0,1,13.1,24.219v5.038A.744.744,0,0,1,12.36,30H10.1a.744.744,0,0,1-.744-.743V24.219A11.27,11.27,0,0,1,0,13.84a.678.678,0,0,1,.679-.715H3.075a.678.678,0,0,1,.679.615,7.5,7.5,0,0,0,14.95,0,.678.678,0,0,1,.679-.615h2.394a.678.678,0,0,1,.679.715" transform="translate(6358 -1539)" fill={theme === 'light' ? 'black' : 'white'}/>
                    </g>
                </svg>
            :
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="22.457" height="30" viewBox="0 0 22.457 30">
                    <defs>
                    <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                        <stop offset="0" stopColor="#76d97e"/>
                        <stop offset="1" stopColor="#28a690"/>
                    </linearGradient>
                    </defs>
                    <g id="Group_1064" dataname="Group 1064" transform="translate(-6358 1539)">
                    <path id="Path_17379" dataname="Path 17379" d="M11.229,18.75h0A5.624,5.624,0,0,1,5.6,13.125v-7.5a5.625,5.625,0,1,1,11.25,0v7.5a5.625,5.625,0,0,1-5.625,5.625" transform="translate(6358 -1539)" fill="url(#linear-gradient)"/>
                    <path id="Path_17380" dataname="Path 17380" d="M22.456,13.84A11.27,11.27,0,0,1,13.1,24.219v5.038A.744.744,0,0,1,12.36,30H10.1a.744.744,0,0,1-.744-.743V24.219A11.27,11.27,0,0,1,0,13.84a.678.678,0,0,1,.679-.715H3.075a.678.678,0,0,1,.679.615,7.5,7.5,0,0,0,14.95,0,.678.678,0,0,1,.679-.615h2.394a.678.678,0,0,1,.679.715" transform="translate(6358 -1539)" fill="url(#linear-gradient)"/>
                    </g>
                </svg>
            }
        </>
    )
};
