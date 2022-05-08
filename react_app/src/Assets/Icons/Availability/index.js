export const AvailabileIcon = ({theme}) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
            <g id="Group_1068" dataname="Group 1068" transform="translate(-5503 14947)">
                <rect id="Rectangle_1011" dataname="Rectangle 1011" width="30" height="30" rx="5" transform="translate(5503 -14947)" fill={theme === 'light' ? "#a4dba3" : '#4CB849'}/>
                <path id="Path_18237" dataname="Path 18237" d="M6100.412-14716l6.536,6.536,11.044-11.045" transform="translate(-590.912 -216.991)" fill="none" stroke={theme === 'light' ? "#191919" : 'white'} strokeWidth="3"/>
            </g>
        </svg>
    )
};

export const UnavailabileIcon = ({theme}) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
            <g id="Group_1067" dataname="Group 1067" transform="translate(-5461 14947)">
                <rect id="Rectangle_1010" dataname="Rectangle 1010" width="30" height="30" rx="5" transform="translate(5461 -14947)" fill={theme === 'light' ? "#e0a193" : '#C2462A'}/>
                <g id="Group_1064" dataname="Group 1064" transform="translate(-499 -160)">
                    <g id="Group_1061" dataname="Group 1061" transform="translate(-89.37 -58.043)">
                        <path id="Path_18233" dataname="Path 18233" d="M6058.37-14719.957l11.763,11.764" fill="none" stroke={theme === 'light' ? "#191919" : 'white'} strokeWidth="3"/>
                        <path id="Path_18234" dataname="Path 18234" d="M6058.37-14719.957l11.763,11.764" transform="translate(-8649.823 -20778.326) rotate(90)" fill="none" stroke={theme === 'light' ? "#191919" : 'white'} strokeWidth="3"/>
                    </g>
                </g>
            </g>
        </svg>
    )
};
