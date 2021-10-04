// Variables
export let gOffset = 1;
export const ROOT_URL = "https://us-central1-bluetables-81eca.cloudfunctions.net/app";

// Arrays
const monthNames = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Functions
export const getDate = (date: string) => {
    let day = parseInt(date.substr(8));
    let month = monthNames[parseInt(date.substr(5, 2)) - 1];
    let year = date.substr(0, 4);
    return `${day} ${month} ${year}`;
}