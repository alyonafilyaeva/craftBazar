export const baseURL = 'http://192.168.0.44:3000';

let months = {
    1: "января",
    2: "февраля",
    3: "марта",
    4: "апреля",
    5: "мая",
    6: "июня",
    7: "июля",
    8: "августа",
    9: "сентября",
    10: "октября",
    11: "ноября",
    12: "декабря",
  };
  
  export function toDate(date = "2024-01-01") {
    let [year, month, day] = date.split("-");
    let today = new Date().toISOString().slice(0, 10);
    let newDate;
    date == today
      ? (newDate = "Сегодня")
      : (newDate = `${day} ${months[month.replace(/^0+/, "")]}`);
    return newDate;
  }
