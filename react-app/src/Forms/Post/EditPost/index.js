//Hooks
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
//Actions
import { updateItem } from '../../../store/posts';
import { getOneUser } from "../../../store/users";
import { hideModal } from '../../../store/modal';

//Helpers
import { validatePost, uploadImage } from '../../../utils/Forms/items';
import { Nonprofit } from '../../../Assets/Icons/Nonprofit';

//Styling
//backgrounds
import { requestBackgrounds } from '../backgrounds';

//Components
import { PreviewSection } from "../../../Components/Preview";
import { PreviewBox } from "../../../Components/Styled/PreviewSection";
import styles from './EditItem.module.css';
import styled from 'styled-components';

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
};

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

const ErrorMessage = styled.div`
    color: #C2462A;
    font-size: 10px;
    text-justify: center;
    width: 300px;
    height: 10px;
`;

export const EditPostForm = ({post}) => {
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
    const [imageErrors, setImageErrors] = useState([]);
    const [expDateErrors, setExpDateErrors] = useState([]);
    const [noChange, setNoChange] = useState([]);

    const organizationId = sessionUser.organizationId;
    const userId = sessionUser.id;
    //variables

    let props = {title, description, number, unit, categoryId, image, imageUrl: post.imageUrl, expDate};


    const handleEdit = async (e) => {
        e.preventDefault();
        const quantity = number.toString() + ' ' + unit;

        const itemData = {
            organizationId,
            userId,
            title,
            description,
            quantity,
            categoryId,
            expDate,
        };

        const stagedPost = await validatePost(itemData)

        if(stagedPost.message === 'success') {
            if(sessionUser.isNonprofit) {
                const imageUrl = requestBackgrounds[categoryId];

                const postData = {
                    postId: post.id,
                    organizationId,
                    userId,
                    title,
                    description,
                    quantity,
                    categoryId,
                    imageUrl,
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
            } else if(!sessionUser.isNonprofit && !image) {
                const postData = {
                    postId: post.id,
                    organizationId,
                    userId,
                    title,
                    description,
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
                        title,
                        description,
                        quantity,
                        categoryId,
                        imageUrl,
                        expDate,
                    };

                    const newPost = await dispatch(updateItem(postData))

                    if(!newPost.error || !newPost.errors) {
                        dispatch(getOneUser(sessionUser.id))
                        setImageUploading(false);
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

        const noChangeArr = [];
        const imageErrorsArr = [];
        const titleErrorsArr = [];
        const descriptionErrorsArr = [];
        const numberErrorsArr = [];
        const categoryIdErrorsArr = []
        const expErrorsArr = [];

        if(titleErrors.length || descriptionErrors.length || numberErrors.length || categoryIdErrors.length || imageErrors.length || expDateErrors.length || noChange.length) {
            return noChangeArr.push('Please resolve errors before submitting.')
        } else if((!sessionUser.isNonprofit && !image.length) && (categoryId === post.categoryId.toString()) && (title === post.title) && (description === post.description) && (number === post.quantity.split(' ', 2)[0]) && (unit === post.quantity.split(' ', 2)[1]) && (expDate === `${post.expDate.toString().slice(12, 16)}-${Object.keys(monthNames).find(key => monthNames[key] === post.expDate.toString().slice(8, 11))}-${post.expDate.toString().slice(5, 7)}`)) {
            noChangeArr.push('Please change at least one field to submit')
        } else if(!categoryId) {
          categoryIdErrorsArr.push("Please select a food category.")
        } else if(title.length > 11 && !title.includes(' ')) {
            titleErrorsArr.push("Please add a line break to your title.")
        } else if(number === '') {
            numberErrorsArr.push("Please select a number.")
        } else if(!sessionUser.isNonprofit && (!imageErrorsArr.length || !titleErrorsArr.length || !descriptionErrorsArr.length || !categoryIdErrorsArr.length || !expErrorsArr.length)) {
            setImageErrors([]);
            setTitleErrors([]);
            setDescriptionErrors([]);
            setNumberErrors([]);
            setCategoryIdErrors([]);
            setExpDateErrors([]);
            return handleEdit(e)
        } else if(sessionUser.isNonprofit && (!titleErrorsArr.length || !descriptionErrorsArr.length || !categoryIdErrorsArr.length || !expErrorsArr.length)) {
            setTitleErrors([]);
            setDescriptionErrors([]);
            setNumberErrors([]);
            setCategoryIdErrors([]);
            setExpDateErrors([]);
            return handleEdit(e)
        } else {
            setImageErrors(imageErrorsArr);
            setTitleErrors(titleErrorsArr);
            setDescriptionErrors(descriptionErrorsArr);
            setNumberErrors(numberErrorsArr);
            setCategoryIdErrors(categoryIdErrorsArr);
            setExpDateErrors(expErrorsArr);
            setNoChange(noChangeArr);
        }

        setImageErrors(imageErrorsArr);
        setTitleErrors(titleErrorsArr);
        setDescriptionErrors(descriptionErrorsArr);
        setNumberErrors(numberErrorsArr);
        setCategoryIdErrors(categoryIdErrorsArr);
        setExpDateErrors(expErrorsArr);
        setNoChange(noChangeArr);
    };

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
    };

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
        } else if (e.target.value === post.quantity.split(' ', 2)[0]) {
            setNumber('');
            e.target.value='';
            setNumberErrors(['Please select a new number or click reset to revert changes.'])
        } else {
            setNumberErrors([])
            setNumber(e.target.value)
        }
    };

    const handleExp = (e) => {
        e.preventDefault();
        setExpDate(e.target.value);
        setExpDateErrors([]);
    };

    const handleNull = (e) => {
        e.preventDefault();
        return null;
    };

    const handleTitle = (e) => {
        e.preventDefault();
        setTitleErrors([])
        const titleErrorsArr = [];

        const titleInput = e.target.value.slice(0, 1).toUpperCase().concat(e.target.value.slice(1, e.target.value.length))
        setTitle(titleInput)

        if(title.length > 11 && !title.includes(' ')) {
            titleErrorsArr.push("Please add a line break to your title.")
            return setTitleErrors(titleErrorsArr)
        }
        setTitleErrors(titleErrorsArr)
    };

    const handleDescription = (e) => {
        e.preventDefault();
        setDescriptionErrors([]);
        const descriptionErrArr =[];
        const descriptionInput = e.target.value.slice(0, 1).toUpperCase().concat(e.target.value.slice(1, e.target.value.length));
        const descriptionArr = descriptionInput.split(' ')
        setDescription(descriptionInput);

        if(descriptionInput.length > 11 && !descriptionInput.includes(' ')) {
            descriptionErrArr.push("Please add a line break to your description.");
            return setDescriptionErrors(descriptionErrArr);
        } else {
            descriptionArr.forEach(desc => {
                if(desc.length > 20) {
                    descriptionErrArr.push('Please add a line break to your description');
                    return setDescriptionErrors(descriptionErrArr);
                } else {
                    return setDescriptionErrors(descriptionErrArr);
                }
            })
        };
    };

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

        setImage('');
        setTitle(post.title);
        setDescription(post.description);
        setNumber(post.quantity.split(' ', 2)[0]);
        setUnit(post.quantity.split(' ', 2)[1]);
        setExpDate(`${post.expDate.toString().slice(12, 16)}-${Object.keys(monthNames).find(key => monthNames[key] === post.expDate.toString().slice(8, 11))}-${post.expDate.toString().slice(5, 7)}`);
        setCategoryId(post.categoryId.toString());
        setClassName(categories[post.categoryId].category.toLowerCase())
    };

    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '1000px', height: '700px', background: 'linear-gradient(#28A690,#76D97E)', borderRadius: '5px'}}>
            <PreviewBox>
                <PreviewSection type='item' props={props} />
            </PreviewBox>
            <FormSection>
                <form style={{borderRadius: '5px', backgroundColor: 'white', border: '1px solid #D5D5D5', width: '475px', height: '675px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}} encType="multipart/form-data" onSubmit={handleEdit}>
                    <FormContent>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '300px', height: '40px', gap: '5px'}}>
                            <div style={{height: '30px', width: '35px'}}>
                                <Nonprofit color={'black'} />
                            </div>
                            <div className={styles.formTitle}>{sessionUser.isNonprofit ? 'Edit request form' : 'Edit item form'}</div>
                        </div>
                        <div style={{ width: '300px', height: '15px', marginBottom: '-10px', color: '#90311D', fontFamily: 'motiva-sans, sans-serif', fontSize: '12px'}}>{ noChange.length ? noChange[0] : '* Change at least one field to submit' }</div>
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
                            <Textarea placeholder='Description' type='text' minLength='3' maxLength='100' value={description} onChange={handleDescription} />
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
                            <div className={
                               (
                                (image !== '')
                                ||
                                (title.length && title !== post.title)
                                ||
                                (description.length && description !== post.description)
                                ||
                                (number && number !== post.quantity.split(' ', 2)[0])
                                ||
                                (unit !== post.quantity.split(' ', 2)[1])
                                ||
                                (categoryId !== post.categoryId.toString())
                                ||
                                (expDate !== `${post.expDate.toString().slice(12, 16)}-${Object.keys(monthNames).find(key => monthNames[key] === post.expDate.toString().slice(8, 11))}-${post.expDate.toString().slice(5, 7)}`))
                                &&
                                (!titleErrors.length)
                                &&
                                (!descriptionErrors.length)
                                &&
                                (!numberErrors.length)
                                &&
                                (!categoryIdErrors.length)
                                &&
                                (!expDateErrors.length)
                                &&
                                (!imageErrors.length)
                                &&
                                (!noChange.length)
                                ? styles.submit : styles.hold} onClick={(e) => e.target.className === 'hold' ? handleNull(e) :  handleErrors(e)}>Submit</div>
                        )}
                        {sessionUser.isNonprofit && (
                            <div className={(title !== post.title) || (description !== post.description) || (number !== post.quantity.split(' ', 2)[0]) || (unit !== post.quantity.split(' ', 2)[1]) || (categoryId !== post.categoryId.toString()) || (expDate !== `${post.expDate.toString().slice(12, 16)}-${Object.keys(monthNames).find(key => monthNames[key] === post.expDate.toString().slice(8, 11))}-${post.expDate.toString().slice(5, 7)}`) ? styles.submit : styles.hold} onClick={(e) => e.target.className === 'hold' ? handleNull(e) :  handleErrors(e)}>Submit</div>
                        )}
                    </div>
                </form>
            </FormSection>
        </div>
    );
};
