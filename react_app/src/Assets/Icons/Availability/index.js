export const AvailabileIcon = ({theme}) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
            <g id="Group_1063" data-name="Group 1063" transform="translate(-6002 14787)">
                <circle id="Ellipse_29" data-name="Ellipse 29" cx="15" cy="15" r="15" transform="translate(6002 -14787)" fill={theme === 'light' ? "#a4dba3" : '#4CB849'}/>
                <path id="Path_18237" data-name="Path 18237" d="M6100.412-14716l6.536,6.536,11.044-11.045" transform="translate(-91.912 -56.991)" fill="none" stroke={theme === 'light' ? "#191919" : 'white'} stroke-width="3"/>
            </g>
        </svg>
    )
};

export const UnavailabileIcon = ({theme}) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
            <g id="Group_1062" data-name="Group 1062" transform="translate(-5960 14787)">
                <circle id="Ellipse_30" data-name="Ellipse 30" cx="15" cy="15" r="15" transform="translate(5960 -14787)" fill={theme === 'light' ? "#e0a193" : '#C2462A'}/>
                <g id="Group_1061" data-name="Group 1061" transform="translate(-89.37 -58.043)">
                <path id="Path_18233" data-name="Path 18233" d="M6058.37-14719.957l11.763,11.764" fill="none" stroke="#191919" stroke-width="3"/>
                <path id="Path_18234" data-name="Path 18234" d="M6058.37-14719.957l11.763,11.764" transform="translate(-8649.823 -20778.326) rotate(90)" fill="none" stroke={theme === 'light' ? "191919" : 'white'} strokeWidth="3"/>
                </g>
            </g>
        </svg>
    )
}
