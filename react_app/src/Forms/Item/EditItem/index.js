import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updateItem } from '../../../store/posts';
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

export const EditItemForm = ({post}) => {
    const postCopy = post;
    const sessionUser = useSelector(state => state.session.user);
    const categories = useSelector(state => state.categories)
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [categoryId, setCategoryId] = useState(post.categoryId);
    const [image, setImage] = useState(post.imageUrl);
    const [expDate, setExpDate] = useState(post.expDate);
    const [imageUploading, setImageUploading] = useState(false);
    const [className, setClassName] = useState(categories[post.categoryId].category.toLowerCase())
    const [number, setNumber] = useState(post.quantity.split(' ', 2)[0]);
    const [unit, setUnit] = useState(post.quantity.split(' ', 2)[1]);
    const [errors, setErrors] = useState([]);

    //errors
    const [titleErrors, setTitleErrors] = useState([]);
    const [descriptionErrors, setDescriptionErrors] = useState([]);
    const [numberErrors, setNumberErrors] = useState([]);
    const [categoryIdErrors, setCategoryIdErrors] = useState([]);
    const [imageErrors, setImageErrors] = useState(null);
    const [expDateErrors, setExpDateErrors] = useState([]);

    const organizationId = sessionUser.organizationId;
    const userId = sessionUser.id;

    const handleEdit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        if(!image.slice(0, 4).includes('http')) {
            formData.append("image", image);
        }

        const titleCap = title.slice(0, 1).toUpperCase().concat(title.slice(1, title.length));
        const descriptionCap = description.slice(0, 1).toUpperCase().concat(description.slice(1, description.length));
        const quantity = number.toString() + ' ' + unit;

        const editItemData = {
            organizationId,
            userId,
            title: titleCap,
            description: descriptionCap,
            quantity,
            categoryId,
            expDate,
        };

        const stagedEditPost = await validateForm(editItemData)

        if(stagedEditPost.message === 'success') {

            if(!image.slice(0, 4).includes('http')) {
                const imageUrl = post.image;

                const itemData = {
                    organizationId,
                    userId,
                    title: titleCap,
                    description: descriptionCap,
                    quantity,
                    categoryId,
                    imageUrl,
                    expDate
                };

                const newPost = await dispatch(updateItem(itemData))

                if(!newPost.error || !newPost.errors) {
                    setImageUploading(false);
                    history.push(`/`)
                    dispatch(hideModal());
                } else {
                    setImageUploading(false);
                    setErrors(newPost.errors);
                }
            }

            setImageUploading(true);

            const response = await uploadImage(formData)

            if (response.ok) {
                const data = await response.json();
                const imageUrl = await data.imageUrl

                const itemData = {
                    organizationId,
                    userId,
                    title: titleCap,
                    description: descriptionCap,
                    quantity,
                    categoryId,
                    imageUrl,
                    expDate,
                };

                const newPost = await dispatch(updateItem(itemData))

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

    const handleErrors = (e) => {
        e.preventDefault();

        const imageErrorsArr = [];
        const titleErrorsArr = [];
        const descriptionErrorsArr = [];
        const numberErrorsArr = [];
        const categoryIdErrorsArr = []
        const expErrorsArr = [];


        if(!sessionUser.isNonprofit && !image) {
            imageErrorsArr.push("Please select a .jpg, .jpeg or .png image file to upload.")
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

        if(!imageErrors.length || !titleErrors.length || !descriptionErrors.length || !categoryIdErrors.length || !expDateErrors.length) {
            handleEdit(e)
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        const fileSize = file.size / 1024 / 1024; //convert to megabytes
        fileSize > 2 ? setImageErrors(['The image file size is too large. Images must be under 2 mega bytes.']) : setImage(file)
    }

    const handleCategory = async (e) => {
        if(e.target.value)
        setCategoryId(e.target.value);
        setClassName(categories[e.target.value].category.toLowerCase())
    };

    const handleNumber = (e) => {
        e.preventDefault();
        if(e.target.value.length > 3 && e.target.value > 1000) {
            setNumber('');
            e.target.value = '';
            setNumberErrors(['Please select a number between 1 and 1,000.'])
        } else if (e.target.value <= 0) {
            setNumber('');
            e.target.value='';
            setNumberErrors(['Please select a number greater than zero.'])
        } else {
            setNumber(e.target.value)
        }
    }

    const handleReset = (e) => {
        e.preventDefault();
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
        setExpDate(post.expDate);
        setCategoryId(post.categoryId);
        setClassName(categories[post.categoryId].category.toLowerCase())
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
                <form style={{borderRadius: '5px', backgroundColor: 'white', border: '1px solid #D5D5D5', width: '475px', height: '650px', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '25px', alignItems: 'center'}} encType="multipart/form-data" onSubmit={handleEdit}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '400px', height: '40px', gap: '5px'}}>
                        <div style={{height: '100px', width: '35px'}}>
                            <Nonprofit color={'black'} />
                        </div>
                        <div className={styles.formTitle}>{sessionUser.isNonprofit ? 'Edit request form' : 'Edit item form'}</div>
                    </div>
                    <div style={{color: '#90311D', marginLeft: '-130px', marginBottom: '20px', marginTop: '-10px'}}> * All fields are required</div>
                    <FormContent>
                        {categoryIdErrors && (
                            <div>{categoryIdErrors[0]}</div>
                        )}
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
                        {!sessionUser.isNonprofit && (
                            <>
                                {imageErrors && (
                                    <div>{imageErrors[0]}</div>
                                )}
                                <Fieldset>
                                    <legend className={image ? styles.completed : styles.incomplete }>Image upload</legend>
                                        <input style={{borderRadius: '3px', color: '#005C4D'}} type="file" accept="image/png, image/jpeg, image/jpg" onChange={updateImage} value={image} required/>
                                </Fieldset>
                            </>
                        )}
                        {titleErrors && (
                            <div>{titleErrors[0]}</div>
                        )}
                        <Fieldset>
                        <legend className={(title.length >= 3 && title.length <= 11) || (title.length > 11 && title.includes(' ')) ? styles.completed : styles.incomplete}>{sessionUser.isNonprofit ? 'Request title' : 'Item title'}</legend>
                                <TitleTextArea placeholder='Title' type='text' minLength='4' maxLength='25' cols='11' rows='3' required value={title} onChange={e => setTitle(e.target.value)} />
                        </Fieldset>
                        {descriptionErrors && (
                            <div>{descriptionErrors[0]}</div>
                        )}
                        <TextareaFieldset>
                        <legend className={(description.length >= 3 && description.length <= 17) || (description.length > 17 && description.includes(' ')) ? styles.completed : styles.incomplete}>{sessionUser.isNonprofit ? 'Request details' : 'Item description'}</legend>
                            <Textarea placeholder='Description' type='text' minLength='3' maxLength='100' value={description} onChange={e => setDescription(e.target.value)} />
                        </TextareaFieldset>
                        {numberErrors && (
                            <div>{numberErrors[0]}</div>
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
                            <div>{expDateErrors[0]}</div>
                        )}
                        <Fieldset>
                            <legend className={expDate ? styles.completed : styles.incomplete}>Expiration date</legend>
                            <input style={{height: '25px', width: '131px', borderRadius: '3px', border: 'none'}} type='date' min={new Date()} value={expDate} onChange={e => setExpDate(e.target.value)} />
                        </Fieldset>
                    </FormContent>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', justifyContent: 'flex-end', width: '325px', height: '50px'}}>
                        <div className={styles.reset} onClick={handleReset} ><div>Reset</div></div>
                        <div className={styles.submit} onClick={handleErrors}>Submit</div>
                        {/* <div className={styles.submit} onClick={(!sessionUser.isNonprofit && !image) || !title || (title.length > 11 && !title.includes(' ')) || !description || !number || !unit || !categoryId || !expDate ? handleErrors : handleSubmit}>Submit</div> */}
                    </div>
                </form>
            </FormSection>
        </div>
    );
};

export default EditItemForm;

// import React, {useState} from "react";
// import { useHistory } from "react-router-dom";
// import { useSelector, useDispatch } from 'react-redux';
// import { updateItem } from '../../../store/posts';
// import { validateForm, uploadImage } from '../../../Helpers/FormValidations/items';
// import { hideModal } from '../../../store/modal';
// import { XSLogo } from '../../../Assets/Logo';
// import { Nonprofit } from '../../../Assets/Icons/Nonprofit';
// import { DairyIcon } from '../../../Assets/Icons/FoodGroups/Dairy';
// import { VegetablesIcon } from '../../../Assets/Icons/FoodGroups/Vegetables';
// import { FruitsIcon } from '../../../Assets/Icons/FoodGroups/Fruits';
// import { GrainsIcon } from '../../../Assets/Icons/FoodGroups/Grains';
// import { ProteinIcon } from '../../../Assets/Icons/FoodGroups/Protein';

// import styles from './EditItem.module.css';
// import styled from 'styled-components';
// import * as preview from '../../../Components/ItemCard';

// const PreviewSection = styled.section`
//     display: flex;
//     width: 500px;
//     height: 700px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
// `;

// const FormSection = styled.section`
//     display: flex;
//     width: 500px;
//     height: 700px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     background-color: #E8E8E8;
// `;

// const Fieldset = styled.fieldset`
//     background-color: #E8E8E8;
//     border-radius: 5px;
//     border: none;
//     width: 300px;
//     height: 40px;
// `;

// const TextareaFieldset = styled.fieldset`
//     background-color: #E8E8E8;
//     border-radius: 5px;
//     border: none;
//     width: 300px;
//     height: 100px;
// `;

// // const legend = styled.legend`
// //     background-color: #9AF2C0;
// //     border: 1px solid rgba(40, 166, 144, 0.5);
// //     border-radius: 2px;
// //     color: black;
// //     width: 125px;
// //     height: 15px;
// // `;

// const Textarea = styled.textarea`
//     resize: none;
//     width: 290px;
//     height: 80px;
//     border: none;
//     border-radius: 5px;
// `;

// const TextInput = styled.input`
//     border: none;
//     border-radius: 3px;
//     width: 290px;
//     height: 20px;
//     background-color: white;
//     color: black;
// `;

// const FormContent = styled.div`
//     width: 475px;
//     height: 475px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     align-items: center;
// `;

// export const EditItemForm = ({ post }) => {
//     const postCopy = post;
//     const sessionUser = useSelector(state => state.session.user);
//     const categories = useSelector(state => state.categories)
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const [title, setTitle] = useState(post.title);
//     const [description, setDescription] = useState(post.description);
//     const [quantity, setQuantity] = useState(post.quantity);
//     const [categoryId, setCategoryId] = useState(post.categoryId);
//     const [image, setImage] = useState(post.imageUrl);
//     const [expDate, setExpDate] = useState(new Date('02/22/2022'));
//     const [imageUploading, setImageUploading] = useState(false);
//     const [className, setClassName] = useState(categories[post.categoryId].category.toLowerCase())
//     const [errors, setErrors] = useState([]);

//     const organizationId = sessionUser.organizationId;
//     const userId = sessionUser.id;

//     const handleEdit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         if(!image.slice(0, 4).includes('http')) {
//             formData.append("image", image);
//         }

//         const itemData = {
//             organizationId,
//             userId,
//             title,
//             description,
//             quantity,
//             categoryId,
//             expDate,
//         };

//         const stagedPost = await validateForm(itemData)

//         if(stagedPost.message === 'success') {

//             setImageUploading(true);

//             const response = await uploadImage(formData)

//             if (response.ok) {
//                 const data = await response.json();
//                 const imageUrl = await data.imageUrl

//                 const itemData = {
//                     organizationId,
//                     userId,
//                     title,
//                     description,
//                     quantity,
//                     categoryId,
//                     imageUrl,
//                     expDate,
//                 };

//                 const newPost = await dispatch(updateItem(itemData))

//                 if(!newPost.error || !newPost.errors) {
//                     setImageUploading(false);
//                     history.push(`/`)
//                     dispatch(hideModal());
//                 } else {
//                     setImageUploading(false);
//                     setErrors(newPost.errors);
//                     dispatch(hideModal());
//                 }
//             }
//         }
//     }

//     const updateImage = (e) => {
//         const file = e.target.files[0];
//         console.log(file.size)
//         console.log(file.type)
//         setImage(file)
//     }

//     const handleCategory = async (e) => {
//         setCategoryId(e.target.value);
//         setClassName(categories[e.target.value].category.toLowerCase())
//     }

//     const handleReset = (e) => {
//         e.preventDefault();
//         setImage(postCopy.imageUrl);
//         setTitle(postCopy.title);
//         setDescription(postCopy.description);
//         setQuantity(postCopy.quantity);
//         setExpDate(postCopy.expDate);
//         setCategoryId(postCopy.categoryId);
//         setClassName(categories[postCopy.categoryId].category.toLowerCase());
//     }

//     return (
//         <div style={{overflow: 'hidden', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '1000px', height: '700px', background: 'linear-gradient(#28A690,#76D97E)', borderRadius: '5px'}}>
//             <PreviewSection>
//                 <div className={[styles.card, styles[`${className}`]].join(' ')}>
//                 <img src={image[0] === 'h' ? post.imageUrl : URL.createObjectURL(image) } className={styles.image} alt='Item post'/>
//                 <preview.UserTitle>
//                     <preview.UserImage>
//                         <img src={sessionUser.profileImageUrl} className={styles.profile} alt="User profile."/>
//                         <preview.NameText>{ `${sessionUser.firstName}` }</preview.NameText>
//                     </preview.UserImage>
//                     <preview.TitleBox>
//                         <preview.Title>{ title ? title : 'Your post title' }</preview.Title>
//                     </preview.TitleBox>
//                     <preview.CategoryBox>
//                         { categoryId === 2 || categoryId === '2'
//                         ? <VegetablesIcon />
//                         : categoryId === 3 || categoryId === '3'
//                         ? <FruitsIcon />
//                         : categoryId === 4 || categoryId === '4'
//                         ? <GrainsIcon />
//                         : categoryId === 5 || categoryId === '5'
//                         ? <ProteinIcon />
//                         : <DairyIcon />
//                         }
//                     </preview.CategoryBox>
//                 </preview.UserTitle>
//                 <preview.InfoBox>
//                     <preview.DescriptionBox>
//                         <preview.DescriptionLabel>[Description] <preview.DescriptionText>{description ? description : 'Your description goes here...'}</preview.DescriptionText></preview.DescriptionLabel>
//                     </preview.DescriptionBox>
//                     <preview.SubInfoContainer>
//                         <preview.SubInfoBox>Quantity:
//                             <preview.SubInfoText>{quantity}</preview.SubInfoText>
//                         </preview.SubInfoBox>
//                         <preview.SubInfoBox>Expires:
//                             <preview.SubInfoText>{`${expDate.toString().slice(5,7)}/${expDate.toString().slice(8, 10)}/${expDate.toString().slice(0, 4)}`}</preview.SubInfoText>
//                         </preview.SubInfoBox>
//                     </preview.SubInfoContainer>
//                 </preview.InfoBox>
//                 <preview.IdBox>
//                     <preview.IdText>Id:{sessionUser.id}</preview.IdText>
//                     <preview.MealizeText>Mealize LLC <XSLogo /></preview.MealizeText>
//                 </preview.IdBox>
//             </div>
//             {(imageUploading)&& <strong><p>Uploading image...</p></strong>}
//             </PreviewSection>
//             <FormSection>
//                 <form style={{borderRadius: '5px', backgroundColor: 'white', border: '1px solid #D5D5D5', width: '475px', height: '650px', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '25px', alignItems: 'center'}} encType="multipart/form-data" onSubmit={handleEdit}>
//                     <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '400px', height: '40px', gap: '5px'}}>
//                         <div style={{height: '100px', width: '35px'}}>
//                             <Nonprofit color={'black'} />
//                         </div>
//                         <div className={styles.formTitle}>Edit item form</div>
//                     </div>
//                     <FormContent>
//                         <Fieldset>
//                             <legend>Image upload</legend>
//                                 <input style={{width: '290px', height: '20px', borderRadius: '3px', color: '#005C4D'}} type="file" accept="image/png, image/jpeg, image/jpg" onChange={updateImage}/>
//                         </Fieldset>
//                         <Fieldset>
//                         <legend>Post title</legend>
//                                 <TextInput placeholder='Title' type='text' value={title} onChange={e => setTitle(e.target.value)} />
//                         </Fieldset>
//                         <TextareaFieldset>
//                         <legend>Item description</legend>
//                                 <Textarea placeholder='Description' type='text' value={description} onChange={e => setDescription(e.target.value)} />
//                         </TextareaFieldset>
//                         <Fieldset>
//                         <legend>Item quantity</legend>
//                                 <TextInput placeholder='Quantity' type='text' value={quantity} onChange={e => setQuantity(e.target.value)} />
//                         </Fieldset>
//                         <Fieldset>
//                             <legend>Food category</legend>
//                                 <select style={{height: '25px', width: '131px', borderRadius: '3px', border: 'none'}} id='food-group' onChange={handleCategory}>
//                                     <optgroup label="Food category">
//                                         <option value={1}>Dairy</option>
//                                         <option value={2}>Vegetables</option>
//                                         <option value={3}>Fruits</option>
//                                         <option value={4}>Grains</option>
//                                         <option value={5}>Protein</option>
//                                     </optgroup>
//                                 </select>
//                         </Fieldset>
//                         <Fieldset>
//                             <legend>Expiration date</legend>
//                             <input style={{height: '25px', width: '131px', borderRadius: '3px', border: 'none'}} type='date' min={new Date()} value={expDate} onChange={e => setExpDate(e.target.value)} />
//                         </Fieldset>
//                     </FormContent>
//                     <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', justifyContent: 'flex-end', width: '325px', height: '50px'}}>
//                         <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '65px', height: '25px', borderRadius: '5px', color: 'black', backgroundColor: '#D49524', cursor: 'pointer', opacity: '50%'}} role="button" onClick={handleReset} onHover={(e) => e.target.attributes.opacity = '100%'} ><div>Reset</div></div>
//                         <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '65px', height: '25px', borderRadius: '5px', color: 'white', backgroundColor: '#46A843', cursor: 'pointer', }} role="button" onClick={handleEdit}><div>Submit</div></div>
//                     </div>
//                 </form>
//             </FormSection>
//         </div>
//     );
// };
