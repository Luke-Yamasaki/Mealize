//Hooks
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTheme } from '../../../Context/ThemeContext';

//Logo
import { Logo } from "../../../Assets/Logo";

//Icons
import { Business } from "../../../Assets/Icons/Business";
import { Nonprofit } from "../../../Assets/Icons/Nonprofit";

//Styled-components
import { LogoBox } from "../../Styled/Navbar";
import { LogoType } from "../../Styled/AuthenticationForm";
import { VectorBox, ImageBox } from '../../Styled/Layout';
import { IdCard, IdHeader, SloganBox, Slogan, IdIconBackGround, IdType, IdContent, IdImageContainer, IdNumber, IssueDate, OrganizationContainer, IdInfoLabel, IdInfoBox, IdInfoText, IdAddressBox, IdUserInfoContainer } from "../../Styled/IdPreview";


export const IdCardPreview = ({ userData }) => {
    const {theme} = useTheme();
    const organizations = useSelector(state => state.organizations);
    const allOrganizations = {...organizations.nonprofits, ...organizations.businesses}

    useEffect(() => {
        console.log('userData changed');
        return () => console.log('Unmounting...')
    },[userData])

    return(
        <IdCard>
            <IdHeader>
                <LogoBox width='100px'>
                    <Logo theme={theme} />
                    <LogoType theme={theme}>Mealize</LogoType>
                </LogoBox>
                <SloganBox>
                    <Slogan>- Share from your heart -</Slogan>
                </SloganBox>
                <VectorBox square='45px'>
                    <IdIconBackGround>
                        {userData.isNonprofit ? <Nonprofit /> : <Business />}
                    </IdIconBackGround>
                </VectorBox>
            </IdHeader>
            <IdType>{userData.isManager ? 'Manager Id Card' : 'Volunteer Id Card' }</IdType>
            <IdContent>
                <IdImageContainer>
                    <ImageBox src={userData.image ? URL.createObjectURL(userData.image) : 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'} alt='User profile.'/>
                    <IdNumber>Id: xxxxx </IdNumber>
                    <IssueDate>Issued: {new Date().toISOString().split('T')[0].slice(0,11)}</IssueDate>
                </IdImageContainer>
                <OrganizationContainer>
                    <IdInfoLabel>Organization info</IdInfoLabel>
                    <IdInfoBox>
                        <IdInfoLabel>Name:</IdInfoLabel>
                        <IdInfoText fontSize='8px'>
                            {userData.organizationId ? allOrganizations[userData.organizationId].name : "Company details."}
                        </IdInfoText>
                    </IdInfoBox>
                    <IdInfoBox>
                        <IdInfoLabel>Email:</IdInfoLabel>
                        <IdInfoText fontSize='8px'>
                            {userData.organizationId ? allOrganizations[userData.organizationId].email : "Company details."}
                        </IdInfoText>
                    </IdInfoBox>
                    <IdInfoBox>
                        <IdInfoLabel>Phone:</IdInfoLabel>
                        <IdInfoText fontSize='8px'>
                            {userData.organizationId ? `(${allOrganizations[userData.organizationId].phone.slice(0, 3)}) - ${allOrganizations[userData.organizationId].phone.slice(3, 6)}-${allOrganizations[userData.organizationId].phone.slice(6, 10)}` : "Company details."}
                        </IdInfoText>
                    </IdInfoBox>
                    <IdAddressBox>
                        <IdInfoLabel>Address:</IdInfoLabel>
                        <IdInfoText>
                            {userData.organizationId ? `${allOrganizations[userData.organizationId].street}` : "Company details."}
                        </IdInfoText>
                        <IdInfoText>
                            {userData.organizationId ? `${allOrganizations[userData.organizationId].city}, ${allOrganizations[userData.organizationId].state[0].toUpperCase()+allOrganizations[userData.organizationId].state[1].toUpperCase()} ${allOrganizations[userData.organizationId].zip}`  : "Company details."}
                        </IdInfoText>
                    </IdAddressBox>
                </OrganizationContainer>
                <IdUserInfoContainer>
                    <IdInfoBox>
                        <IdInfoLabel>Name:</IdInfoLabel>
                        <IdInfoText>{userData.firstName + ' ' + userData.lastName}</IdInfoText>
                    </IdInfoBox>
                    <IdInfoBox>
                        <IdInfoLabel>DOB:</IdInfoLabel>
                        <IdInfoText>{userData.dob}</IdInfoText>
                    </IdInfoBox>
                </IdUserInfoContainer>
            </IdContent>
        </IdCard>
    )
}
