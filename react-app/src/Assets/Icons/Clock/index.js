export const ClockIcon = ({theme}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
            <g id="Group_1" dataname="Group 1" transform="translate(-525 -260)">
                <g id="Ellipse_1" dataname="Ellipse 1" transform="translate(525 260)" fill="none" stroke={theme === 'light' ? '#191919' : 'white'} strokeWidth="3">
                <circle cx="15" cy="15" r="15" stroke="none"/>
                <circle cx="15" cy="15" r="13.5" fill="none"/>
                </g>
                <path id="Path_1" dataname="Path 1" d="M540,266.782v9.166h4.712" transform="translate(0 1.052)" fill="none" stroke={theme === 'light' ? '#191919' : 'white'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
            </g>
        </svg>
    )
};
