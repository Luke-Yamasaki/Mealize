import { useState } from 'react';
import styles from './Logo.module.css';

export const Logo = ({ dimension }) => {
    const [xLarge, setXLarge] = useState(dimension === 'xLarge')
    const [large, setLarge] = useState(dimension === 'large');
    const [medium, setMedium] = useState(dimension === 'medium');
    const [small, setSmall] = useState(dimension === 'small')

    if(xLarge === true) {
       return (
            <svg xmlns="http://www.w3.org/2000/svg" width="8357.219" height="7133.676" viewBox="0 0 8357.219 7133.676" className={styles.parent}>
                <defs>
                    <clipPath id="clip-path">
                        <rect id="Rectangle_4" dataname="Rectangle 4" width="8357.219" height="7133.676" fill="#fff"/>
                    </clipPath>
                </defs>
                <g id="Group_2" dataname="Group 2" transform="translate(-0.001)">
                    <g id="Group_1" dataname="Group 1" transform="translate(0.001)" clipPath="url(#clip-path)">
                    <path id="Path_1" dataname="Path 1" d="M7705.651,3797.408,7324.48,4178.882,4504.463,6998.6c-179.726,179.906-471.307,180.086-651.212.36l-.3-.36L651.7,3797.408c-868.725-868.424-868.966-2276.627-.542-3145.352l.542-.6a2224.167,2224.167,0,0,1,2814.36-272.627,459.688,459.688,0,0,1,200.544,338.091l.6,4.513a461.171,461.171,0,0,1-153.854,388.995l-423.291,373.892a1732.057,1732.057,0,0,0-569.623,1508.324L2720.323,4660.9c16.246,147.716,141.036,259.631,289.656,259.812h30.084c168.535-2.887,302.772-141.818,299.885-310.353-.061-3.13-.121-6.259-.3-9.387L3219.789,2952.931c-10.71-176.657,123.828-328.584,300.485-339.295,6.378-.421,12.816-.6,19.254-.6a313.685,313.685,0,0,1,219.5,91.217,333.373,333.373,0,0,1,99.942,218.535l20.157,1707.967c4.753,161.855,137.667,290.5,299.582,289.9,160.532-2.888,291.4-129.544,299.583-289.9L4518.3,2922.787c5.6-172.566,147.054-309.691,319.739-309.812,180.329,3.671,323.591,152.83,319.981,333.158-.06,2.286-.12,4.513-.24,6.739l-120.159,1648.1c-11.251,164.924,113.359,307.765,278.283,319.018,7.16.481,14.38.722,21.541.722a299.034,299.034,0,0,0,197.234-73.768A269.437,269.437,0,0,0,5626.8,4660.9L5836.913,2992.7a1721.956,1721.956,0,0,0-569.562-1508.324L4844.12,1110.427a460.653,460.653,0,0,1-153.854-388.514l.6-4.513a462.238,462.238,0,0,1,202.59-339.9C5776.083-214.562,6954.138-99.639,7705.711,651.756c868.664,868.545,868.725,2276.748.242,3145.352l-.3.3" transform="translate(-0.008 -0.001)" fill="#fff"/>
                    </g>
                </g>
            </svg>
        )
    } else if(large === true) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="592.167" height="505.471" viewBox="0 0 592.167 505.471">
                <defs>
                    <clipPath id="clip-path">
                        <rect id="Rectangle_4" dataname="Rectangle 4" width="592.167" height="505.471" fill="#fff"/>
                    </clipPath>
                </defs>
                <g id="Group_2" dataname="Group 2" transform="translate(-0.001)">
                    <g id="Group_1" dataname="Group 1" transform="translate(0.001)" clipPath="url(#clip-path)">
                        <path id="Path_1" dataname="Path 1" d="M546,269.073,518.99,296.1,319.173,495.9a32.629,32.629,0,0,1-46.143.026l-.021-.026L46.177,269.073A157.592,157.592,0,0,1,46.139,46.2l.038-.043A157.6,157.6,0,0,1,245.595,26.843,32.572,32.572,0,0,1,259.8,50.8l.043.32a32.677,32.677,0,0,1-10.9,27.563l-29.993,26.493A122.728,122.728,0,0,0,178.591,212.05l14.163,118.207a20.674,20.674,0,0,0,20.524,18.409h2.132a21.621,21.621,0,0,0,21.249-21.991c0-.222-.009-.443-.021-.665l-8.493-116.775a22.709,22.709,0,0,1,21.291-24.041c.452-.03.908-.043,1.364-.043a22.227,22.227,0,0,1,15.553,6.463,23.622,23.622,0,0,1,7.082,15.485l1.428,121.021a21.163,21.163,0,0,0,21.228,20.541,21.645,21.645,0,0,0,21.228-20.541L320.153,207.1a22.688,22.688,0,0,1,22.656-21.952,23.15,23.15,0,0,1,22.673,23.607c0,.162-.009.32-.017.477l-8.514,116.779a21.212,21.212,0,0,0,19.718,22.6c.507.034,1.019.051,1.526.051a21.188,21.188,0,0,0,13.975-5.227,19.092,19.092,0,0,0,6.527-13.183l14.888-118.2a122.013,122.013,0,0,0-40.357-106.875l-29.989-26.5a32.641,32.641,0,0,1-10.9-27.529l.043-.32a32.753,32.753,0,0,1,14.355-24.084,157.609,157.609,0,0,1,199.285,242.3l-.021.021" transform="translate(0 0)" fill="#fff"/>
                    </g>
                </g>
            </svg>
        )
    } else if(medium === true) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="38.412" viewBox="0 0 45 38.412">
                <defs>
                    <clipPath id="clip-path">
                        <rect id="Rectangle_4" dataname="Rectangle 4" width="45" height="38.412" fill="#fff"/>
                    </clipPath>
                </defs>
                <g id="Group_2" dataname="Group 2" transform="translate(-0.001)">
                    <g id="Group_1" dataname="Group 1" transform="translate(0.001)" clipPath="url(#clip-path)">
                        <path id="Path_1" dataname="Path 1" d="M41.491,20.447,39.439,22.5,24.254,37.684a2.48,2.48,0,0,1-3.506,0l0,0L3.509,20.447a11.976,11.976,0,0,1,0-16.936l0,0A11.976,11.976,0,0,1,18.663,2.04a2.475,2.475,0,0,1,1.08,1.82l0,.024a2.483,2.483,0,0,1-.828,2.095L16.639,7.992a9.326,9.326,0,0,0-3.067,8.122L14.648,25.1a1.571,1.571,0,0,0,1.56,1.4h.162a1.643,1.643,0,0,0,1.615-1.671c0-.017,0-.034,0-.051L17.337,15.9a1.726,1.726,0,0,1,1.618-1.827c.034,0,.069,0,.1,0a1.689,1.689,0,0,1,1.182.491,1.8,1.8,0,0,1,.538,1.177l.109,9.2A1.608,1.608,0,0,0,22.5,26.5a1.645,1.645,0,0,0,1.613-1.561l.215-9.2a1.724,1.724,0,0,1,1.722-1.668,1.759,1.759,0,0,1,1.723,1.794c0,.012,0,.024,0,.036l-.647,8.874a1.612,1.612,0,0,0,1.5,1.718c.039,0,.077,0,.116,0a1.61,1.61,0,0,0,1.062-.4,1.451,1.451,0,0,0,.5-1l1.131-8.983a9.272,9.272,0,0,0-3.067-8.122L26.083,5.979a2.48,2.48,0,0,1-.828-2.092l0-.024a2.489,2.489,0,0,1,1.091-1.83A11.977,11.977,0,0,1,41.493,20.446l0,0" transform="translate(0 0)" fill="#fff"/>
                    </g>
                </g>
            </svg>
        )
    } else {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="25.558" height="21.816" viewBox="0 0 25.558 21.816">
                <defs>
                    <clipPath id="clip-path">
                        <rect id="Rectangle_409" dataname="Rectangle 409" width="25.558" height="21.816" fill="#fff"/>
                    </clipPath>
                </defs>
                <g id="Group_365" dataname="Group 365" clipPath="url(#clip-path)">
                    <path id="Path_250" dataname="Path 250" d="M23.566,11.613,22.4,12.78,13.776,21.4a1.408,1.408,0,0,1-1.992,0h0l-9.79-9.79a6.8,6.8,0,0,1,0-9.619l0,0A6.8,6.8,0,0,1,10.6,1.159a1.406,1.406,0,0,1,.613,1.034l0,.014a1.41,1.41,0,0,1-.471,1.19L9.45,4.539A5.3,5.3,0,0,0,7.708,9.152l.611,5.1a.892.892,0,0,0,.886.795H9.3a.933.933,0,0,0,.917-.949c0-.01,0-.019,0-.029l-.367-5.04a.98.98,0,0,1,.919-1.038l.059,0a.959.959,0,0,1,.671.279,1.02,1.02,0,0,1,.306.668l.062,5.223a.913.913,0,0,0,.916.887.934.934,0,0,0,.916-.887l.122-5.223a.979.979,0,0,1,.978-.947,1,1,0,0,1,.979,1.019c0,.007,0,.014,0,.021l-.367,5.04a.916.916,0,0,0,.851.976l.066,0a.915.915,0,0,0,.6-.226.824.824,0,0,0,.282-.569l.643-5.1A5.266,5.266,0,0,0,16.109,4.54L14.814,3.4a1.409,1.409,0,0,1-.471-1.188l0-.014a1.414,1.414,0,0,1,.62-1.039,6.8,6.8,0,0,1,8.6,10.458h0" transform="translate(0 0)" fill="#fff"/>
                </g>
            </svg>
        )
    }
};

