export const validatePost = async (postData) => {
    const response = await fetch('/api/posts/validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    });
    if(response.ok) {
        const stagedPost = await response.json();
        return stagedPost;
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data;
        };
    } else {
        return 'Connection failed. Please check your internet connection.'
    };
};

export const uploadImage = async (formData) => {
    const response = await fetch('/api/posts/images', {
        method: "POST",
        body: formData,
    });
    return response;
}
