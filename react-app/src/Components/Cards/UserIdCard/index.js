//Hooks
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
import { VectorBox } from '../../Styled/Layout';
import { IdCard, IdHeader, SloganBox, Slogan, IdIconBackGround, IdType, IdContent, IdImageContainer, IdNumber, IssueDate, OrganizationContainer, IdInfoLabel, IdInfoBox, IdInfoText, IdAddressBox, IdUserInfoContainer, IdImage, EmailBox } from '../../Styled/IdCard';

export const UserIdCard = ({ props }) => {
    const {theme} = useTheme();
    const organizations = useSelector(state => state.organizations);
    const allOrganizations = {...organizations.nonprofits, ...organizations.businesses}
    let organization = allOrganizations[props.organizationId];
    let organizationEmail = organization?.email;
    let splitEmailOne;
    let splitEmailTwo;
    let splitEmailThree = '';

    if(organization?.email.length > 15) {
        splitEmailOne = organization.email.slice(0, 16);
        splitEmailTwo = organization.email.slice(16, 32);
    }

    if(organization?.email.length > 32) {
        splitEmailThree = 'Please call instead.'
    };

    return(
        <IdCard theme={theme}>
            <IdHeader>
                <LogoBox width='100px'>
                    <Logo theme={theme} />
                    <LogoType theme={theme}>Mealize</LogoType>
                </LogoBox>
                <SloganBox>
                    <Slogan theme={theme}>- Share from your heart -</Slogan>
                </SloganBox>
                <VectorBox square='45px'>
                    <IdIconBackGround>
                        {props.isNonprofit ? <Nonprofit /> : <Business />}
                    </IdIconBackGround>
                </VectorBox>
            </IdHeader>
            <IdType theme={theme}>{props.isManager ? 'Manager Id Card' : 'Volunteer Id Card' }</IdType>
            <IdContent>
                <IdImageContainer>
                    <IdImage src={props.image ? URL.createObjectURL(props.image) : 'https://mealize.s3.amazonaws.com/profileicon.png'}/>
                    <IdNumber theme={theme}>Id: xxxxx </IdNumber>
                    <IssueDate theme={theme}>Issued: {new Date().toISOString().split('T')[0].slice(0,11)}</IssueDate>
                </IdImageContainer>
                <OrganizationContainer>
                    <IdInfoLabel theme={theme}>Organization info</IdInfoLabel>
                    <IdInfoBox>
                        <IdInfoLabel theme={theme}>Name:</IdInfoLabel>
                        <IdInfoText fontSize='8px' theme={theme}>
                            {organization ? organization.name : "Company details."}
                        </IdInfoText>
                    </IdInfoBox>
                    <IdInfoBox>
                        <IdInfoLabel theme={theme}>Email:</IdInfoLabel>

                            {organization?.email.length > 32 ?
                            <IdInfoText fontSize='8px' theme={theme}>
                                {splitEmailThree}
                            </IdInfoText>
                            : organization?.email.length > 16 ?
                            <EmailBox>
                                <IdInfoText fontSize='8px' theme={theme}>
                                    {splitEmailOne}
                                </IdInfoText>
                                <IdInfoText fontSize='8px' theme={theme}>
                                    {splitEmailTwo}
                                </IdInfoText>
                            </EmailBox>
                            : organization?.email.length < 16 ?
                            <IdInfoText fontSize='8px' theme={theme}>
                                {splitEmailOne}
                            </IdInfoText>
                           :
                            <IdInfoText fontSize='8px' theme={theme}>
                                Company details.
                            </IdInfoText>
                            }

                    </IdInfoBox>
                    <IdInfoBox>
                        <IdInfoLabel theme={theme}>Phone:</IdInfoLabel>
                        <IdInfoText fontSize='8px' theme={theme}>
                            {organization ? `(${organization.phone.slice(0, 3)}) - ${organization.phone.slice(3, 6)}-${organization.phone.slice(6, 10)}` : "Company details."}
                        </IdInfoText>
                    </IdInfoBox>
                    <IdAddressBox>
                        <IdInfoLabel theme={theme}>Address:</IdInfoLabel>
                        <IdInfoText theme={theme}>
                            {organization ? `${organization.street}` : "Company details."}
                        </IdInfoText>
                        <IdInfoText theme={theme}>
                            {organization ? `${organization.city}, ${organization.state[0].toUpperCase() + organization.state[1].toUpperCase()} ${organization.zip}`  : "Company details."}
                        </IdInfoText>
                    </IdAddressBox>
                </OrganizationContainer>
                <IdUserInfoContainer>
                    <IdInfoBox>
                        <IdInfoLabel theme={theme}>Name:</IdInfoLabel>
                        <IdInfoText theme={theme}>{props.firstName && props.lastName ? props.firstName + ' ' + props.lastName : 'Your name'}</IdInfoText>
                    </IdInfoBox>
                    <IdInfoBox>
                        <IdInfoLabel theme={theme}>DOB:</IdInfoLabel>
                        <IdInfoText theme={theme}>{props.dob ? props.dob : 'Your DOB'}</IdInfoText>
                    </IdInfoBox>
                </IdUserInfoContainer>
            </IdContent>
        </IdCard>
    )
};
