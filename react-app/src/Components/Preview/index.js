import { PreviewBox } from "../Styled/PreviewSection"
import { UserIdCard } from "../Cards/UserIdCard";
import { PreviewItemCard } from "./ItemCard";

export const PreviewSection = ({ type, props }) => {
    console.log(props)
    return (
        <PreviewBox>
            {type === 'id' && <UserIdCard props={props}/>}
            {type === 'item' && <PreviewItemCard props={props}/>}
        </PreviewBox>
    )
};
