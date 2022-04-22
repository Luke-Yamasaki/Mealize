import React from 'react';
import { getAllPosts, removePost, updateItem } from '../../../store/posts';
import { setCurrentModal, showModal } from '../../../store/modal';


export const Triangle = ({ status }) => {
    const color = status === 0 ? "url(#linear-gradient)" : "url(#linear-gradient-black)"

    const handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();

    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="104.669" height="110.969" viewBox="0 0 104.669 110.969" onClick={handleClick}>
            <defs>
                <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                    <stop offset="0" stopColor="#76d97e" />
                    <stop offset="1" stopColor="#28a690"/>
                </linearGradient>
                <linearGradient id="linear-gradient-black" x1="0.25" x2="0.5"  y2="0.75" gradientUnits="objectBoundingBox">
                    <stop offset="0" stopColor="#76d97e" />
                    <stop offset="1" stopColor="#000000"/>
                    <stop offset="2" stopColor="#000000"/>
                    <stop offset="3" stopColor="#000000"/>
                </linearGradient>
            </defs>
                <path id="Path_306" dataname="Path 306" d="M808.29-15103.477v-150.969H663.62Z" transform="translate(-663.62 15254.445)" fill={color}/>
                {status === 0 ?
                <text id="Available" transform="matrix(0.695, 0.719, -0.719, 0.695, 56.67, 21.895)" fill="#fff">
                    <tspan x="-20" y="5" style={{fontSize: "16px", fontFamily: "motiva-sans,sans-serif", fontWeight: "700"}} >
                        Available
                    </tspan>
                </text>
                :
                <text id="Unavailable" transform="matrix(0.695, 0.719, -0.719, 0.695, 56.67, 21.895)" fill="#fff">
                    <tspan x="-25" y="10" style={{fontSize: "16px", fontFamily: "motiva-sans,sans-serif", fontWeight: "700"}} >
                        Unavailable
                    </tspan>
                </text>
                }

        </svg>
    );
};
