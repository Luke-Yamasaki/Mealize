import React, { useState, useEffect } from 'react';
// Actions
import { logout } from '../../store/session';
import { postItem, postRequest } from '../../store/posts';
// Components
import { ItemForm } from '../../Forms/Item';
import { RequestForm } from '../../Forms/Request';

export const SessionNavbar = ({ sessionUser }) => {

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
                <SearchBar>
                    <MagnifyingGlass />
                    <SearchInput placeholder='Search...'></SearchInput>
                </SearchBar>
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
