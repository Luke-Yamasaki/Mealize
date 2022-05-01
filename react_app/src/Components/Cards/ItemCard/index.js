import { useSelector, useDispatch } from 'react-redux';
import styles from './ItemCard.module.css';
import styled from 'styled-components';
//actions
import { getAllPosts, removePost } from '../../../store/posts';
import { setCurrentModal, showModal } from '../../../store/modal';
//components
import { XSLogo } from '../../../Assets/Logo';
import { Triangle } from '../../../Assets/Icons/Triangle';
import { FavoritesIcon } from '../../../Assets/Logo/FavoritesIcon/index';
import { DairyIcon } from '../../../Assets/Icons/FoodGroups/Dairy';
import { VegetablesIcon } from '../../../Assets/Icons/FoodGroups/Vegetables';
import { FruitsIcon } from '../../../Assets/Icons/FoodGroups/Fruits';
import { GrainsIcon } from '../../../Assets/Icons/FoodGroups/Grains';
import { ProteinIcon } from '../../../Assets/Icons/FoodGroups/Protein';
import { EditItemForm } from '../../../Forms/Item/EditItem';
// import { DeliveryForm } from '../../Forms/Delivery';

export const UserTitle = styled.div`
    width: 260px;
    height: 45px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const UserImage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 45px;
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
    height: 45px;
    width: 120px;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
`;

export const Title = styled.div`
    font-family: motiva-sans, sans-serif;
    font-weight: 900;
    font-style: normal;
    font-size: 16px;
    height: 45px;
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

export const CategoryBox = styled.div`
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 45px;
    width: 50px;
`;

export const InfoBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 260px;
    height: 70px;
    color: black;
`;

export const DescriptionBox = styled.div`
    height: 70px;
    width: 166px;
    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: left;
    color: black;
    margin-left: 5px;
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
    gap: 6px;
    margin-top: 7px;
    color: black;
    padding-left: 5px;
`;

export const DescriptionText = styled.div`
    font-family: motiva-sans, sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 10px;
    height: 58px;
    width: 160px;
    color: black;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
`;

export const SubInfoContainer = styled.div`
    width: 80px;
    height: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-right: 5px;
`;

export const SubInfoBox = styled.div`
    width: 75px;
    height: 33px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background-color: white;
    font-size: 12px;
    font-weight: 700;
    text-align: left;
    padding-left: 6px;
    gap: 2px;
`;

export const SubInfoText = styled.p`
    margin: 0px;
    padding: 0px;
    font-size: 10px;
    font-weight: 700;
    width: 100px;
`;

export const IdBox = styled.div`
    width: 260px;
    height: 11px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding-left: 5px;
    margin-bottom: 1px;
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
    width: 120px;
    gap: 5px;
`;

export const IdText = styled.div`
    padding: 0px;
    margin: 0px;
    font-family: motiva-sans, sans-serif;
    font-weight: 900;
    font-style: normal;
    font-size: 10px;
    height: 10px;
    width: 120px;
    margin-left: -7px;
`;

export const EditButton = styled.div`
    width: 60px;
    height: 30px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #D49524;
    font-family: motiva-sans, sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 10px;
    color: white;
    curosr: pointer;
`;

const EditDeleteBox = styled.div`
    width: 135px;
    height: 40px;
    border-radius: 3px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background-color: rgba(0, 0, 0, 0.125);
    backdrop-filter: blur(2px);
`;


const DeleteButton = styled.div`
    width: 60px;
    height: 30px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #D49524;
    font-family: motiva-sans, sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 10px;
    color: white;
    curosr: pointer;
    background-color: #C2462A;
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
            dispatch(setCurrentModal(() => (<EditItemForm post={post} />)));
            dispatch(showModal());
    };

    return (
        <div className={[styles.card, styles[`${className}`]].join(' ')}>
            <div style={{backgroundImage: `url(${post.imageUrl})`}} className={styles.image}>
                {!sessionUser && (
                    <>
                    <div />
                    <Triangle post={post} />
                    </>

                )}
                {(sessionUser && !(post.userId === sessionUser.id)) && (
                    <>
                        <FavoritesIcon post={post} sessionUser={sessionUser} />
                        <Triangle post={post} />
                    </>
                )}
                {(sessionUser && (post.userId === sessionUser.id)) && (
                    <>
                    <div />
                    <EditDeleteBox>
                        <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
                        <EditButton onClick={showEditItemForm}>Edit</EditButton>
                    </EditDeleteBox>
                    </>
                )}
            </div>
            <UserTitle>
                <UserImage>
                    <img src={user.profileImageUrl} className={styles.profile} alt="User profile."/>
                    <NameText>{ `${user.firstName}` }</NameText>
                </UserImage>
                <TitleBox>
                    <Title>{ post.title }</Title>
                </TitleBox>
                <CategoryBox>
                    { category === 'Dairy'
                    ? <DairyIcon />
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
                <SubInfoContainer>
                    <SubInfoBox>Quantity:
                        <SubInfoText>{post.quantity}</SubInfoText>
                    </SubInfoBox>
                    <SubInfoBox>Expires:
                        <SubInfoText>{`${post.expDate.slice(7, 11)}/${post.expDate.slice(5, 7)}/${post.expDate.slice(12, 16)}`}</SubInfoText>
                    </SubInfoBox>
                </SubInfoContainer>
            </InfoBox>
            <IdBox>
                <IdText>Id:{post.id}</IdText>
                <MealizeText>Mealize LLC <XSLogo id='logo' color={post.status === 0 ? 'black' : 'white'} /></MealizeText>
            </IdBox>
        </div>
    )
}
