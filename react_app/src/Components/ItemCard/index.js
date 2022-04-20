import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removePost, updateItem } from '../../store/posts';
import styles from './ItemCard.module.css';

export const ItemCard = ({ post }) => {
    const dispatch = useDispatch();

    const handleDelete = async (e) => {
        e.preventDefault();


    }
    return (
        <div className={styles.card}>
            <img src={post.imageUrl} className={styles.image} alt='Item image' />
            <div>
                <div>
                    <div>
                       <img></img>
                       <p></p>
                    </div>
                    <h3></h3>
                    <img></img>
                </div>
                <div>
                    <div>

                    </div>
                </div>
            </div>
        </div>

    )
}
