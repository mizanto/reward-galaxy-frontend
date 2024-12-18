import { errorMessages } from './messages';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Local validation for register form
export const validateRegisterForm = ({ name, familyName, email, password, confirmPassword }) => {
  const errors = [];

  if (!name.trim()) errors.push(errorMessages.requiredName);
  if (!familyName.trim()) errors.push(errorMessages.requiredFamilyName);
  if (!email.trim() || !EMAIL_REGEX.test(email)) errors.push(errorMessages.requiredEmail);
  if (!password || password.length < 6) errors.push(errorMessages.requiredPasswordLocal);
  if (password !== confirmPassword) errors.push(errorMessages.passwordsMismatch);

  return errors;
};

// Local validation for login form
export const validateLoginForm = ({ email, password }) => {
  const errors = [];

  if (!email.trim()) errors.push(errorMessages.requiredEmail);
  if (!password.trim()) errors.push(errorMessages.requiredPasswordCommon);

  return errors;
}

// Local validation for add member form
export const validateAddMemberForm = ({ name, email, password }) => {
  const errors = [];

  if (!name.trim()) errors.push(errorMessages.requiredName);
  if (!email.trim() || !EMAIL_REGEX.test(email)) errors.push(errorMessages.requiredEmail);
  if (!password || password.length < 6) errors.push(errorMessages.requiredPasswordLocal);

  return errors;
}

// Local validation for topup form
export const validateTopupForm = ({ amount, reason }) => {
  const errors = [];

  if (!amount || amount === 0) errors.push(errorMessages.requiredAmount);
  if (!reason.trim()) errors.push(errorMessages.requiredReason);

  return errors;
}

// Local validation for add reward form
export const validateAddRewardForm = ({ name, price, image }) => {
  const errors = [];

  if (!name.trim()) errors.push(errorMessages.requiredName);
  if (!price || price <= 0) errors.push(errorMessages.requiredPrice);

  return errors;
};