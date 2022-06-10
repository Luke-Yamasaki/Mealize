export const HomeIcon = ({ theme }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="25.5" height="28" viewBox="0 0 25.5 28">
            <path id="Path_1" dataname="Path 1" d="M4.5,11.75,15.75,3,27,11.75V25.5A2.5,2.5,0,0,1,24.5,28H7a2.5,2.5,0,0,1-2.5-2.5Z" transform="translate(-3 -1.5)" fill="none" stroke={theme === 'light' ? 'white' : '#191919'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
            <path id="Path_2" dataname="Path 2" d="M13.5,30.5V18h8.391V30.5" transform="translate(-4.946 -4)" fill="none" stroke={theme === 'light' ? 'white' : '#191919'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
        </svg>
    )
};
