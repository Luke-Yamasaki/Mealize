export const LocationPin = ({ color }) => {
    if(color === 'black' || color === 'white') {
        return (
            <svg id="Black_location" dataname="Black location" xmlns="http://www.w3.org/2000/svg" width="26.5" height="35.34" viewBox="0 0 26.5 35.34">
                <g id="Group_807" dataname="Group 807" transform="translate(3172 14689)">
                    <path id="Path_209" dataname="Path 209" d="M47.75,29.5A13.26,13.26,0,0,0,34.5,42.75c0,5.38,6.79,15.39,10.84,20.87a2.99,2.99,0,0,0,4.82,0C54.21,58.14,61,48.13,61,42.75A13.26,13.26,0,0,0,47.75,29.5m.4,32.64a.5.5,0,0,1-.8,0C40.87,53.35,37,46.11,37,42.75a10.75,10.75,0,0,1,21.5,0c0,3.36-3.87,10.6-10.35,19.39" transform="translate(-3206.5 -14718.5)" fill={ color === 'black' ? 'black' : 'white' } />
                    <path id="Path_210" dataname="Path 210" d="M47.75,37.5A5.25,5.25,0,1,0,53,42.75a5.256,5.256,0,0,0-5.25-5.25m0,8a2.75,2.75,0,1,1,2.75-2.75,2.748,2.748,0,0,1-2.75,2.75" transform="translate(-3206.5 -14718.5)"/>
                </g>
            </svg>
        )
    } else {
        return (
        <svg id="Gradient_location" dataname="Gradient location" xmlns="http://www.w3.org/2000/svg" width="26.5" height="35.34" viewBox="0 0 26.5 35.34">
            <defs>
                <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                    <stop offset="0" stopColor="#76d97e"/>
                    <stop offset="1" stopColor="#28a690"/>
                </linearGradient>
            </defs>
            <g id="Group_808" dataname="Group 808" transform="translate(3172 14689)">
                <path id="Path_209" dataname="Path 209" d="M47.75,29.5A13.26,13.26,0,0,0,34.5,42.75c0,5.38,6.79,15.39,10.84,20.87a2.99,2.99,0,0,0,4.82,0C54.21,58.14,61,48.13,61,42.75A13.26,13.26,0,0,0,47.75,29.5m.4,32.64a.5.5,0,0,1-.8,0C40.87,53.35,37,46.11,37,42.75a10.75,10.75,0,0,1,21.5,0c0,3.36-3.87,10.6-10.35,19.39" transform="translate(-3206.5 -14718.5)" fill="url(#linear-gradient)"/>
                <path id="Path_210" dataname="Path 210" d="M47.75,37.5A5.25,5.25,0,1,0,53,42.75a5.256,5.256,0,0,0-5.25-5.25m0,8a2.75,2.75,0,1,1,2.75-2.75,2.748,2.748,0,0,1-2.75,2.75" transform="translate(-3206.5 -14718.5)" fill="url(#linear-gradient)"/>
            </g>
        </svg>
        )
    }

}
