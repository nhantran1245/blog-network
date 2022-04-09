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
}
