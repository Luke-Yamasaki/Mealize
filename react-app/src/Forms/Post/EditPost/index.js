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
import { getIp } from '../../../utils/Forms/signup';
import * as nsfwjs from 'nsfwjs';

//Styling
//backgrounds
import { requestBackgrounds } from '../backgrounds';

//Components
import { PreviewSection } from "../../../Components/Preview";
import { PreviewBox, UploadingBox, UploadingMessage } from "../../../Components/Styled/PreviewSection";
import styles from './EditItem.module.css';
import styled from 'styled-components';
import { MaxLengthMessage } from "../../../Components/Styled/PostCard";
import { Nonprofit } from '../../../Assets/Icons/Nonprofit';

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
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [number, setNumber] = useState(post.quantity.split(' ', 2)[0]);
    const [unit, setUnit] = useState(post.quantity.split(' ', 2)[1]);
    const [categoryId, setCategoryId] = useState(post.categoryId.toString());
    const [image, setImage] = useState('');
    const [expDate, setExpDate] = useState(`${post.expDate.toString().slice(12, 16)}-${Object.keys(monthNames).find(key => monthNames[key] === post.expDate.toString().slice(8, 11))}-${post.expDate.toString().slice(5, 7)}`);
    const [imageValidating, setImageValidating] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
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

        if(titleErrors.length > 0 || descriptionErrors.length > 0 || numberErrors.length > 0 || categoryIdErrors.length > 0 || imageErrors.length > 0 || expDateErrors.length > 0 || noChange.length > 0) {
            return setErrors('Please resolve errors before submitting.')
        } else if((!sessionUser.isNonprofit && !image) && (categoryId === post.categoryId.toString()) && (title === post.title) && (description === post.description) && (number === post.quantity.split(' ', 2)[0]) && (unit === post.quantity.split(' ', 2)[1]) && (expDate === `${post.expDate.toString().slice(12, 16)}-${Object.keys(monthNames).find(key => monthNames[key] === post.expDate.toString().slice(8, 11))}-${post.expDate.toString().slice(5, 7)}`)) {
            return setNoChange(['Please change at least one field to submit'])
        } else if(sessionUser.isNonprofit && (categoryId === post.categoryId.toString()) && (title === post.title) && (description === post.description) && (number === post.quantity.split(' ', 2)[0]) && (unit === post.quantity.split(' ', 2)[1]) && (expDate === `${post.expDate.toString().slice(12, 16)}-${Object.keys(monthNames).find(key => monthNames[key] === post.expDate.toString().slice(8, 11))}-${post.expDate.toString().slice(5, 7)}`)) {
            return setNoChange(['Please change at least one field to submit'])
        } else if(!sessionUser.isNonprofit && (!imageErrors.length || !titleErrors.length || !descriptionErrors.length || !categoryIdErrors.length || !expDateErrors.length)) {
            setImageErrors([]);
            setTitleErrors([]);
            setDescriptionErrors([]);
            setNumberErrors([]);
            setCategoryIdErrors([]);
            setExpDateErrors([]);
            return handleEdit(e)
        } else if(sessionUser.isNonprofit && (!titleErrors.length || !descriptionErrors.length || !categoryIdErrors.length || !expDateErrors.length)) {
            setTitleErrors([]);
            setDescriptionErrors([]);
            setNumberErrors([]);
            setCategoryIdErrors([]);
            setExpDateErrors([]);
            return handleEdit(e)
        } else {
            if(titleErrors?.length || descriptionErrors?.length || numberErrors?.length || categoryIdErrors?.length || imageErrors?.length || expDateErrors?.length) {
                return setErrors(['Please resolve errors before submitting.'])
            }
        }
    };

    const nsfwCheck = async(img) => {
        const nsfwArr = [];
        const model = await nsfwjs.load();
        const predictions = await model.classify(img);
        for(let i = 0; i < predictions.length; i++) {
            if(predictions[i].className === 'Neutral' || predictions[i].className === 'Drawing' || predictions[i].className === 'Sexy') {
                i++
            } else {
                if(predictions[i].probability > 0.7) {
                    nsfwArr.push("Adult content violates Mealize's community standards.");
                    const user = getIp();
                    return user
                }
            }
        }
        return nsfwArr;
    };

    const repaint = (file) => {
        setImage(file)
    };

    const updateImage = async (e) => {
        e.preventDefault();
        setErrors([]);
        setImageValidating(true);
        setImageErrors([]);
        const file = e.target.files[0];
        const fileSize = file.size / 1024 / 1024; //convert to megabytes
        if(fileSize > 2 ) {
            e.target.value = '';
            setImage('');
            return setImageErrors(['The file size is too large. Images must be under 2MB.'])
        } else {
            //Filter adult content
            const url = URL.createObjectURL(file);
            const img = new Image();
            img.src = url;
            const nsfwArr = await nsfwCheck(img);
            if(nsfwArr.length > 0) {
                window.location.href = 'https://www.google.com';
            } else {
                e.target.style.color = '#608F41'
                setImageErrors([])
                setImage(file)
                //If good, preview the image
                repaint(file);
            }
        }
        setImageValidating(false);
    };



    const handleCategory = async (e) => {
        e.preventDefault()
        setCategoryId(e.target.value);
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

        if(parseInt(e.target.value.slice(0, 2)) !== 20 || parseInt(e.target.value.slice(0, 4)) < parseInt(new Date().getFullYear())) {
            e.target.value = '';
            return setExpDateErrors(['Please select a valid date between this year and the year 2099.']);
        } else if(parseInt(e.target.value.slice(0, 4)) >= parseInt(new Date().getFullYear()) && parseInt(e.target.value.slice(5, 7)) < (new Date().getMonth() + 1)) {
            e.target.value = '';
            return setExpDateErrors(['Please select a future date.'])
        } else if(parseInt(e.target.value.slice(0, 4)) === parseInt(new Date().getFullYear()) && (parseInt(e.target.value.slice(5, 7)) === (new Date().getMonth() + 1) && parseInt(e.target.value.slice(8, 10)) < parseInt(new Date().getDate()))) {
            e.target.value = '';
            return setExpDateErrors(['Please select a future date.'])
        } else {
            setErrors([]);
            setExpDateErrors([]);
            return setExpDate(e.target.value)
        }
    }

    const handleNull = (e) => {
        e.preventDefault();
        return null;
    };

    const handleTitle = (e) => {
        e.preventDefault();
        setErrors([]);
        setTitleErrors([]);
        const titleInput = e.target.value.slice(0, 1).toUpperCase().concat(e.target.value.slice(1, e.target.value.length))
        setTitle(titleInput);
        if(title.length >= 15 && !title.includes(' ')) {
            setTitle(titleInput.slice(0, 16));
            return setTitleErrors(['Please delete one letter and enter a space between words.'])
        }
    };

    const handleDescription = (e) => {
        e.preventDefault();
        setErrors([]);
        setDescriptionErrors([]);
        const descriptionInput = e.target.value.slice(0, 1).toUpperCase().concat(e.target.value.slice(1, e.target.value.length));
        setDescription(descriptionInput);
        if(description.length >= 30 && !description.includes(' ')) {
            setDescription(descriptionInput.slice(0, 30));
            return setDescriptionErrors(['Please delete one letter and enter a space between words.'])
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        dispatch(hideModal());
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '1000px', height: '700px', background: 'linear-gradient(#28A690,#76D97E)', borderRadius: '5px'}}>
            <PreviewBox>
                <PreviewSection type='item' props={props} />
                {imageUploading &&
                    <UploadingBox>
                        <UploadingMessage>
                            Uploading image...
                        </UploadingMessage>
                    </UploadingBox>
                }
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
                                {imageValidating && <ErrorMessage>Validating your image...</ErrorMessage>}
                                <Fieldset>
                                    <legend className={((image && !imageErrors.length) && !imageValidating) || ((post.imageUrl && !imageErrors.length) && !imageValidating) ? styles.completed : styles.incomplete }>Image upload</legend>
                                    <input id='imageUpload' style={{borderRadius: '3px', color: 'rgb(40, 166, 144)'}} type="file" accept="image/png, image/jpeg, image/jpg" onChange={updateImage} />
                                </Fieldset>
                            </>
                        )}
                        {titleErrors && (
                            <ErrorMessage>{titleErrors[0]}</ErrorMessage>
                        )}
                        {(!titleErrors && title.length === 25) && <MaxLengthMessage>You have reached the character limit.</MaxLengthMessage>}
                        <Fieldset>
                        <legend className={(title.length >= 3 && title.length < 16) || (title.length >= 16 && title.includes(' ')) ? styles.completed : styles.incomplete}>{sessionUser.isNonprofit ? 'Request title' : 'Item title'}</legend>
                                <TitleTextArea placeholder='Enter a title... (25 character limit)' type='text' minLength='4' maxLength='25' cols='11' rows='3' required value={title} onChange={handleTitle} />
                        </Fieldset>
                        {descriptionErrors && (
                            <ErrorMessage>{descriptionErrors[0]}</ErrorMessage>
                        )}
                        <TextareaFieldset>
                        <legend className={(description.length >= 3 && !descriptionErrors.length) ? styles.completed : styles.incomplete}>{sessionUser.isNonprofit ? 'Request details' : 'Item description'}</legend>
                            <Textarea placeholder='Enter a description... (100 character limit)' type='text' minLength='3' maxLength='100' value={description} onChange={handleDescription} />
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
                            <legend className={expDate && !expDateErrors.length ? styles.completed : styles.incomplete}>Expiration date</legend>
                            <input style={{height: '25px', width: '131px', borderRadius: '3px', border: 'none'}} type='date' min={new Date().toISOString().split('T')[0]} value={expDate} onChange={handleExp} />
                        </Fieldset>
                    </FormContent>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', justifyContent: 'flex-end', width: '325px', height: '50px'}}>
                        <div className={styles.reset} onClick={handleCancel} ><div>Cancel</div></div>
                        {!sessionUser.isNonprofit && (
                            <div className={
                               (
                                (image !== '')
                                ||
                                (!imageValidating)
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
                                (expDate !== `${post.expDate.toString().slice(12, 16)}-${Object.keys(monthNames).find(key => monthNames[key] === post.expDate.toString().slice(8, 11))}-${post.expDate.toString().slice(5, 7)}`)
                                )
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
