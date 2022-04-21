import { useSelector, useDispatch } from 'react-redux';
import styles from './ItemCard.module.css';
import styled from 'styled-components';
//actions
import { getAllPosts, removePost, updateItem } from '../../store/posts';
import { setCurrentModal, showModal } from '../../store/modal';

import { XSLogo } from '../../Assets/Logo';
import { Triangle } from '../../Assets/Icons/Triangle';
import { FavoritesIcon } from '../../Assets/Logo/FavoritesIcon/index';
import { DairyIcon } from '../../Assets/Icons/FoodGroups/Dairy';
import { VegetablesIcon } from '../../Assets/Icons/FoodGroups/Vegetables';
import { FruitsIcon } from '../../Assets/Icons/FoodGroups/Fruits';
import { GrainsIcon } from '../../Assets/Icons/FoodGroups/Grains';
import { ProteinIcon } from '../../Assets/Icons/FoodGroups/Protein';
import { EditItemForm } from '../../Forms/Item/EditItem';

export const UserTitle = styled.div`
    width: 230px;
    height: 124px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const UserImage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 65px;
    width: 50px;
    gap: 5px;
`;

export const NameText = styled.p`
    padding: 0px;
    margin: 0px;
    font-family: motiva-sans, sans-serif;
    font-weight: 900;
    font-style: normal;
    font-size: 10px;
    height: 30px;
    width: 50px;
    text-align: center;
`;

export const TitleBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 65px;
    width: 120px;
    text-align: center;
`;

export const Title = styled.div`
    font-family: motiva-sans, sans-serif;
    font-weight: 900;
    font-style: normal;
    font-size: 16px;
    height: 65px;
    width: 120px;
    text-align: center;
`;

export const CategoryBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: center;
    height: 45px;
    width: 45px;
`;

export const InfoBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 220px;
    height: 90px;
    margin-top: -30px;
`;

export const DescriptionBox = styled.div`
    height: 70px;
    width: 157px;
    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: left;
`;

export const DescriptionLabel = styled.div`
    font-family: motiva-sans, sans-serif;
    font-weight: 900;
    font-style: normal;
    font-size: 12px;
    height: 12px;
    width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: flex-start;
    gap: 5px;
    margin-top: 5px;
`;

export const DescriptionText = styled.div`
    font-family: motiva-sans, sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 10px;
    height: 40px;
    width: 155px;
`;

export const SubInfoBox = styled.div`
    width: 40px;
    height: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

export const SubInfoText = styled.div`
    width: 80px;
    height: 34px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    background-color: white;
    font-size: 12px;
`;

export const IdBox = styled.div`
    width: 240px;
    height: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
`;

export const MealizeText = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: flex-end;
    font-family: motiva-sans, sans-serif;
    font-weight: 900;
    font-style: normal;
    font-size: 10px;
    height: 10px;
    width: 125px;
`;

export const IdText = styled.div`
    padding: 0px;
    margin: 0px;
    font-family: motiva-sans, sans-serif;
    font-weight: 900;
    font-style: normal;
    font-size: 10px;
    height: 10px;
    width: 125px;
`;

export const ActionButtons = styled.div`
    width: 50px;
    height: 25px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: red;
    font-family: motiva-sans, sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 10px;
    color: white;
    curosr: pointer;
`;

export const ItemCard = ({ post, sessionUser }) => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const user = users[post.userId];
    const category = post.category.category;
    const status = post.status === 0 ? 'active' : 'reserved' ;
    const className = `${category.toLowerCase()}-${status}`;

    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(removePost(post.id));
        dispatch(getAllPosts())
    };

    const showEditItemForm = () => {
            dispatch(setCurrentModal(EditItemForm(post={post})));
            dispatch(showModal());
    };

    return (
        <div className={[styles.card, styles[`${className}`]].join(' ')}>
            <div style={{backgroundImage: `url(${post.imageUrl})`}} className={styles.image}>
                {sessionUser ? <FavoritesIcon post={post} sessionUser={sessionUser} /> : <div/>}
                {sessionUser && post.userId === sessionUser.id ?
                <div>
                    <ActionButtons role='button' onClick={handleDelete}>Delete</ActionButtons>
                    <ActionButtons role='button' onClick={showEditItemForm}>Edit</ActionButtons>
                </div>
                : <Triangle status={post.status} />
                }
            </div>
            <UserTitle>
                <UserImage>
                    <img src={user.profileImageUrl} className={styles.profile} alt="User profile."/>
                    <NameText>{ `${user.firstName} ${user.lastName[0]}.` }</NameText>
                </UserImage>
                <TitleBox>
                    <Title>{ post.title }</Title>
                </TitleBox>
                <CategoryBox>
                    { category === 'Dairy'
                    ? <DairyIcon dimension={'large'}/>
                    : category === 'Vegetables'
                    ? <VegetablesIcon />
                    : category === 'Fruits'
                    ? <FruitsIcon />
                    : category === 'Grains'
                    ? <GrainsIcon />
                    : <ProteinIcon />
                    }
                </CategoryBox>
            </UserTitle>
            <InfoBox>
                <DescriptionBox>
                    <DescriptionLabel>[Description] <DescriptionText>{post.description}</DescriptionText></DescriptionLabel>
                </DescriptionBox>
                <SubInfoBox>
                    <SubInfoText>Quantity:{post.quantity}</SubInfoText>
                    <SubInfoText>Expires:{post.expDate.slice(0, 16)}</SubInfoText>
                </SubInfoBox>
            </InfoBox>
            <IdBox>
                <IdText>Id:{post.id}</IdText>
                <MealizeText>Mealize LLC <XSLogo /></MealizeText>
            </IdBox>
        </div>
    )
}
