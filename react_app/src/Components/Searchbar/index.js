import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { MagnifyingGlass } from '../../Assets/Icons/MagnifyingGlass';

import styled from 'styled-components';

export const SearchBar = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 30vw;
    height: 30px;
    background-color: white;
    border-radius: 50px;
    padding-left: 0.15rem;
    gap: 0.1rem;
`;

export const SearchInput = styled.input`
    width: 70%;
    height: 25px;
    font-family: motiva-sans,sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 12px;
    border: none;
    padding: 0px;
    margin: 0px;
`;

export const Searchbar = () => {
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
        <SearchBar onSubmit={handleSubmit}>
            <MagnifyingGlass />
            <SearchInput placeholder='Search' value={searchword} onChange={(e) => setSearchword(e.target.value)}/>
            <input type="submit" style={{display: 'none'}}/>
        </SearchBar>
    )
}
