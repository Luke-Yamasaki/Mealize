import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { postItem } from '../../store/posts';

const ItemForm = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [categoryId, setCategoryId] = useState(1);
    const [imageUrl, setImageUrl] = useState('https://cdn.iconscout.com/icon/free/png-256/picture-138-444905.png');
    const [expDate, setExpDate] = useState(new Date());
    const [imageUploading, setImageUploading] = useState(false);
    const [errors, setErrors] = useState([]);

    const organizationId = sessionUser.organizationId;
    const userId = sessionUser.id;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            isItem: 'True',
            organizationId,
            userId,
            title,
            description,
            quantity,
            categoryId,
            imageUrl,
            expDate,
            status:0
        }

        setImageUploading(true);

        const res = dispatch(postItem(formData));
        if (res.ok) {
            const newPost = await res.json();
            setImageUploading(false);
            history.push(`/posts/${newPost.id}`);
        }
        else {
            setImageUploading(false);
            setErrors(res.errors)
        }
    }

    // const updateImage = (e) => {
    //     const file = e.target.files[0];
    //     console.log(file)
    //     console.log(file.name)
    //     console.log(file.size)
    //     console.log(file.type)
    //     setImage(file)

    // }

    return (
        <form style={{width: '600px', height: '1000px', display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit}>
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
            //   type="file"
            //   accept="image/*"
            //   onChange={updateImage}
            type='url'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            />
            <input type='date' min={new Date()} value={expDate} onChange={e => setExpDate(e.target.value)} />
            <div style={{border: '1px solid black'}} role="button" onClick={handleSubmit}>Submit</div>
            {(imageUploading)&& <p>Loading...</p>}
        </form>
    )
}

export default ItemForm;
