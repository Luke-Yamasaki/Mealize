const year = new Date().getFullYear()
const month = new Date().getMonth()
const date = new Date().getDate()

const formattedMonth = month <= 9 ? '0' + (month+1).toString() : (month+1).toString()
const formattedDate = date <= 9 ? `0${date}` : date.toString();
const today = (year-90).toString() + '-' + formattedMonth + '-' + formattedDate

console.log(today)
