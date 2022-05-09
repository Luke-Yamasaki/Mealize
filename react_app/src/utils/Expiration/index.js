export const determineExpiration = (expDate) => {
    const today = new Date();
    const expiration = new Date(expDate)
    //milliseconds to minutes to hours
    const hoursLeft = Math.floor((expiration - today) / 1000 / 60 / 60);
    return hoursLeft
};
