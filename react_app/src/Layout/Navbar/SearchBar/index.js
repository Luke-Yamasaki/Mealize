//Hooks
import React,{ useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTheme } from '../../../Context/ThemeContext';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

//Components
import { MagnifyingGlass } from '../../../Assets/Icons/MagnifyingGlass';
import { MicrophoneIcon } from '../../../Assets/Icons/Microphone';
import { KeyboardIcon } from '../../../Assets/Icons/Keyboard';
import { Searchbar, SearchInput } from '../../Styled/Navbar';
import { MagnifyingContainer, MicContainer, KeyboardContainer } from '../../Styled/Navbar';

export const SearchBar = () => {
    const [searchword, setSearchword] = useState('');
    const [isText, setIsText] = useState(true);
    const {theme} = useTheme();
    const history = useHistory();
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(searchword) {
            history.push(`/search/${searchword}`);
        } else {
            alert('Please enter a search word.')
        }
    };

    const switchInput = (e) => {
        e.preventDefault();
        setIsText(!isText);
    }
    //test

    return (
        <>
            {!browserSupportsSpeechRecognition ?
                <Searchbar onSubmit={handleSubmit}>
                    <MagnifyingContainer>
                        <MagnifyingGlass theme={theme}/>
                    </MagnifyingContainer>
                    <SearchInput type='text' placeholder="Search" value={searchword} onChange={(e) => setSearchword(e.target.value)} theme={theme} />
                    <input type="submit" style={{display: 'none'}}/>
                    <button onClick={() => setSearchword('')}>Reset</button>
                </Searchbar>
            :
            isText ?
                <Searchbar onSubmit={handleSubmit}>
                    <MagnifyingContainer>
                        <MagnifyingGlass theme={theme}/>
                    </MagnifyingContainer>
                    <SearchInput type='text' placeholder="Search" value={searchword} onChange={(e) => setSearchword(e.target.value)} theme={theme} />
                    <input type="submit" style={{display: 'none'}}/>
                    <MicContainer onClick={switchInput}>
                        <MicrophoneIcon theme={theme}/>
                    </MicContainer>
                    <button onClick={() => setSearchword('')}>Reset</button>
                </Searchbar>
            :
                <Searchbar onSubmit={handleSubmit}>
                    <MagnifyingContainer>
                        <MagnifyingGlass theme={theme}/>
                    </MagnifyingContainer>
                    <SearchInput type='text' placeholder='Start and stop speech by clicking the microphone icon.' value={transcript} onChange={(e) => setSearchword(e.target.value)} theme={theme} />
                    <MicContainer onClick={listening ? SpeechRecognition.stopListening : SpeechRecognition.startListening}>
                        <MicrophoneIcon theme={theme}/>
                    </MicContainer>
                    <KeyboardContainer onClick={switchInput}>
                        <KeyboardIcon theme={theme}/>
                    </KeyboardContainer>
                    <input type="submit" style={{display: 'none'}}/>
                    <button onClick={resetTranscript}>Reset</button>
                </Searchbar>
            }
        </>
    )
};
