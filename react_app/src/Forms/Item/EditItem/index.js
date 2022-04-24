import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updateItem } from '../../../store/posts';
import { getOneUser } from "../../../store/users";
import { validateForm, uploadImage } from '../../../Helpers/FormValidations/items';
import { hideModal } from '../../../store/modal';
import { XSLogo } from '../../../Assets/Logo';
import { Nonprofit } from '../../../Assets/Icons/Nonprofit';
import { DairyIcon } from '../../../Assets/Icons/FoodGroups/Dairy';
import { VegetablesIcon } from '../../../Assets/Icons/FoodGroups/Vegetables';
import { FruitsIcon } from '../../../Assets/Icons/FoodGroups/Fruits';
import { GrainsIcon } from '../../../Assets/Icons/FoodGroups/Grains';
import { ProteinIcon } from '../../../Assets/Icons/FoodGroups/Protein';

import styles from './EditItem.module.css';
import styled from 'styled-components';
import * as preview from '../../../Components/ItemCard';

const monthNames = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
}


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

const FormContent = styled.div`
    width: 475px;
    height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
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

const ErrorMessage = styled.div`
    color: #C2462A;
    font-size: 10px;
    text-justify: center;
    width: 300px;
    height: 10px;
`;

export const EditItemForm = ({post}) => {
    const sessionUser = useSelector(state => state.session.user);
    const categories = useSelector(state => state.categories)
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [number, setNumber] = useState(post.quantity.split(' ', 2)[0]);
    const [unit, setUnit] = useState(post.quantity.split(' ', 2)[1]);
    const [categoryId, setCategoryId] = useState(post.categoryId.toString());
    const [image, setImage] = useState('');
    const [expDate, setExpDate] = useState(`${post.expDate.toString().slice(12, 16)}-${Object.keys(monthNames).find(key => monthNames[key] === post.expDate.toString().slice(8, 11))}-${post.expDate.toString().slice(5, 7)}`);
    const [imageUploading, setImageUploading] = useState(false);
    const [className, setClassName] = useState(categories[post.categoryId].category.toLowerCase())
    const [errors, setErrors] = useState([]);

    // errors
    const [titleErrors, setTitleErrors] = useState([]);
    const [descriptionErrors, setDescriptionErrors] = useState([]);
    const [numberErrors, setNumberErrors] = useState([]);
    const [categoryIdErrors, setCategoryIdErrors] = useState([]);
    const [imageErrors, setImageErrors] = useState(null);
    const [expDateErrors, setExpDateErrors] = useState([]);

    const organizationId = sessionUser.organizationId;
    const userId = sessionUser.id;
    //variables

    const handleEdit = async (e) => {
        e.preventDefault();

        const titleCap = title.slice(0, 1).toUpperCase().concat(title.slice(1, title.length));
        const descriptionCap = description.slice(0, 1).toUpperCase().concat(description.slice(1, description.length));
        const quantity = number.toString() + ' ' + unit;

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
            if(!image) {
                const postData = {
                    postId: post.id,
                    organizationId,
                    userId,
                    title: titleCap,
                    description: descriptionCap,
                    quantity,
                    categoryId,
                    imageUrl: post.imageUrl,
                    expDate,
                };

                const newPost = await dispatch(updateItem(postData))

                if(!newPost.error || !newPost.errors) {
                    setImageUploading(false);
                    history.push(`/`)
                    dispatch(hideModal());
                } else {
                    setImageUploading(false);
                    setErrors(newPost.errors);
                    return errors
                }
            } else {
               const formData = new FormData();
                formData.append("image", image);

                setImageUploading(true);

                const response = await uploadImage(formData)

                if (response.ok) {
                    const data = await response.json();
                    const imageUrl = await data.imageUrl

                    const postData = {
                        postId: post.id,
                        organizationId,
                        userId,
                        title: titleCap,
                        description: descriptionCap,
                        quantity,
                        categoryId,
                        imageUrl,
                        expDate,
                    };

                    const newPost = await dispatch(updateItem(postData))

                    if(!newPost.error || !newPost.errors) {
                        dispatch(getOneUser(sessionUser.id))
                        setImageUploading(false);
                        history.push(`/`)
                        dispatch(hideModal());
                    } else {
                        setImageUploading(false);
                        setErrors(newPost.errors);
                    }
                }
            }


        }
    };

    const handleErrors = (e) => {
        e.preventDefault();

        const imageErrorsArr = [];
        const titleErrorsArr = [];
        const descriptionErrorsArr = [];
        const numberErrorsArr = [];
        const categoryIdErrorsArr = []
        const expErrorsArr = [];


        if(!sessionUser.isNonprofit && !image) {
            imageErrorsArr.push("Please select a .jpg or .png image file to upload.")
        }

        if(title.length > 11 && !title.includes(' ')) {
            titleErrorsArr.push("Please add a line break to your title.")
        }

        if(!title) {
            titleErrorsArr.push("Please enter a title in 25 characters or less.")
        }

        if(!description) {
            descriptionErrorsArr.push("Please enter a description in 120 characters or less.")
        }

        if(!sessionUser.isNonprofit && !number) {
            numberErrorsArr.push("Please select a quantity for your post.")
        }

        if(!number) {
            numberErrorsArr.push('Please select a desired quantity for your request.')
        }

        if(!categoryId) {
          categoryIdErrorsArr.push("Please select a food category.")
        }

        if(sessionUser.isNonprofit && !expDate) {
            expErrorsArr.push('Please select an end date for your request.')
        }

        if(!expDate) {
            expErrorsArr.push('Please select an expiration date for your item.')
        }

        setImageErrors(imageErrorsArr);
        setTitleErrors(titleErrorsArr);
        setDescriptionErrors(descriptionErrorsArr);
        setNumberErrors(numberErrorsArr);
        setCategoryIdErrors(categoryIdErrorsArr);
        setExpDateErrors(expErrorsArr);


        if(!sessionUser.isNonprofit && (!imageErrorsArr.length || !titleErrorsArr.length || !descriptionErrorsArr.length || !categoryIdErrorsArr.length || !expErrorsArr.length)) {
            setImageErrors([]);
            setTitleErrors([]);
            setDescriptionErrors([]);
            setNumberErrors([]);
            setCategoryIdErrors([]);
            setExpDateErrors([]);
            handleEdit(e)
        }

        if(sessionUser.isNonprofit && (!titleErrorsArr.length || !descriptionErrorsArr.length || !categoryIdErrorsArr.length || !expErrorsArr.length)) {
            setTitleErrors([]);
            setDescriptionErrors([]);
            setNumberErrors([]);
            setCategoryIdErrors([]);
            setExpDateErrors([]);
            handleEdit(e)
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        const fileSize = file.size / 1024 / 1024; //convert to megabytes
        if(fileSize > 2 ) {
            setImage('');
            setImageErrors(['The file size is too large. Images must be under 2MB.'])
        }
        else {
            e.target.style.color = '#608F41'
            setImageErrors([])
            setImage(file)
        }
    }

    const handleCategory = async (e) => {
        e.preventDefault()
        setCategoryId(e.target.value);
        setClassName(categories[e.target.value].category.toLowerCase())
        setCategoryIdErrors([])
    };

    const handleNumber = (e) => {
        e.preventDefault();
        if(e.target.value.length > 3 && e.target.value > 1000) {
            setNumber('');

            setNumberErrors(['Please select a number between 1 and 1,000.'])
        } else if (e.target.value <= 0) {
            setNumber('');
            e.target.value='';
            setNumberErrors(['Please select a number greater than zero.'])
        } else {
            setNumberErrors([])
            setNumber(e.target.value)
        }
    }

    const handleExp = (e) => {
        e.preventDefault();
        setExpDate(e.target.value);
        setExpDateErrors([]);
    }

    const handleNull = (e) => {
        e.preventDefault();
        return null;
    }

    const handleTitle = (e) => {
        e.preventDefault();
        const titleInput = e.target.value
        setTitleErrors([])
        const titleErrorsArr = [];

        if(titleInput.length > 11 && !titleInput.includes(' ')) {
            titleErrorsArr.push("Please add a line break to your title.")
        }

        if(titleInput.length >= 0 && !titleErrorsArr.length) {
            setTitle(titleInput)
        } else {
            setTitleErrors(titleErrorsArr)
        }
    }

    const handleReset = (e) => {
        e.preventDefault();
        const imageInput = document.getElementById('imageUpload');
        imageInput.value = '';
        imageInput.style.color = '#C2462A';
        setImageErrors([]);
        setTitleErrors([]);
        setCategoryIdErrors([]);
        setDescriptionErrors([]);
        setExpDateErrors([]);
        setNumberErrors([]);

        setImage(null);
        setTitle(post.title);
        setDescription(post.description);
        setNumber(post.quantity.split(' ', 2)[0]);
        setUnit(post.quantity.split(' ', 2)[1]);
        setExpDate(`${post.expDate.toString().slice(12, 16)}-${Object.keys(monthNames).find(key => monthNames[key] === post.expDate.toString().slice(8, 11))}-${post.expDate.toString().slice(5, 7)}`);
        setCategoryId(post.categoryId.toString());
        setClassName(categories[post.categoryId].category.toLowerCase())
    };

    return (
        <div style={{overflow: 'hidden', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '1000px', height: '700px', background: 'linear-gradient(#28A690,#76D97E)', borderRadius: '5px'}}>
            <PreviewSection>
                {errors && (
                    <div>{errors}</div>
                )}
                <div className={[styles.card, styles[`${className}`]].join(' ')}>
                {!sessionUser.isNonprofit ?
                    (
                        <img src={ image ? URL.createObjectURL(image) : post.imageUrl } className={styles.image} alt='Item post'/>
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
                            <preview.SubInfoText>{ parseInt(expDate[0]) ?  `${monthNames[expDate.toString().slice(5,7)]}/${expDate.toString().slice(8, 10)}/${expDate.toString().slice(0, 4)}` : `${expDate.toString().slice(8, 11)}/${expDate.toString().slice(5, 7)}/${expDate.toString().slice(12, 17)}`}</preview.SubInfoText>
                        </preview.SubInfoBox>
                    </preview.SubInfoContainer>
                </preview.InfoBox>
                <preview.IdBox>
                    <preview.IdText>Id:{sessionUser.id}</preview.IdText>
                    <preview.MealizeText>Mealize LLC <XSLogo /></preview.MealizeText>
                </preview.IdBox>
            </div>
            {imageUploading && (
                <div style={{display: 'flex', alginItems: 'center', justifyContent: 'center',  width: '300px', height: '30px'}}>
                    <p style={{fontFamily: 'motiva-sans, sans-serif', fontWeight: '900', color: 'white', fontSize: '24px', padding: 'none', margin: 'none'}}>Uploading image...</p>
                </div>
            )}
            </PreviewSection>
            <FormSection>
                <form style={{borderRadius: '5px', backgroundColor: 'white', border: '1px solid #D5D5D5', width: '475px', height: '675px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}} encType="multipart/form-data" onSubmit={handleEdit}>
                    <FormContent>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '300px', height: '40px', gap: '5px'}}>
                            <div style={{height: '30px', width: '35px'}}>
                                <Nonprofit color={'black'} />
                            </div>
                            <div className={styles.formTitle}>{sessionUser.isNonprofit ? 'Edit request form' : 'Edit item form'}</div>
                        </div>
                        <div style={{ width: '300px', height: '15px', marginBottom: '-10px', color: '#90311D', fontFamily: 'motiva-sans, sans-serif', fontSize: '12px'}}> * Change at least one field to submit </div>
                        {categoryIdErrors && (
                            <ErrorMessage>{categoryIdErrors[0]}</ErrorMessage>
                        )}
                        <Fieldset>
                            <legend className={categoryId ? styles.completed : styles.incomplete}>Food category</legend>
                                <select style={{height: '25px', width: '131px', borderRadius: '3px', border: 'none'}} id='food-group' value={categoryId} onChange={handleCategory}>
                                    <optgroup label="Food category">
                                        <option value='' disabled>Select a category</option>
                                        <option value={1}>Dairy</option>
                                        <option value={2}>Vegetables</option>
                                        <option value={3}>Fruits</option>
                                        <option value={4}>Grains</option>
                                        <option value={5}>Protein</option>
                                    </optgroup>
                                </select>
                        </Fieldset>
                        {!sessionUser.isNonprofit && (
                            <>
                                {imageErrors && (
                                <ErrorMessage>{imageErrors[0]}</ErrorMessage>
                                )}
                                <Fieldset>
                                    <legend className={image || post.imageUrl ? styles.completed : styles.incomplete }>Image upload</legend>
                                    <input id='imageUpload' style={{borderRadius: '3px', color: 'rgb(40, 166, 144)'}} type="file" accept="image/png, image/jpeg, image/jpg" onChange={updateImage} />
                                </Fieldset>
                            </>
                        )}
                        {titleErrors && (
                            <ErrorMessage>{titleErrors[0]}</ErrorMessage>
                        )}
                        <Fieldset>
                        <legend className={(title.length >= 3 && title.length <= 11) || (title.length > 11 && title.includes(' ')) ? styles.completed : styles.incomplete}>{sessionUser.isNonprofit ? 'Request title' : 'Item title'}</legend>
                                <TitleTextArea placeholder='Title' type='text' minLength='4' maxLength='25' cols='11' rows='3' required value={title} onChange={handleTitle} />
                        </Fieldset>
                        {descriptionErrors && (
                            <ErrorMessage>{descriptionErrors[0]}</ErrorMessage>
                        )}
                        <TextareaFieldset>
                        <legend className={(description.length >= 3 && description.length <= 17) || (description.length > 17 && description.includes(' ')) ? styles.completed : styles.incomplete}>{sessionUser.isNonprofit ? 'Request details' : 'Item description'}</legend>
                            <Textarea placeholder='Description' type='text' minLength='3' maxLength='100' value={description} onChange={e => setDescription(e.target.value)} />
                        </TextareaFieldset>
                        {numberErrors && (
                            <ErrorMessage>{numberErrors[0]}</ErrorMessage>
                        )}
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
                        {expDateErrors && (
                            <ErrorMessage>{expDateErrors[0]}</ErrorMessage>
                        )}
                        <Fieldset>
                            <legend className={expDate ? styles.completed : styles.incomplete}>Expiration date</legend>
                            <input style={{height: '25px', width: '131px', borderRadius: '3px', border: 'none'}} type='date' min={new Date().toISOString().split('T')[0]} value={expDate} onChange={handleExp} />
                        </Fieldset>
                    </FormContent>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', justifyContent: 'flex-end', width: '325px', height: '50px'}}>
                        <div className={styles.reset} onClick={handleReset} ><div>Reset</div></div>
                        {!sessionUser.isNonprofit && (
                            <div className={(image && !imageErrors.length) && (title && !titleErrors.length) && (description && !descriptionErrors.length) && (number && !numberErrors.length) && (categoryId && !categoryIdErrors.length) && (expDate && !expDateErrors.length) ? styles.submit : styles.hold} onClick={(e) => e.target.calssName === 'hold' ? handleNull(e) :  handleErrors(e)}>Submit</div>
                        )}
                        {sessionUser.isNonprofit && (
                            <div className={(title && !titleErrors.length) && (description && !descriptionErrors.length) && (number && !numberErrors.length) && (categoryId && !categoryIdErrors.length) && (expDate && !expDateErrors.length) ? styles.submit : styles.hold} onClick={(e) => e.target.calssName === 'hold' ? handleNull(e) :  handleErrors(e)}>Submit</div>
                        )}
                    </div>
                </form>
            </FormSection>
        </div>
    );
};
