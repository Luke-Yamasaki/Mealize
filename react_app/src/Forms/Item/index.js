import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { postItem } from '../../store/posts';
import { validateForm, uploadImage } from '../../Helpers/FormValidations/items';
import { hideModal } from '../../store/modal';
import { XSLogo } from '../../Assets/Logo';
import { Nonprofit } from '../../Assets/Icons/Nonprofit';
import { DairyIcon } from '../../Assets/Icons/FoodGroups/Dairy';
import { VegetablesIcon } from '../../Assets/Icons/FoodGroups/Vegetables';
import { FruitsIcon } from '../../Assets/Icons/FoodGroups/Fruits';
import { GrainsIcon } from '../../Assets/Icons/FoodGroups/Grains';
import { ProteinIcon } from '../../Assets/Icons/FoodGroups/Protein';

import styles from './Item.module.css';
import styled from 'styled-components';
import * as preview from '../../Components/ItemCard';

export const PreviewSection = styled.section`
    display: flex;
    width: 500px;
    height: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const FormSection = styled.section`
    display: flex;
    width: 500px;
    height: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #E8E8E8;
`;

export const Fieldset = styled.fieldset`
    background-color: #E8E8E8;
    border-radius: 5px;
    border: none;
    width: 300px;
    height: 40px;
`;

export const TextareaFieldset = styled.fieldset`
    background-color: #E8E8E8;
    border-radius: 5px;
    border: none;
    width: 300px;
    height: 100px;
`;

export const Legend = styled.legend`
    background-color: #9AF2C0;
    border: 1px solid rgba(40, 166, 144, 0.5);
    border-radius: 2px;
    color: black;
    width: 125px;
    height: 15px;
`;

export const Textarea = styled.textarea`
    resize: none;
    width: 290px;
    height: 80px;
    border: none;
    border-radius: 5px;
`;

export const TextInput = styled.input`
    border: none;
    border-radius: 3px;
    width: 290px;
    height: 20px;
    background-color: white;
    color: black;
`;

export const FormContent = styled.div`
    width: 475px;
    height: 475px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;



