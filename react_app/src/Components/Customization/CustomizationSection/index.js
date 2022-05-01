
//Components
import { Theme } from './Theme';
import { Color } from './Color';
import { Contrast } from './Contrast';
import { Saturation } from './Saturation';
import { BackGround } from './BackGround';

export const CustomizationSection = () => {
    return (
    <div>
        <div>
            <p>Customization tools</p>
        </div>
        <Theme />
        <Color />
        <Contrast />
        <Saturation />
        <BackGround />
    </div>
    )
}
