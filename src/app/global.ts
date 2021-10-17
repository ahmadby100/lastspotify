import { environment } from "src/environments/environment";

// Variables
export let gOffset = 1;
export let offset: number = 1;
export let period: string = "week";
export const ROOT_URL: string = "https://us-central1-bluetables-81eca.cloudfunctions.net/app";

// Arrays
const monthNames: Array<string> = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Functions
export const getDate = (date: string): string => {
    let day = parseInt(date.substr(8));
    let month = monthNames[parseInt(date.substr(5, 2)) - 2];
    let year = date.substr(0, 4);
    return `${day} ${month} ${year}`;
}

export const logger = (loc: string, log: string, color: string): void => {
  // console.log(logger.caller);
  let css = `color: ${color}`;
  if (!environment.production) console.log(`%c${loc}: ${log}`, css);
}
