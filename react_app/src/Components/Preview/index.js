import { PreviewBox } from "../Styled/PreviewSection"
import { IdCardPreview } from "./IdCard";

export const PreviewSection = ({ type, props }) => {
    return (
        <PreviewBox>
            {type === 'id' && <IdCardPreview props={props}/>}
        </PreviewBox>
    )
};
