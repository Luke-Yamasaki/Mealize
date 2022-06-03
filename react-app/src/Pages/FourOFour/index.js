//Hooks
import { useTheme } from "../../Context/ThemeContext";

//Image
import brockLee from './Brock-Lee.png';

import { FourOFourContainer, FourOFourImage } from "../../Components/Styled/404";

export const FourOFour = () => {
    const { theme } = useTheme();

    return (
        <FourOFourContainer theme={theme}> 404 Not found:
            <FourOFourImage theme={theme} src={brockLee} />
        </FourOFourContainer>
    )
};
