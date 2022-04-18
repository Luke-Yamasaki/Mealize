import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import {UploadPicture}

const ItemForm = () => {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDesctiption] = useState('');
    const [quantity, setQuanityt] = useState('');
    const [categoryId, setCategoryId] = useState(1);
    const [imageFile, setImageFile] = useState(null);
    const [expDate, setExpDate] = useState(new Date());
    const [imageUploading, setImageUploading] = useState(false);
    const [errors, setErrors] = useState([]);

    const organizationId = sessionUser.organizationId;
    const userId = sessionUser.id
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            isItem:True,
            organizationId,
            userId,
            title,
            description,
            quantity,
            categoryId,
            imageFile,
            expDate,
            status:0
        }

        setImageUploading(true);

        const res = await fetch('/api/posts/', {
            method: "POST",
            body: formData,
        });
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

    const updateProfileImage = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            <div role="button">Submit</div>
            {(imageUploading)&& <p>Loading...</p>}
        </form>
    )
}

export default UploadPicture;
