import React, {useState, useTransition} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removePost, updateItem } from '../../store/posts';

//components
import { Triangle } from '../../Assets/Icons/Triangle';
import { FavoritesIcon } from '../../Assets/Logo/FavoritesIcon/index';
import { DairyIcon } from '../../Assets/Icons/FoodGroups/Dairy';
import { VegetablesIcon } from '../../Assets/Icons/FoodGroups/Vegetables';
import { FruitsIcon } from '../../Assets/Icons/FoodGroups/Fruits';
import { GrainsIcon } from '../../Assets/Icons/FoodGroups/Grains';
import { ProteinIcon } from '../../Assets/Icons/FoodGroups/Protein';

import styles from './ItemCard.module.css';
import styled from 'styled-components';

const UserTitle = styled.div`
    width: 220px;
    height: 65px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

const UserImage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-between;
    height: 65px;
    width: 45px;
`;

const TitleBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: center;
    height: 65px;
    width: 150px;
`;

const CategoryBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: center;
    height: 65px;
    width: 125px;
`;

export const ItemCard = ({ post }) => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const user = users[post.userId];
    const category = post.category.category;

    const handleDelete = async (e) => {
        e.preventDefault();
    };

    return (
        <div className={styles.card}>
            <div style={{backgroundImage: `url(${post.imageUrl})`}} className={styles.image}>
                <FavoritesIcon postId={post.id} />
                <Triangle status={post.status} />
            </div>
            <UserTitle>
                <UserImage>
                    <div style={{backgroundImage: `url(${user.profileImageUrl})`}} className={styles.profile} />
                    <p><strong>{user.firstName}</strong></p>
                </UserImage>
                <TitleBox>
                    <h3>{ post.title }</h3>
                    <p>{ user.organization.name }</p>
                </TitleBox>
                <CategoryBox>
                    { category === 'Dairy'
                    ? <><DairyIcon /><p>{category}</p></>
                    : category === 'Vegetables'
                    ? <><VegetablesIcon /><p>{category}</p></>
                    : category === 'Fruits'
                    ? <><FruitsIcon /><p>{category}</p></>
                    : category === 'Grains'
                    ? <><GrainsIcon /><p>{category}</p></>
                    : <><ProteinIcon /><p>{category}</p></>
                    }
                </CategoryBox>
            </UserTitle>
                <div>
                    <img></img>
                    <p></p>
                </div>
                <h3></h3>
                <img></img>
                </div>
            </UserTitle>
                <div>
                </div>
            </div>
        </div>
    )
}
