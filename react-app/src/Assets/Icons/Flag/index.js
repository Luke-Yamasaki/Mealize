export const Flag = ({flagColor}) => {

    //When you export SVG from Adobe, change sword case to camelCase. Also, if ID names include '-' or ':' or special characters, change them to camelCase or single words.
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="20" height="25" viewBox="0 0 20 25">
            <defs>
                <linearGradient id="linearGradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                    <stop offset="0" stopColor={flagColor === 'green' ? "#46a843" : flagColor === 'yellow' ? "#d49524" : "#c2462a"}/>
                    <stop offset="1" stopColor={flagColor === 'green' ? "#a4dba3" : flagColor === 'yellow' ? "#e9c990" : "#e0a193"}/>
                </linearGradient>
            </defs>
            <g id="Group_1306" dataname="Group 1306" transform="translate(-506.106 -111)">
            <rect id="Rectangle_997" dataname="Rectangle 997" width="3.275" height="25" transform="translate(506.106 111)" fill="url(#linearGradient)"/>
            <rect id="Rectangle_998" dataname="Rectangle 998" width="20" height="12.554" transform="translate(506.106 111)" fill="url(#linearGradient)"/>
            </g>
        </svg>
    )
};
