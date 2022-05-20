//Hooks
import React,{ useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTheme } from '../../../Context/ThemeContext';

//Components
import { MagnifyingGlass } from '../../../Assets/Icons/MagnifyingGlass';
import { Searchbar, SearchInput, SearchSubmitInput, ResetSearchBox, GradientLogoType} from '../../Styled/Navbar';
import { ResetIcon } from '../../Styled/Buttons';
import { VectorBox } from '../../Styled/Layout';

export const SearchBar = () => {
    const [searchword, setSearchword] = useState('');
    const {theme} = useTheme();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

       if(searchword) {
            history.push(`/search/${searchword}`);
        } else {
            alert('Please enter a search word.')
        }
    };

    return (
        <Searchbar theme={theme} onSubmit={handleSubmit}>
            <VectorBox square='20px'>
                <MagnifyingGlass theme={theme}/>
            </VectorBox>
            <SearchInput theme={theme} type='text' placeholder="Search" value={searchword} onChange={(e) => setSearchword(e.target.value)}/>
            <GradientLogoType entering={searchword.length > 0}>Mealize</GradientLogoType>
            <SearchSubmitInput type="submit" style={{display: 'none'}}/>
            <ResetSearchBox entering={searchword.length > 0}>
                <ResetIcon theme={theme} onClick={() => setSearchword('')}>&#10006;</ResetIcon>
            </ResetSearchBox>
        </Searchbar>
    )
};
