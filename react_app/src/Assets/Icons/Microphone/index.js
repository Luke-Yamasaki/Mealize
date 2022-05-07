export const MicrophoneIcon = ({ color }) => {
    return (
        <>
            {color === 'light' || color === 'dark' ?
                <svg xmlns="http://www.w3.org/2000/svg" width="19.996" height="30" viewBox="0 0 19.996 30" opacity='50%'>
                    <g id="Group_1072" dataname="Group 1072" transform="translate(-5141 1986)">
                        <path id="Path_17385" dataname="Path 17385" d="M10.825,36.829V39.8h3.284a.826.826,0,1,1,0,1.653H5.889a.826.826,0,1,1,0-1.653H9.172V36.829A9.978,9.978,0,0,1,0,27.368a.822.822,0,0,1,.231-.609.81.81,0,0,1,.6-.259.818.818,0,0,1,.819.784,8.357,8.357,0,0,0,16.691,0,.818.818,0,0,1,.819-.784.81.81,0,0,1,.6.259.822.822,0,0,1,.231.609,9.978,9.978,0,0,1-9.171,9.461" transform="translate(5141 -1997.451)" fill={color === 'light' ? 'black' : 'white'}/>
                        <rect id="Rectangle_1039" dataname="Rectangle 1039" width="12.66" height="21.604" rx="6.33" transform="translate(5144.725 -1986)" fill={color === 'light' ? 'black' : 'white'}/>
                    </g>
                </svg>
            :
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="19.996" height="30" viewBox="0 0 19.996 30" opacity='75%'>
                    <defs>
                    <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                        <stop offset="0" stopColor="#76d97e"/>
                        <stop offset="1" stopColor="#28a690"/>
                    </linearGradient>
                    </defs>
                    <g id="Group_1073" dataname="Group 1073" transform="translate(-5141 1986)">
                        <path id="Path_17385" dataname="Path 17385" d="M10.825,36.829V39.8h3.284a.826.826,0,1,1,0,1.653H5.889a.826.826,0,1,1,0-1.653H9.172V36.829A9.978,9.978,0,0,1,0,27.368a.822.822,0,0,1,.231-.609.81.81,0,0,1,.6-.259.818.818,0,0,1,.819.784,8.357,8.357,0,0,0,16.691,0,.818.818,0,0,1,.819-.784.81.81,0,0,1,.6.259.822.822,0,0,1,.231.609,9.978,9.978,0,0,1-9.171,9.461" transform="translate(5141 -1997.451)" fill="url(#linear-gradient)"/>
                        <rect id="Rectangle_1039" dataname="Rectangle 1039" width="12.66" height="21.604" rx="6.33" transform="translate(5144.725 -1986)" fill="url(#linear-gradient)"/>
                    </g>
                </svg>
            }
        </>
    )
};
