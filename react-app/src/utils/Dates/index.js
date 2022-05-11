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

// [1] Frbruary will be 29 on leap years
const monthsAndDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const determineLeapYears = (year) => {
    const leapYears = [];
    const max = year - 90;
    const min = year - 18;
    for(let i = min; i < max; i += 4) {
        leapYears.push(i);
    }
    console.log(leapYears)
    return leapYears;
}

export const ageBoundary = () => {
    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    const date = new Date().getDate()

    let minMonth;
    let yesterday = date - 1;

    if(yesterday === 0) {
        minMonth = month - 1;
        if(minMonth === -1) {
            minMonth = 11;
        }
        if(minMonth === 1) {
            const leapYears = determineLeapYears(year);
            yesterday = leapYears.includes(year) ? 29 : 28;
        } else {
            yesterday = monthsAndDays[minMonth]
        }
    } else {
        minMonth = month;
    }

    const formattedMaxMonth = month <= 9 ? '0' + (month+1).toString() : (month+1).toString()
    const formattedMaxDate = date <= 9 ? `0${date}` : date.toString();

    const formattedMinMonth =minMonth <= 9 ? '0' + (minMonth+1).toString() : (minMonth+1).toString()
    const formattedMinDate = yesterday <= 0 ? `0${yesterday}` : yesterday.toString();

    const tooOld = (year - 90).toString() + '-' + formattedMaxMonth + '-' + formattedMaxDate;
    const tooYoung = (year - 18).toString() + '-' + formattedMinMonth + '-' + formattedMinDate;

    return {'old': tooOld, 'young': tooYoung};
}
