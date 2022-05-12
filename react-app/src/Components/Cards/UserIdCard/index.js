//Hooks
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTheme } from '../../../Context/ThemeContext';

//Logo
import { Logo } from "../../../Assets/Logo";

//Icons
import { Business } from "../../../Assets/Icons/Business";
import { Nonprofit } from "../../../Assets/Icons/Nonprofit";
import placeholder from './user-placeholder.svg';

//Styled-components
import { LogoBox } from "../../Styled/Navbar";
import { LogoType } from "../../Styled/AuthenticationForm";
import { VectorBox } from '../../Styled/Layout';
import { IdCard, IdHeader, SloganBox, Slogan, IdIconBackGround, IdType, IdContent, IdImageContainer, IdNumber, IssueDate, OrganizationContainer, IdInfoLabel, IdInfoBox, IdInfoText, IdAddressBox, IdUserInfoContainer, IdImageBox } from '../../Styled/IdCard';

export const UserIdCard = ({ props }) => {
    console.log(props)
    const {theme} = useTheme();
    console.log(theme)
    const organizations = useSelector(state => state.organizations);
    const allOrganizations = {...organizations.nonprofits, ...organizations.businesses}
    let organization = allOrganizations[props.organizationId];

    useEffect(() => {
        console.log(props);
        return () => console.log('changing')
    },[props])

    return(
        <IdCard theme={theme}>
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
                        {props.isNonprofit ? <Nonprofit /> : <Business />}
                    </IdIconBackGround>
                </VectorBox>
            </IdHeader>
            <IdType>{props.isManager ? 'Manager Id Card' : 'Volunteer Id Card' }</IdType>
            <IdContent>
                <IdImageContainer>
                    <IdImageBox src={props.image ? URL.createObjectURL(props.image) : placeholder } alt='User profile.'/>
                    <IdNumber>Id: xxxxx </IdNumber>
                    <IssueDate>Issued: {new Date().toISOString().split('T')[0].slice(0,11)}</IssueDate>
                </IdImageContainer>
                <OrganizationContainer>
                    <IdInfoLabel>Organization info</IdInfoLabel>
                    <IdInfoBox>
                        <IdInfoLabel>Name:</IdInfoLabel>
                        <IdInfoText fontSize='8px'>
                            {organization ? organization.name : "Company details."}
                        </IdInfoText>
                    </IdInfoBox>
                    <IdInfoBox>
                        <IdInfoLabel>Email:</IdInfoLabel>
                        <IdInfoText fontSize='8px'>
                            {organization ? organization.email : "Company details."}
                        </IdInfoText>
                    </IdInfoBox>
                    <IdInfoBox>
                        <IdInfoLabel>Phone:</IdInfoLabel>
                        <IdInfoText fontSize='8px'>
                            {organization ? `(${organization.phone.slice(0, 3)}) - ${organization.phone.slice(3, 6)}-${organization.phone.slice(6, 10)}` : "Company details."}
                        </IdInfoText>
                    </IdInfoBox>
                    <IdAddressBox>
                        <IdInfoLabel>Address:</IdInfoLabel>
                        <IdInfoText>
                            {organization ? `organization.street}` : "Company details."}
                        </IdInfoText>
                        <IdInfoText>
                            {organization ? `${organization.city}, ${organization.state[0].toUpperCase() + organization.state[1].toUpperCase()} ${organization.zip}`  : "Company details."}
                        </IdInfoText>
                    </IdAddressBox>
                </OrganizationContainer>
                <IdUserInfoContainer>
                    <IdInfoBox>
                        <IdInfoLabel>Name:</IdInfoLabel>
                        <IdInfoText>{props.firstName && props.lastName ? props.firstName + ' ' + props.lastName : 'Your name'}</IdInfoText>
                    </IdInfoBox>
                    <IdInfoBox>
                        <IdInfoLabel>DOB:</IdInfoLabel>
                        <IdInfoText>{props.dob ? props.dob : 'Your DOB'}</IdInfoText>
                    </IdInfoBox>
                </IdUserInfoContainer>
            </IdContent>
        </IdCard>
    )
};
