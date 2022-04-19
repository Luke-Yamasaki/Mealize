import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './SessionNavbar.module.css';

// Actions
import { logout } from '../../store/session';
import { setCurrentModal, showModal } from '../../store/modal';
// Components
import { Nav, NavList } from '../Styled/Navbar';
import { Logo } from '../Logo';
import { Searchbar } from '../Searchbar';
import ItemForm from '../../Forms/Item';
import { RequestForm } from '../../Forms/Request';

export const SessionNavbar = ({ sessionUser }) => {
    const dispatch = useDispatch();

    const showItemForm = () => {
        dispatch(setCurrentModal(ItemForm));
        dispatch(showModal());
    };

    const logOut = () => {
        dispatch(logout())
    }

    return (
        <Nav>
            <NavList>
                <Logo dimension={"medium"} />
                <NavLink to="/" exact={true} className={styles.link}>Mealize</NavLink>
                <Searchbar />
                <div role='button' className={styles.signup}>User</div>
                <div role='button' className={styles.signup}>Inbox</div>
                <div role='button' className={styles.signup}>Notifications</div>
                {sessionUser.isNonprofit ?
                <div role='button' className={styles.signup} onClick={showItemForm}>New request</div>
                :
                <div role='button' className={styles.signup} onClick={showItemForm}>Post item</div>
                }
                <div role='button' className={styles.signup} onClick={logOut}>Log out</div>
            </NavList>
        </Nav>
    )
}
