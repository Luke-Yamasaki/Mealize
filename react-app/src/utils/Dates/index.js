export const determineExpiration = (expDate) => {
    const today = new Date();
    const expiration = new Date(expDate)
    //milliseconds to minutes to hours
    const hoursLeft = Math.floor((expiration - today) / 1000 / 60 / 60);
    return hoursLeft
};

export const daysAgo = (post) => {
    const today = new Date();
    const postDate = new Date(post.updatedAt);
    const milliseconds = today - postDate;
    const daysPassed = Math.floor(milliseconds / 1000 / 60 / 60 / 24);
    console.log(daysPassed)
    const hoursPassed = Math.floor(milliseconds / 1000 / 60 / 60);
    console.log(hoursPassed)
    if(daysPassed >= 1) {
        return daysPassed.toString() + 'd';
    } else if(daysPassed < 1 && hoursPassed >= 1) {
        return hoursPassed.toString() + 'h';
    } else {
        return 'now';
    }
}
