//Hooks
import { useEffect } from 'react';
//Components
import { CustomizationSection } from '../CustomizationSection';
import { SettingsField } from '../../Styled/Layout';

export const CustomizationBox = ({animation}) => {

    return (
        <SettingsField animation={animation}>
            <CustomizationSection animation={animation}/>
        </SettingsField>
    )
};
