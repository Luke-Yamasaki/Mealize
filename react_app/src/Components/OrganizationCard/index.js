import { useSelector } from 'react-redux';

import styled from 'styled-components';

const Box = styled.div`
    width: 400px;
    height: 150px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background-color: white;
    border: 1px solid rgb(213, 213, 213);
    border-radius: 5px;
    gap: 15px;
    overfrlow: hidden;
`;

const Logo = styled.img`
    width: 150px;
    height: 150px;
    object-fit: contain;
    padding: 1px
    object-position: 50% 50%;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-right: 1px solid grey;
    overflow: hidden;
    background-color: black;
`;

const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 150px;
    height: 150px;
`;

const Name = styled.div`
    width: 200px;
    height: 50px;
    font-family: motiva-sans, sans-serif;
    font-weight: 900;
    font-size: 14px;
    color: black;
    display: flex;
    align-items: center;
    justify-content: left;
`;

const Phone = styled.div`
    width: 200px;
    height: 50px;
    font-family: motiva-sans, sans-serif;
    font-weight: 700;
    font-size: 12px;
    color: black;
    display: flex;
    align-items: center;
    justify-content: left;

`;

const Street = styled.div`
    width: 200px;
    height: 25px;
    font-family: motiva-sans, sans-serif;
    font-weight: 700;
    font-size: 12px;
    color: black;
    display: flex;
    align-items: center;
    justify-content: left;
`

const CityState = styled.div`
    width: 200px;
    height: 25px;
    font-family: motiva-sans, sans-serif;
    font-weight: 700;
    font-size: 12px;
    color: black;
    display: flex;
    align-items: center;
    justify-content: left;
`




export const OrganizationCard = ({organization}) => {
    const name = organization.name;
    const phone = '(' + organization.phone.slice(0, 3) + ') ' + organization.phone.slice(3, 7) + '-' + organization.phone.slice(7, 10) ;
    const address = organization.city + ', ' + organization.state.slice(0, 2).toUpperCase() + ' ' + organization.zip;

    return (
        <Box>
            <Logo src={organization.logoUrl} />
            <InfoBox>
                <Name>{name}</Name>
                <Street>{organization.street}</Street>
                <CityState>{address}</CityState>
                <Phone>{phone}</Phone>
            </InfoBox>
        </Box>
    )
}
