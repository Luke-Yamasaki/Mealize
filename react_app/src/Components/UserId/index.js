// packages
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// css
import styles from './UserId.module.css';

// icons
import { Business } from '../../Assets/Icons/Business';
import { Nonprofit } from '../../Assets/Icons/Nonprofit';
import { Volunteer } from '../../Assets/Icons/Volunteers';

// helpers



export const UserId = ({ user }) => {
    const sessionUser = useSelector(state => state.session.user);
    const [isManager, setIsManager] = useState(false)

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
                <div className={styles.icon}>
                    {user.isNonprofit ? <Nonprofit /> : <Business />}
                </div>
            </section>
            <section className={styles.content}>
                <div className={styles.imageBox}>
                    <img src={user.profileImageUrl} className={styles.image} alt='User profile.'/>
                    <p className={styles.subText}>Id: {user.id}</p>
                    <p className={styles.subText}>Issued: {user.createdAt}</p>
                </div>
                <div className={styles.infoBox}>
                    <div className={styles.labels}>
                        Name:
                        <p className={styles.subText}>{user.firstName + ' ' + user.lastName}</p>
                    </div>
                    <div className={styles.labels}>
                        DOB:
                        <p className={styles.subText}>{user.firstName + ' ' + user.lastName}</p>
                    </div>
                    {!user.private && (
                        <>
                            <div className={styles.labels}>
                                Email:
                                <p className={styles.subText}>{user.email}</p>
                            </div>
                            <div className={styles.labels}>
                                Phone:
                                <p className={styles.subText}>{`(${user.phone.slice(0, 3)}) - ${user.phone.slice(3, 6)}-${user.phone.slice(6, 10)}`} </p>
                            </div>
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
                <div>

                </div>

            </section>
        </div>
    )
}
