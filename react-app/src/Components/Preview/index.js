import { PreviewBox } from "../Styled/PreviewSection"
import { UserIdCard } from "../Cards/UserIdCard";

export const PreviewSection = ({ type, props }) => {
    return (
        <PreviewBox>
            {type === 'id' && <UserIdCard props={props}/>}
        </PreviewBox>
    )
};
