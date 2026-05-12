import { PreviewBox } from "../Styled/PreviewSection"
import { UserIdCard } from "../Cards/UserIdCard";
import { PreviewPostCard } from "./PreviewPostCard";

export const PreviewSection = ({ type, props }) => {
    return (
        <PreviewBox>
            {type === 'id' && <UserIdCard props={props}/>}
            {type === 'item' && <PreviewPostCard props={props}/>}
        </PreviewBox>
    )
};
