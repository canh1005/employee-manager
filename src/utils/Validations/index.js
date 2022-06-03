export const checkEmpty = (input) => {
  if (input === "") {
    return "Can not be empty";
  }
  return "";
};
export const checkAge = (age) => {
  if (age < 18) {
    return "Age must be over 17";
  }
  return "";
};
export const checkPhoneNumber = (phone) => {
  if (phone.toString().length < 10) {
    return "Phone number can not be less than 10 number";
  }
  return "";
};
export const checkIsNumber = (input) => {
  if (isNaN(input)) {
    return "Must be number";
  }
  return "";
};
export const checkMoney = (money) => {
  if (money < 1) {
    return "Money must be over 0";
  }
  return "";
};
