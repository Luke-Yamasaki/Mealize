// packages
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// css
import styles from './UserIdCard.module.css';

// icons
import { Business } from '../../Assets/Icons/Business';
import { Nonprofit } from '../../Assets/Icons/Nonprofit';
import { Volunteer } from '../../Assets/Icons/Volunteers';

// helpers



export const UserIdCard = ({ user }) => {
    const sessionUser = useSelector(state => state.session.user);
    const [isManager, setIsManager] = useState(false);
    const organizations = useSelector(state => state.organization);
    const organization = sessionUser.isNonprofit ? organizations.nonprofits[sessionUser.organizationId] : organizations.businesses[sessionUser.organizationId];

    return (
        <div className={styles.idCard}>
            <section className={styles.header}>
                <div className={styles.logoBox}>
                    <p className={styles.logoType}>Mealize</p>
                    <p className={styles.subText}>{ user.isManager ? 'Manager Id Card' : 'Volunteer Id Card' }</p>
                </div>
                <div className={styles.sloganBox}>
                    <p className={styles.slogan}></p>
                </div>
                <div className={styles.iconBox}>
                    <div className={styles.iconBg}>
                        {user.isNonprofit ? <Nonprofit /> : <Business />}
                    </div>
                </div>
            </section>
            <section className={styles.content}>
                <div className={styles.imageBox}>
                    <img src={user.profileImageUrl} className={styles.image} alt='User profile.'/>
                    <p className={styles.subText}>Id: {user.id}</p>
                    <p className={styles.subText}>Issued: {user.createdAt}</p>
                </div>
                <div className={styles.userInfoBox}>
                    <div className={styles.labels}>
                        Name:
                        <p className={styles.subText}>{user.firstName + ' ' + user.lastName}</p>
                    </div>
                    <div className={styles.labels}>
                        DOB:
                        <p className={styles.subText}>{user.firstName + ' ' + user.lastName}</p>
                    </div>
                    <div className={styles.labels}>
                        Job description:
                        <p className={styles.subText}>{user.jobDescription}</p>
                    </div>
                    {!user.private && (
                        <>
                            {user.deaf && (
                                <div className={styles.labels}>
                                    Deaf:
                                    <p className={styles.subText}>This member is deaf.</p>
                                </div>
                            )
                            }
                            {user.wheelchair && (
                                <div className={styles.labels}>
                                    Wheelchair:
                                    <p className={styles.subText}>This member uses a wheelchair.</p>
                                </div>
                            )
                            }
                            {user.learningDisabled && (
                                <div className={styles.labels}>
                                    Learning disabled:
                                    <p className={styles.subText}>This member has learning disabilities.</p>
                                </div>
                            )
                            }
                            {user.lgbtq && (
                                <div className={styles.labels}>
                                    <p className={styles.subText}>This member belongs to the LGBTQIA+ community.</p>
                                </div>
                            )
                            }
                        </>
                    )}
                </div>
                <div className={styles.jobInfoBox}>
                    <div className={styles.labels}>
                        Organization name:
                        <p className={styles.subText}>{organization.name}</p>
                    </div>
                    <div className={styles.labels}>
                        Email:
                        <p className={styles.subText}>{organization.email}</p>
                    </div>
                    <div className={styles.labels}>
                        Phone:
                        <p className={styles.subText}>{`(${organization.phone.slice(0, 3)}) - ${user.phone.slice(3, 6)}-${user.phone.slice(6, 10)}`} </p>
                    </div>
                    <div className={styles.labels}>
                        Address:
                        <div className={styles.addressBox}>
                            <p className={styles.subText}>{organization.street},</p>
                            <p className={styles.subText}>{`${organization.city}, ${organization.state[0].toUpperCase()+organization.state[1].toUpperCase()} ${organization.zip}`}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
