import React,{ useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MagnifyingGlass } from '../../../Assets/Icons/MagnifyingGlass';
import { Searchbar, SearchInput } from '../../Styled/Navbar';

export const SearchBar = () => {
    const [searchword, setSearchword] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(searchword) {
            history.push(`/search/${searchword}`);
        } else {
            alert('Please enter a search word.')
        }
    }

    return (
        <Searchbar onSubmit={handleSubmit}>
            <MagnifyingGlass />
            <SearchInput placeholder='Search' value={searchword} onChange={(e) => setSearchword(e.target.value)}/>
            <input type="submit" style={{display: 'none'}}/>
        </Searchbar>
    )
}
