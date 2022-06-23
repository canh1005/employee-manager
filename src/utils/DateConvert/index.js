import moment from "moment";

export const convertDate = (date) => {
    let letters = date.split("T");
    let dateConverted = letters[0];
    console.log(dateConverted);
    dateConverted = moment(dateConverted).format("DD/MM/YYYY");
    return dateConverted;
}