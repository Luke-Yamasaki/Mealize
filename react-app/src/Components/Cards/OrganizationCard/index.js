//Hooks
import { useHistory } from 'react-router-dom';
import { useTheme } from '../../../Context/ThemeContext';
//Packages
import styled from 'styled-components';

const Box = styled.div`
    width: ${props => props.preview === 'true' ? '350px' : '400px'};
    height: 150px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background-color: ${props => props.theme === 'light' ? 'white' : '#191919'};
    border: ${props => props.theme === 'light' ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.2)'};
    border-radius: 5px;
    gap: 15px;
    cursor: pointer;

`;

const Logo = styled.img`
    width: 150px;
    height: 150px;
    object-fit: contain;
    padding: 1px
    object-position: 50% 50%;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-right: ${props => props.theme === 'light' ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.2)'};
    background-color: black;
`;

const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 150px;
    height: 150px;
    color: ${props => props.theme === 'light' ? '#191919' : 'white'};
    font-weight: ${props => props.theme === 'light' ? '700' : '400'};
    font-family: motiva-sans, sans-serif;
`;

const Name = styled.div`
    width: 200px;
    height: 50px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: left;
`;

const Phone = styled.div`
    width: 200px;
    height: 50px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: left;

`;

const Street = styled.div`
    width: 200px;
    height: 25px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: left;
`

const CityState = styled.div`
    width: 200px;
    height: 25px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: left;
`

export const OrganizationCard = ({organization,  preview}) => {
    const history = useHistory();
    const { theme } = useTheme();
    const name = organization ? organization.name : '';
    const phone = '(' + organization.phone.slice(0, 3) + ') ' + organization.phone.slice(3, 7) + '-' + organization.phone.slice(7, 10) ;
    const address = organization.city + ', ' + organization.state.slice(0, 2).toUpperCase() + ' ' + organization.zip;


    const handleClick = (e) => {
        e.preventDefault();
        return history.push(`/organizations/${organization.id}`)
    }

    const handleNull = (e) => {
        e.preventDefault();
        return null;
    }

    return (
        <Box onClick={preview === 'true' ? handleNull : handleClick} theme={theme} preview={preview ? 'true' : 'false'}>
            <Logo src={organization.logoUrl} />
            <InfoBox theme={theme}>
                <Name>{name}</Name>
                <Street>{organization.street}</Street>
                <CityState>{address}</CityState>
                <Phone>{phone}</Phone>
            </InfoBox>
        </Box>
    )
}
