// Errorr messages
const errorMessages = {
  requiredName: "Имя обязательно для заполнения",
  requiredFamilyName: "Название семьи обязательно для заполнения",
  requiredEmail: "Введите корректный email",
  requiredPassword: "Пароль должен содержать не менее 6 символов",
  passwordsMismatch: "Пароли не совпадают",
  emailExists: "Этот email уже зарегистрирован.",
  unknownError: "Произошла неизвестная ошибка. Попробуйте снова.",
};

// Local validation for register form
export const validateRegisterForm = ({ name, familyName, email, password, confirmPassword }) => {
  const errors = [];

  if (!name.trim()) errors.push(errorMessages.requiredName);
  if (!familyName.trim()) errors.push(errorMessages.requiredFamilyName);
  if (!email.trim()) errors.push(errorMessages.requiredEmail);
  if (!password || password.length < 6) errors.push(errorMessages.requiredPassword);
  if (password !== confirmPassword) errors.push(errorMessages.passwordsMismatch);

  return errors;
};

// Parsing error messages from the backend
export const parseError = (error) => {
  const statusCode = error?.response?.status;
  const detail = error?.response?.data?.detail;

  if (statusCode === 400) {
    return [errorMessages.emailExists];
  }

  if (statusCode === 422 && Array.isArray(detail)) {
    const fieldMessages = {
      email: errorMessages.requiredEmail,
      name: errorMessages.requiredName,
      family_name: errorMessages.requiredFamilyName,
      password: errorMessages.requiredPassword,
    };

    return detail.map((err) => {
      const field = err.loc[1];
      return fieldMessages[field] || "Некорректное значение";
    });
  }

  return [errorMessages.unknownError];
};
