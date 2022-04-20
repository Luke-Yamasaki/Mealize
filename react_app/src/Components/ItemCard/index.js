import React, {useState, useTransition} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './ItemCard.module.css';
import styled from 'styled-components';
//actions
import { removePost, updateItem } from '../../store/posts';
//components
import { XSLogo } from '../../Assets/Logo';
import { Triangle } from '../../Assets/Icons/Triangle';
import { FavoritesIcon } from '../../Assets/Logo/FavoritesIcon/index';
import { DairyIcon } from '../../Assets/Icons/FoodGroups/Dairy';
import { VegetablesIcon } from '../../Assets/Icons/FoodGroups/Vegetables';
import { FruitsIcon } from '../../Assets/Icons/FoodGroups/Fruits';
import { GrainsIcon } from '../../Assets/Icons/FoodGroups/Grains';
import { ProteinIcon } from '../../Assets/Icons/FoodGroups/Protein';



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

const InfoBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 220px;
    height: 60px;
`;

const DescriptionBox = styled.div`
    height: 60px;
    width: 135px;
    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    justify-content: left;
`;

const SubInfoBox = styled.div`
    height: 60px;
    width: 75px;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: center;
`;

const SubInfoText = styled.div`
    width: 75px;
    height: 27px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
`;

const IdBox = styled.div`
width: 220px;
height: 15px;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;


export const ItemCard = ({ post, sessionUser }) => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const user = users[post.userId];
    const category = post.category.category;
    console.log(category)
    const handleDelete = async (e) => {
        e.preventDefault();
    };

    return (
        <div className={styles.card}>
            <div style={{backgroundImage: `url(${post.imageUrl})`}} className={styles.image}>
                <FavoritesIcon postId={post.id} />
                {post.userId === sessionUser.id ? <><div>Delete</div><div>Edit</div></> : <Triangle status={post.status} />}
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
            <InfoBox>
                <DescriptionBox>
                    <h4>Description:<h5>{post.description}</h5></h4>
                </DescriptionBox>
                <SubInfoBox>
                    <SubInfoText>Quantity:<p>{post.quantity}</p></SubInfoText>
                    <SubInfoText>Expires:<p>{post.expDate}</p></SubInfoText>
                </SubInfoBox>
            </InfoBox>
            <IdBox>
                <p>Id:{post.id}</p>
                <div>Mealize LLC <XSLogo /></div>
            </IdBox>
        </div>
    )
}
