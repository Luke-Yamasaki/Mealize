import React, {useState} from "react";
import { useHistory } from "react-router-dom";


const ItemForm = () => {
    const history = useHistory();
    const [profileImage, setProfileImage] = useState(null);
    const [imageUploading, setImageUploading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
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
            // a real app would probably use more advanced
            // error handling
            console.log("error");
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
