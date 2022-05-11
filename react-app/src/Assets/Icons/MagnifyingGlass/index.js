export const MagnifyingGlass = ({ color }) => {
    if(color === 'black' || color === 'white') {
        return (
            <svg id="Black_magnifying_glass" dataname="Black magnifying glass" xmlns="http://www.w3.org/2000/svg" width="26.13" height="26.13" viewBox="0 0 26.13 26.13">
                <path id="Path_206" dataname="Path 206" d="M20.03,18.27a11.147,11.147,0,0,0,2.47-7.02A11.25,11.25,0,1,0,11.25,22.5a11.147,11.147,0,0,0,7.02-2.47l6.1,6.1,1.76-1.76ZM11.25,20A8.75,8.75,0,1,1,20,11.25,8.766,8.766,0,0,1,11.25,20" fill={ color === 'black' ? '#191919' : 'white' } />
            </svg>
        )
    } else {
        return (
            <svg id="Gradient_magnifying_glass" dataname="Gradient magnifying glass" xmlns="http://www.w3.org/2000/svg" width="26.13" height="26.13" viewBox="0 0 26.13 26.13">
                <defs>
                    <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                        <stop offset="0" stopColor="#76d97e"/>
                        <stop offset="1" stopColor="#28a690"/>
                    </linearGradient>
                </defs>
                <path id="Path_206" dataname="Path 206" d="M20.03,18.27a11.147,11.147,0,0,0,2.47-7.02A11.25,11.25,0,1,0,11.25,22.5a11.147,11.147,0,0,0,7.02-2.47l6.1,6.1,1.76-1.76ZM11.25,20A8.75,8.75,0,1,1,20,11.25,8.766,8.766,0,0,1,11.25,20" fill="url(#linear-gradient)"/>
            </svg>
        )
    };
};
