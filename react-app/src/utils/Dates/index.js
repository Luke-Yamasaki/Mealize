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
    const hoursPassed = Math.floor(milliseconds / 1000 / 60 / 60);
    if(daysPassed >= 1) {
        return daysPassed.toString() + 'd';
    } else if(daysPassed < 1 && hoursPassed >= 1) {
        return hoursPassed.toString() + 'h';
    } else {
        return 'now';
    }
}

// [1] Frbruary will be 29 on leap years
// const monthsAndDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// const determineLeapYears = (year) => {
//     const leapYears = [];
//     const max = year - 90;
//     const min = year - 18;
//     for(let i = min; i < max; i += 4) {
//         leapYears.push(i);
//     }
//     console.log(leapYears)
//     return leapYears;
// }

export const ageBoundary = () => {
    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    const date = new Date().getDate()

    const formattedMonth = month <= 9 ? '0' + (month+1).toString() : (month+1).toString()
    const formattedDate = date <= 9 ? `0${date}` : date.toString();

    const tooOld = (year - 90).toString() + '-' + formattedMonth + '-' + formattedDate;
    const tooYoung = (year - 18).toString() + '-' + formattedMonth + '-' + formattedDate;

    return {'old': tooOld, 'young': tooYoung};
}
