import React,{ useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MagnifyingGlass } from '../../Assets/Icons/MagnifyingGlass';

import styled from 'styled-components';

export const SearchBar = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    max-width: 27.5vw;
    width:  27.5vw;
    min-width:  30vw;
    height: 30px;
    background-color: white;
    border-radius: 50px;
    padding-left: 0.5rem;
    gap: 0.1rem;
`;

export const SearchInput = styled.input`
    width: 27.5vw;
    height: 25px;
    font-family: motiva-sans,sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 12px;
    border: none;
    padding: 0px;
    margin: 0px;
    outline: none;
    font-size: 14px;
    text-align: center;dsad
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
