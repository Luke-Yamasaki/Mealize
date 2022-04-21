import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updateItem } from '../../store/posts';
import { validateForm, uploadImage } from '../../Helpers/FormValidations/items';

const EditItemForm = ({post}) => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [quantity, setQuantity] = useState(post.quantity);
    const [categoryId, setCategoryId] = useState(post.categoryId);
    const [image, setImage] = useState(post.imageUrl);
    const [expDate, setExpDate] = useState(post.expDate);
    const [imageUploading, setImageUploading] = useState(false);
    const [errors, setErrors] = useState([]);

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

                const newPost = await dispatch(updateItem(itemData))

                if(!newPost.error || !newPost.errors) {
                    setImageUploading(false);
                    history.push(`/posts/${newPost.id}`)
                } else {
                    setImageUploading(false);
                    setErrors(newPost.errors)
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

    return (
        <form style={{width: '600px', height: '1000px', display: 'flex', flexDirection: 'column'}} encType="multipart/form-data" onSubmit={handleSubmit}>
            <input placeholder='Title' type='text' value={title} onChange={e => setTitle(e.target.value)} />
            <textarea placeholder='Description' type='text' value={description} onChange={e => setDescription(e.target.value)} />
            <input placeholder='Quantity' type='text' value={quantity} onChange={e => setQuantity(e.target.value)} />
            <label htmlFor='food-group'>Choose a food category</label>
            <select id='food-group' onChange={e => setCategoryId(e.target.value)}>
                <optgroup label="Food category">
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
            {(imageUploading)&& <p>Loading...</p>}
        </form>
    )
}

export default EditItemForm;