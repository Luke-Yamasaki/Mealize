//Logo
import { Logo } from "../../../Assets/Logo";

//Icons
import { Business } from "../../../Assets/Icons/Business";
import { Nonprofit } from "../../../Assets/Icons/Nonprofit";

//Styled-components
import { LogoBox } from "../../Styled/Navbar";
import { LogoType } from "../../Styled/AuthenticationForm";
import { VectorBox, ImageBox } from '../../Styled/Layout';
import { IdCard, IdHeader, SloganBox, Slogan, IdIconBackGround, IdType, IdContent, IdImageContainer, IdNumber, IssueDate } from "../../Styled/IdPreview";


export const IdCardPreview = () => {
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
                        {isNonprofit ? <Nonprofit /> : <Business />}
                    </IdIconBackGround>
                </VectorBox>
            </IdHeader>
            <IdType>{ isManager ? 'Manager Id Card' : 'Volunteer Id Card' }</IdType>
            <IdContent>
                <IdImageContainer>
                    <ImageBox src={image ? URL.createObjectURL(image) : 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'} alt='User profile.'/>
                    <IdNumber>Id: xxxxx </IdNumber>
                    <IssueDate>Issued: {new Date().toISOString().split('T')[0].slice(0,11)}</IssueDate>
                </IdImageContainer>
                <div className={styles.userInfoBox}>
                    <div className={styles.labelText}>
                        <div className={styles.labels}>Name:</div>
                        <div className={styles.subText}>{firstName + ' ' + lastName}</div>
                    </div>
                    <div className={styles.labelText}>
                        <div className={styles.labels}>DOB:</div>
                        <div className={styles.subText}>{dob}</div>
                    </div>
                    <div className={styles.descriptionText}>
                        <div className={styles.labels}>Job description:</div>
                        <div className={styles.subText}>{ jobDescription.length >= 25 && !jobDescription.includes(' ') ? 'Please add a line break.' : jobDescription.slice(0, 1).toUpperCase().concat(jobDescription.slice(1, jobDescription.length))}</div>
                    </div>
                </div>
                <div className={styles.jobInfoBox}>
                    <div className={styles.labels}>Organization info</div>
                    <div className={styles.labelText}>
                        <div style={{fontSize: '10px'}} className={styles.labels}>Name:</div>
                        <div style={{fontSize: '8px'}} className={styles.subText}>{organizationId ? allOrganizations[organizationId].name : "Company details."}</div>
                    </div>
                    <div className={styles.labelText}>
                        <div className={styles.labels}>Email:</div>
                        <div style={{fontSize: '8px'}} className={styles.subText}>{organizationId ? allOrganizations[organizationId].email : "Company details."}</div>
                    </div>
                    <div className={styles.labelText}>
                        <div className={styles.labels}>Phone:</div>
                        <div style={{fontSize: '8px'}} className={styles.subText}>{organizationId ? `(${allOrganizations[organizationId].phone.slice(0, 3)}) - ${allOrganizations[organizationId].phone.slice(3, 6)}-${allOrganizations[organizationId].phone.slice(6, 10)}` : "Company details."} </div>
                    </div>
                    <div className={styles.descriptionText}>
                        <div className={styles.labels}>Address:</div>
                        <div className={styles.subText}>{organizationId ? `${allOrganizations[organizationId].street}` : "Company details."}</div>
                        <div style={{marginTop: '-10px'}} className={styles.subText}>{organizationId ? `${allOrganizations[organizationId].city}, ${allOrganizations[organizationId].state[0].toUpperCase()+allOrganizations[organizationId].state[1].toUpperCase()} ${allOrganizations[organizationId].zip}`  : "Company details."}</div>
                    </div>
                </div>
            </IdContent>
        </IdCard>
    )
}
