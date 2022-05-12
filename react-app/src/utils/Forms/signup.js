export const emailValidate = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
};

export const uploadProfileImage = async (formData) => {
    const response = await fetch('/api/auth/images', {
        method: "POST",
        body: formData,
    });
    return response;
}

export const validateSignup = async (inputData) => {
    const response = await fetch('/api/auth/validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
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

export const BanUser = async () => {
    let xmlhttp;

    if (window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    // else {
    //     xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    // }

    xmlhttp.open("GET","http://api.hostip.info/get_html.php",false);
    xmlhttp.send();

    const hostipInfo = xmlhttp.responseText.split("\n");
    const split = hostipInfo[2].split(' ')[1];
    const ipAddress = {'Ip': split};
    console.log(ipAddress)

    return ipAddress;
};