export const XSLogo = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8.536" viewBox="0 0 10 8.536">
            <defs>
                <clipPath id="clip-path">
                    <rect id="Rectangle_481" dataname="Rectangle 481" width="10" height="8.536"/>
                </clipPath>
            </defs>
            <g id="Group_379" dataname="Group 379" clipPath="url(#clip-path)">
                <path id="Path_265" dataname="Path 265" d="M9.22,4.544,8.764,5,5.39,8.374a.551.551,0,0,1-.779,0h0L.78,4.544A2.661,2.661,0,0,1,.779.78h0A2.661,2.661,0,0,1,4.147.453a.55.55,0,0,1,.24.4V.863a.552.552,0,0,1-.184.465L3.7,1.776a2.073,2.073,0,0,0-.682,1.8l.239,2a.349.349,0,0,0,.347.311h.036A.365.365,0,0,0,4,5.517s0-.007,0-.011L3.853,3.533a.383.383,0,0,1,.36-.406h.023a.375.375,0,0,1,.263.109.4.4,0,0,1,.12.261l.024,2.044A.357.357,0,0,0,5,5.888a.366.366,0,0,0,.358-.347L5.406,3.5a.383.383,0,0,1,.383-.371.391.391,0,0,1,.383.4s0,.005,0,.008L6.028,5.505a.358.358,0,0,0,.333.382h.026A.358.358,0,0,0,6.623,5.8a.322.322,0,0,0,.11-.223l.251-2a2.06,2.06,0,0,0-.682-1.8L5.8,1.329A.551.551,0,0,1,5.612.864V.858A.553.553,0,0,1,5.855.452,2.662,2.662,0,0,1,9.221,4.543h0" transform="translate(0 0)"/>
            </g>
        </svg>
    )
};
