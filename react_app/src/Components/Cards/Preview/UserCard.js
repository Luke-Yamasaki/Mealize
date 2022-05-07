export const UserCardPreview = ({props}) => {

    return (
        <div className={styles.idCard}>
            <section className={styles.header}>
                <div className={styles.logoBox}>
                    <p className={styles.logoType}>Mealize</p>
                </div>
                <div className={styles.sloganBox}>
                    <p className={styles.slogan}>- Share from your heart -</p>
                </div>
                <div className={styles.iconBox}>
                    <div className={styles.iconBg}>
                        {isNonprofit ? <Nonprofit /> : <Business />}
                    </div>
                </div>
            </section>
            <p style={{width: '415px', padding: '0px', margin: '-10px 0px 0px 10px', fontFamily: 'motiva-sans, sans-serif', fontSize: '12px', fontWeight: '700'}}>{ isManager ? 'Manager Id Card' : 'Volunteer Id Card' }</p>
            <section className={styles.content}>
                <div className={styles.imageBox}>
                    <img src={image ? URL.createObjectURL(image) : 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'} className={styles.image} alt='User profile.'/>
                    <p style={{fontFamily: 'motiva-sans, sans-serif', fontSize: '10px', fontWeight: '700', fontStyle: 'normal', paddingTop: '10px', margin: '0px', height: '15px'}}>Id: 12345 </p>
                    <p style={{fontFamily: 'motiva-sans, sans-serif', fontSize: '10px', fontWeight: '700', fontStyle: 'normal', paddingTop: '5px', paddingBottom: '5px', margin: '0px', height: '15px'}}>Issued: {new Date().toISOString().split('T')[0].slice(0,11)}</p>
                </div>
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
            </section>
        </div>
    )
};