const ItemForm = () => {
    const sessionUser = useSelector(state => state.session.user);
    const categories = useSelector(state => state.categories)
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [categoryId, setCategoryId] = useState(1);
    const [image, setImage] = useState(null);
    const [expDate, setExpDate] = useState(new Date());
    const [imageUploading, setImageUploading] = useState(false);
    const [className, setClassName] = useState('dairy')
    const [errors, setErrors] = useState([]);

    let SelectedIcon = `${categories[categoryId].category}Icon`;

    const organizationId = sessionUser.organizationId;
    const userId = sessionUser.id;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        const itemData = {
            organizationId,
            userId,
            title,
            description,
            quantity,
            categoryId,
            expDate,
        };

        const stagedPost = await validateForm(itemData)

        if(stagedPost.message === 'success') {

            setImageUploading(true);

            const response = await uploadImage(formData)

            if (response.ok) {
                const data = await response.json();
                const imageUrl = await data.imageUrl

                const itemData = {
                    organizationId,
                    userId,
                    title,
                    description,
                    quantity,
                    categoryId,
                    imageUrl,
                    expDate,
                };

                const newPost = await dispatch(postItem(itemData))

                if(!newPost.error || !newPost.errors) {
                    setImageUploading(false);
                    history.push(`/`)
                    dispatch(hideModal());
                } else {
                    setImageUploading(false);
                    setErrors(newPost.errors);
                    dispatch(hideModal());
                }
            }
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        console.log(file.size)
        console.log(file.type)
        setImage(file)
    }

    const handleCategory = async (e) => {
        setCategoryId(e.target.value);
        setClassName(categories[e.target.value].category.toLowerCase())
    }

    return (
        <div style={{overflow: 'hidden', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '1000px', height: '700px', background: 'linear-gradient(#28A690,#76D97E)', borderRadius: '5px'}}>
            <PreviewSection>
                <div className={[styles.card, styles[`${className}`]].join(' ')}>
                <img src={ image ? URL.createObjectURL(image) : 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'} className={styles.image} alt='Item post'/>
                <preview.UserTitle>
                    <preview.UserImage>
                        <img src={sessionUser.profileImageUrl} className={styles.profile} alt="User profile."/>
                        <preview.NameText>{ `${sessionUser.firstName}` }</preview.NameText>
                    </preview.UserImage>
                    <preview.TitleBox>
                        <preview.Title>{ title ? title : 'Your post title' }</preview.Title>
                    </preview.TitleBox>
                    <preview.CategoryBox>
                        { categoryId === '2'
                        ? <VegetablesIcon />
                        : categoryId === '3'
                        ? <FruitsIcon />
                        : categoryId === '4'
                        ? <GrainsIcon />
                        : categoryId === '5'
                        ? <ProteinIcon />
                        : <DairyIcon />
                        }
                    </preview.CategoryBox>
                </preview.UserTitle>
                <preview.InfoBox>
                    <preview.DescriptionBox>
                        <preview.DescriptionLabel>[Description] <preview.DescriptionText>{description ? description : 'Your description goes here...'}</preview.DescriptionText></preview.DescriptionLabel>
                    </preview.DescriptionBox>
                    <preview.SubInfoContainer>
                        <preview.SubInfoBox>Quantity:
                            <preview.SubInfoText>{quantity}</preview.SubInfoText>
                        </preview.SubInfoBox>
                        <preview.SubInfoBox>Expires:
                            <preview.SubInfoText>{`${expDate.toString().slice(5,7)}/${expDate.toString().slice(8, 10)}/${expDate.toString().slice(0, 4)}`}</preview.SubInfoText>
                        </preview.SubInfoBox>
                    </preview.SubInfoContainer>
                </preview.InfoBox>
                <preview.IdBox>
                    <preview.IdText>Id:{sessionUser.id}</preview.IdText>
                    <preview.MealizeText>Mealize LLC <XSLogo /></preview.MealizeText>
                </preview.IdBox>
            </div>
            {(imageUploading)&& <strong><p>Uploading image...</p></strong>}
            </PreviewSection>
            <FormSection>
                <form style={{borderRadius: '5px', backgroundColor: 'white', border: '1px solid #D5D5D5', width: '475px', height: '675px', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '25px', alignItems: 'center'}} encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '400px', height: '40px', gap: '5px'}}>
                        <div style={{height: '100px', width: '35px'}}>
                            <Nonprofit color={'black'} />
                        </div>
                        <div className={styles.formTitle}>New item form</div>
                    </div>
                    <FormContent>
                        <Fieldset>
                            <Legend>Image upload</Legend>
                                <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={updateImage}/>
                        </Fieldset>
                        <Fieldset>
                        <Legend>Post title</Legend>
                                <TextInput placeholder='Title' type='text' value={title} onChange={e => setTitle(e.target.value)} />
                        </Fieldset>
                        <TextareaFieldset>
                        <Legend>Item description</Legend>
                                <Textarea placeholder='Description' type='text' value={description} onChange={e => setDescription(e.target.value)} />
                        </TextareaFieldset>
                        <Fieldset>
                        <Legend>Item quantity</Legend>
                                <TextInput placeholder='Quantity' type='text' value={quantity} onChange={e => setQuantity(e.target.value)} />
                        </Fieldset>
                        <Fieldset>
                            <Legend>Food category</Legend>
                                <select style={{height: '25px', width: '131px', borderRadius: '3px', border: 'none'}} id='food-group' onChange={handleCategory}>
                                    <optgroup label="Food category">
                                        <option value={1}>Dairy</option>
                                        <option value={2}>Vegetables</option>
                                        <option value={3}>Fruits</option>
                                        <option value={4}>Grains</option>
                                        <option value={5}>Protein</option>
                                    </optgroup>
                                </select>
                        </Fieldset>
                        <Fieldset>
                            <Legend>Expiration date</Legend>
                            <input style={{height: '25px', width: '131px', borderRadius: '3px', border: 'none'}} type='date' min={new Date()} value={expDate} onChange={e => setExpDate(e.target.value)} />
                        </Fieldset>
                    </FormContent>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', justifyContent: 'flex-end', width: '325px', height: '50px'}} role="button" onClick={handleSubmit}>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '65px', height: '25px', borderRadius: '5px', color: 'black', backgroundColor: '#D49524', cursor: 'pointer', opacity: '50%'}} role="button" onClick={handleSubmit} onHover={(e) => e.target.attributes.opacity = '100%'} ><div>Reset</div></div>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '65px', height: '25px', borderRadius: '5px', color: 'white', backgroundColor: '#46A843', cursor: 'pointer', }} role="button" onClick={handleSubmit}><div>Submit</div></div>
                    </div>
                </form>
            </FormSection>
        </div>
    );
};

export default ItemForm;
