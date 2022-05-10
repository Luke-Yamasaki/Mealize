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
import { ResetSearchBox, ResetIcon, SearchSubmitIn, ResetIconput } from '../../Styled/Buttons';
import { VectorBox } from '../../Styled/Layout';

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

    return (
        <>
            {!browserSupportsSpeechRecognition ?
                <Searchbar theme={theme} onSubmit={handleSubmit}>
                    <VectorBox square='20px'>
                        <MagnifyingGlass theme={theme}/>
                    </VectorBox>
                    <SearchInput theme={theme} type='text' placeholder="Search" value={searchword} onChange={(e) => setSearchword(e.target.value)}/>
                    <SearchSubmitInput type="submit" style={{display: 'none'}}/>
                    <ResetSearchBox entering={searchword.length > 0}>
                        <ResetIcon theme={theme} onClick={() => setSearchword('')}>&#10006;</ResetIcon>
                    </ResetSearchBox>
                </Searchbar>
            :
            isText ?
                <Searchbar theme={theme} onSubmit={handleSubmit}>
                    <VectorBox square='20px'>
                        <MagnifyingGlass theme={theme}/>
                    </VectorBox>
                    <SearchInput theme={theme} type='text' placeholder="Search" value={searchword} onChange={(e) => setSearchword(e.target.value)}/>
                    <SearchSubmitInput type="submit" style={{display: 'none'}}/>
                    <ResetSearchBox entering={searchword.length > 0}>
                        <ResetIcon theme={theme} onClick={() => setSearchword('')}>&#10006;</ResetIcon>
                    </ResetSearchBox>
                    <VectorBox square='15px' onClick={switchInput}>
                        <MicrophoneIcon theme={theme}/>
                    </VectorBox>
                </Searchbar>
            :
                <Searchbar theme={theme} onSubmit={handleSubmit}>
                    <VectorBox>
                        <MagnifyingGlass theme={theme}/>
                    </VectorBox>
                    <SearchInput theme={theme} type='text' placeholder='Start and stop speech by clicking the microphone icon.' value={transcript} onChange={(e) => setSearchword(e.target.value)} theme={theme} />
                    <VectorBox square='15px' onClick={listening ? SpeechRecognition.stopListening : SpeechRecognition.startListening}>
                        <MicrophoneIcon theme={theme}/>
                    </VectorBox>
                    <SearchSubmitInput type="submit" style={{display: 'none'}}/>
                    <ResetSearchBox entering={searchword.length > 0}>
                        <ResetIcon theme={theme} onClick={() => resetTranscript}>&#10006;</ResetIcon>
                    </ResetSearchBox>
                    <VectorBox square='25px' onClick={switchInput}>
                        <KeyboardIcon theme={theme}/>
                    </VectorBox>
                </Searchbar>
            }
        </>
    )
};
