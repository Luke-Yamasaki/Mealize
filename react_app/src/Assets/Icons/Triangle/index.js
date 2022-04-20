import React from 'react';

export const Triangle = ({ status }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="144.669" height="150.969" viewBox="0 0 144.669 150.969">
            <defs>
                <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                    <stop offset="0" stopColor={ status === 0 ? "#76d97e" : "#0e0e0e"}/>
                    <stop offset="1" stopColor="#28a690"/>
                </linearGradient>
            </defs>
                <path id="Path_306" dataname="Path 306" d="M808.29-15103.477v-150.969H663.62Z" transform="translate(-663.62 15254.445)" fill="url(#linear-gradient)"/>
                <text id="Available" transform="matrix(0.695, 0.719, -0.719, 0.695, 56.67, 21.895)" fill="#fff" style={{fontSize: "21px", fontFamily: "mentone", fontWeight: "700"}}><tspan x="0" y="0">{status === 0 ? 'Available' : 'Unavailable'}</tspan></text>
        </svg>
    );
};
