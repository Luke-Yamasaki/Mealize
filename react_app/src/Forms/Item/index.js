import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { postItem } from '../../store/posts';
import { validateForm, uploadImage } from '../../Helpers/FormValidations/items';
import { hideModal } from '../../store/modal';
import { XSLogo } from '../../Assets/Logo';
import { DairyIcon } from '../../Assets/Icons/FoodGroups/Dairy';
import { VegetablesIcon } from '../../Assets/Icons/FoodGroups/Vegetables';
import { FruitsIcon } from '../../Assets/Icons/FoodGroups/Fruits';
import { GrainsIcon } from '../../Assets/Icons/FoodGroups/Grains';
import { ProteinIcon } from '../../Assets/Icons/FoodGroups/Protein';

import styles from './Item.module.css';
import * as preview from '../../Components/ItemCard';

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

    const word = 'DairyIcon';

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
        <div style={{overflow: 'hidden', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '900px', height: '600px', background: 'linear-gradient(#28A690,#76D97E)', borderRadius: '5px'}}>
            <section style={{width: '500px', height: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <div className={[styles.card, styles[`${className}`]].join(' ')}>
                <img src={ image ? URL.createObjectURL(image) : 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'} className={styles.image} alt='Item post'/>
                <preview.UserTitle>
                    <preview.UserImage>
                        <img src={sessionUser.profileImageUrl} className={styles.profile} alt="User profile."/>
                        <preview.NameText>{ `${sessionUser.firstName}` }</preview.NameText>
                    </preview.UserImage>
                    <preview.TitleBox>
                        <preview.Title>{ title }</preview.Title>
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
                        <preview.DescriptionLabel>[Description] <preview.DescriptionText>{description}</preview.DescriptionText></preview.DescriptionLabel>
                    </preview.DescriptionBox>
                    <preview.SubInfoBox>
                        <preview.SubInfoText>Quantity:{quantity}</preview.SubInfoText>
                        <preview.SubInfoText>Expires:{console.log(expDate)}</preview.SubInfoText>
                    </preview.SubInfoBox>
                </preview.InfoBox>
                <preview.IdBox>
                    <preview.IdText>Id:{sessionUser.id}</preview.IdText>
                    <preview.MealizeText>Mealize LLC <XSLogo /></preview.MealizeText>
                </preview.IdBox>
            </div>
            {(imageUploading)&& <p>Hello</p>}
            </section>
            <form style={{backgroundColor: 'white', width: '400px', height: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}} encType="multipart/form-data" onSubmit={handleSubmit}>
                {errors}<p>Hello</p>
                <input placeholder='Title' type='text' value={title} onChange={e => setTitle(e.target.value)} />
                <textarea placeholder='Description' type='text' value={description} onChange={e => setDescription(e.target.value)} />
                <input placeholder='Quantity' type='text' value={quantity} onChange={e => setQuantity(e.target.value)} />
                <label htmlFor='food-group'>Choose a food category</label>
                <select id='food-group' onChange={handleCategory}>
                    <optgroup label="Food category">
                        <option value=''>--- Select an option ---</option>
                        <option value={1}>Dairy</option>
                        <option value={2}>Vegetables</option>
                        <option value={3}>Fruits</option>
                        <option value={4}>Grains</option>
                        <option value={5}>Protein</option>
                    </optgroup>
                </select>
                <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={updateImage}
                />
                <input type='date' min={new Date()} value={expDate} onChange={e => setExpDate(e.target.value)} />
                <div style={{border: '1px solid black'}} role="button" onClick={handleSubmit}>Submit</div>
            </form>
        </div>
    );
};

export default ItemForm;
