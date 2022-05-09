export const getHour = (someDate) => {
    const hour = new Date(someDate)
    return hour.getHours();
}

export const getDay = (someDate) => {
    // Only accepts strings
    const day = someDate.slice(5, 7);
    return day
};

export const getMonth = (someDate) => {
    // Only accepts strings
    const month = someDate.slice(8, 11);
    return month
};

export const getYear = (someDate) => {
    // Only accepts strings
    const year = someDate.slice(12, 16);
    return year
};

export const formatDateString = (someDate) => {
    console.log(someDate)
    // Only accepts strings
    const formattedDate = getMonth(someDate) + '/' + getDay(someDate) +  '/' + getYear(someDate);
    return formattedDate
};

export const determineExpiration = (expDate) => {
    const today = new Date();
    const expiration = new Date(expDate)
    //milliseconds to minutes to hours
    const hoursLeft = Math.floor((expiration - today) / 1000 / 60 / 60);
    return hoursLeft
};
