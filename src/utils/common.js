import { LOCAL_BASE_URL, MONTH_TEXT } from "./constants";

export const validateName = (value) => {
  const regex = /^[a-zA-Z][a-zA-Z]+$/;
  return regex.test(value);
};

export const validateUserName = (value) => {
  const regex = /^[a-zA-Z][a-zA-Z0-9]+$/;
  return regex.test(value);
};

export const validatePassword = (value) => {
  const regex = /^[a-zA-Z0-9!@#$%^&*]+$/;
  return regex.test(value);
};

export const validateFullName = (value) => {
  const regex = /^[a-zA-Z][a-zA-Z\s]+$/;
  return regex.test(value);
};

export const validatePhone = (value) => {
  const regex = /[0-9]{11}/;
  return regex.test(value);
};

export const getImgUrlFromServer = (value) => {
  return LOCAL_BASE_URL + value.replace("\\", "/");
};

export const getDateText = (value) => {
  const date = new Date(value);
  return `${date.getDate().toString()} ${MONTH_TEXT[date.getMonth() + 1]} ${date
    .getFullYear()
    .toString()}`;
};

export const getPhoneText = (value) => {
  const prefix = `+${value[0].toString() + value[1].toString()}`;
  let postfix = "";
  for (let i = 2; i < value.length; i++) {
    if (i % 3 === 2) {
      postfix += " " + value[i].toString();
    } else {
      postfix += value[i].toString()
    }
  }
  return prefix + postfix;
};
