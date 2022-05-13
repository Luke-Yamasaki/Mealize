import { PreviewBox } from "../Styled/PreviewSection"
import { UserIdCard } from "../Cards/UserIdCard";
import { ItemCard } from "../Cards/ItemCard";

export const PreviewSection = ({ type, props }) => {
    console.log(props)
    return (
        <PreviewBox>
            {type === 'id' && <UserIdCard props={props}/>}
            {type === 'item' && <ItemCard props={props}/>}
        </PreviewBox>
    )
};
