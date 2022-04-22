import React, {useState, useEffect} from "react";
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

const PreviewSection = styled.section`
    display: flex;
    width: 500px;
    height: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const FormSection = styled.section`
    display: flex;
    width: 500px;
    height: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #E8E8E8;
`;

const Fieldset = styled.fieldset`
    background-color: #E8E8E8;
    border-radius: 5px;
    border: none;
    width: 300px;
    height: 40px;
`;

const TextareaFieldset = styled.fieldset`
    background-color: #E8E8E8;
    border-radius: 5px;
    border: none;
    width: 300px;
    height: 100px;
`;

const Textarea = styled.textarea`
    resize: none;
    width: 290px;
    height: 80px;
    border: none;
    border-radius: 5px;
    hyphens: auto;
`;

const TitleTextArea = styled.textarea`
    resize: none;
    width: 290px;
    height: 20px;
    border: none;
    border-radius: 5px;
    hyphens: auto;
`;

// const TextInput = styled.input`
//     border: none;
//     border-radius: 3px;
//     width: 290px;
//     height: 20px;
//     background-color: white;
//     color: black;
//     hyphens: auto;
// `;

const FormContent = styled.div`
    width: 475px;
    height: 475px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const TitleDiv = styled.div`
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
    overflow: hidden;
`;



const ItemForm = () => {
    const sessionUser = useSelector(state => state.session.user);
    const categories = useSelector(state => state.categories)
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [number, setNumber] = useState('');
    const [unit, setUnit] = useState('lbs.');
    const [categoryId, setCategoryId] = useState('');
    const [image, setImage] = useState(null);
    const [expDate, setExpDate] = useState('');
    const [imageUploading, setImageUploading] = useState(false);
    const [className, setClassName] = useState('dairy')
    const [errors, setErrors] = useState([]);

    const organizationId = sessionUser.organizationId;
    const userId = sessionUser.id;

    useEffect(() => {

    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        const titleCap = title.slice(0, 1).toUpperCase().concat(title.slice(1, title.length));
        const descriptionCap = description.slice(0, 1).toUpperCase().concat(description.slice(1, description.length));
        const quantity = number.toString().concat(unit);

        const itemData = {
            organizationId,
            userId,
            title: titleCap,
            description: descriptionCap,
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

                const postData = {
                    organizationId,
                    userId,
                    title: titleCap,
                    description: descriptionCap,
                    quantity,
                    categoryId,
                    imageUrl,
                    expDate,
                };

                const newPost = await dispatch(postItem(postData))

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
    };

    const handleEmpty = () => {
        !sessionUser.isNonprofit && !image ?
        alert("Please select a .jpg, .jpeg or .png image file to upload.")
        :
        title.length > 11 && !title.includes(' ') ?
        alert("Please add a line break to your title.")
        :
        !title ?
        alert("Please enter a title in 25 characters or less.")
        :
        !description ?
        alert("Please enter a description in 120 characters or less.")
        :
        !sessionUser.isNonprofit && !number ?
        alert("Please select a quantity for your post.")
        : !number ?
        alert('Please select a desired quantity for your request.')
        :
        !categoryId ?
        alert("Please select a food category.")
        :
        sessionUser.isNonprofit && !expDate ?
        alert('Please select an end date for your request.')
        :
        alert('Please select an expiration date for your item.')
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
    };

    const handleNumber = (e) => {
        e.preventDefault();
        if(e.target.value.length > 3 && e.target.value > 1000) {
            setNumber('');
            e.target.value = '';
            alert('Please select a number between 1 and 1,000.')
        };
        setNumber(e.target.value)
    }

    const handleReset = (e) => {
        e.preventDefault();
        setImage(null);
        setTitle('');
        setDescription('');
        setNumber('');
        setUnit('lbs.');
        setExpDate('');
        setCategoryId('');
        setClassName('dairy')
    };

    return (
        <div style={{overflow: 'hidden', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '1000px', height: '700px', background: 'linear-gradient(#28A690,#76D97E)', borderRadius: '5px'}}>
            <PreviewSection>
                <div className={[styles.card, styles[`${className}`]].join(' ')}>
                {!sessionUser.isNonprofit ?
                    (
                        <img src={ image ? URL.createObjectURL(image) : 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'} className={styles.image} alt='Item post'/>
                    )
                    : categoryId === '' || categoryId === '1' ?
                    (
                        <img src={'https://mealize.s3.amazonaws.com/dairy_request.png'} className={styles.image} alt='Item post' />
                    )
                    : categoryId === '2' ?
                    (
                        <img src={'https://mealize.s3.amazonaws.com/vegetables_request.png'} className={styles.image} alt='Item post' />
                    )
                    : categoryId === '3' ?
                    (
                        <img src={'https://mealize.s3.amazonaws.com/fruits_request.png'} className={styles.image} alt='Item post' />
                    )
                    : categoryId === '4' ?
                    (
                        <img src={'https://mealize.s3.amazonaws.com/grains_request.png'} className={styles.image} alt='Item post' />
                    )
                    :
                    (
                        <img src={'https://mealize.s3.amazonaws.com/protein_request.png'} className={styles.image} alt='Item post' />
                    )
                }
                <preview.UserTitle>
                    <preview.UserImage>
                        <img src={sessionUser.profileImageUrl} className={styles.profile} alt="User profile."/>
                        <preview.NameText>{ `${sessionUser.firstName}` }</preview.NameText>
                    </preview.UserImage>
                    <preview.TitleBox>
                        <preview.Title>
                            <TitleDiv>
                                { !title ? 'Your post title' : (title.length > 0 && title.length <= 11) || (title.length > 11 && title.includes(' ')) ? title.slice(0, 1).toUpperCase().concat(title.slice(1, title.length)) : <strong style={{color: 'red'}}>Please add line breaks like this!</strong> }
                            </TitleDiv>
                        </preview.Title>
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
                        <preview.DescriptionLabel>[Description] <preview.DescriptionText>{description ? description.slice(0, 1).toUpperCase().concat(description.slice(1, description.length)) : 'Your description goes here...'}</preview.DescriptionText></preview.DescriptionLabel>
                    </preview.DescriptionBox>
                    <preview.SubInfoContainer>
                        <preview.SubInfoBox>Quantity:
                            <preview.SubInfoText>{`${number} ${unit}`}</preview.SubInfoText>
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
                <form style={{borderRadius: '5px', backgroundColor: 'white', border: '1px solid #D5D5D5', width: '475px', height: '650px', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '25px', alignItems: 'center'}} encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '400px', height: '40px', gap: '5px'}}>
                        <div style={{height: '100px', width: '35px'}}>
                            <Nonprofit color={'black'} />
                        </div>
                        <div className={styles.formTitle}>{sessionUser.isNonprofit ? 'New request form' : 'New item form'}</div>
                    </div>
                    <div style={{color: '#90311D', marginLeft: '-130px', marginBottom: '20px', marginTop: '-10px'}}> * All fields are required</div>
                    <FormContent>
                        {!sessionUser.isNonprofit && (
                          <Fieldset>
                            <legend className={image ? styles.completed : styles.incomplete }>Image upload</legend>
                                <input style={{borderRadius: '3px', color: '#005C4D'}} type="file" accept="image/png, image/jpeg, image/jpg" onChange={updateImage} required/>
                        </Fieldset>
                        )}
                        <Fieldset>
                        <legend className={(title.length >= 3 && title.length <= 11) || (title.length > 11 && title.includes(' ')) ? styles.completed : styles.incomplete}>{sessionUser.isNonprofit ? 'Request title' : 'Item title'}</legend>
                                <TitleTextArea placeholder='Title' type='text' minLength='4' maxLength='25' cols='11' rows='3' required value={title} onChange={e => setTitle(e.target.value)} />
                        </Fieldset>
                        <TextareaFieldset>
                        <legend className={(description.length >= 3 && description.length <= 17) || (description.length > 17 && description.includes(' ')) ? styles.completed : styles.incomplete}>{sessionUser.isNonprofit ? 'Request details' : 'Item description'}</legend>
                            <Textarea placeholder='Description' type='text' minLength='3' maxLength='100' value={description} onChange={e => setDescription(e.target.value)} />
                        </TextareaFieldset>
                        <Fieldset>
                        <legend className={number && unit ? styles.completed : styles.incomplete}>Item quantity</legend>
                            <input style={{width: '175px', height: '20px', border: 'none', borderRadius: '5px', paddingLeft: '5px'}} id='amount' placeholder='Enter a number: (1-1000)' type='number' value={number} onChange={handleNumber} />
                            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                                <optgroup label='General'>
                                    <option>count</option>
                                </optgroup>
                                <optgroup label="Metric">
                                    <option>g</option>
                                    <option>kg</option>
                                    <option>mL</option>
                                    <option>L</option>
                                </optgroup>
                                <optgroup label="Imperial">
                                    <option>oz</option>
                                    <option>cup</option>
                                    <option>pint</option>
                                    <option>lbs.</option>
                                    <option>qt</option>
                                </optgroup>
                            </select>
                        </Fieldset>
                        <Fieldset>
                            <legend className={categoryId ? styles.completed : styles.incomplete}>Food category</legend>
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
                            <legend className={expDate ? styles.completed : styles.incomplete}>Expiration date</legend>
                            <input style={{height: '25px', width: '131px', borderRadius: '3px', border: 'none'}} type='date' min={new Date()} value={expDate} onChange={e => setExpDate(e.target.value)} />
                        </Fieldset>
                    </FormContent>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', justifyContent: 'flex-end', width: '325px', height: '50px'}}>
                        <div className={styles.reset} onClick={handleReset} ><div>Reset</div></div>
                        <div className={styles.submit} onClick={!sessionUser.isNonprofit && !image || !title || title.length > 11 && !title.includes(' ') || !description || !number || !unit || !categoryId || !expDate ? handleEmpty : handleSubmit}>Submit</div>
                    </div>
                </form>
            </FormSection>
        </div>
    );
};

export default ItemForm;
