import { errorMessages } from "./messages";

export const parseApiError = (error, errorMap) => {
  const statusCode = error?.response?.status;
  const detail = error?.response?.data?.detail;

  if (statusCode && errorMap[statusCode]) {
    const { commonMessage, fieldMessages } = errorMap[statusCode];

    if (Array.isArray(detail) && fieldMessages) {
      return detail.map((err) => {
        const field = err.loc[1];
        return fieldMessages[field] || "Некорректное значение";
      });
    }
    return [commonMessage];
  }
  return [errorMessages.unknownError];
};

export const parseRegisterError = (error) => {
  const registerErrorMap = {
    400: {
      commonMessage: errorMessages.emailExists,
    },
    422: {
      fieldMessages: {
        email: errorMessages.requiredEmail,
        name: errorMessages.requiredName,
        family_name: errorMessages.requiredFamilyName,
        password: errorMessages.requiredPasswordCommon,
      },
    },
  };
  return parseApiError(error, registerErrorMap);
};

export const parseLoginError = (error) => {
  const loginErrorMap = {
    400: {
      commonMessage: errorMessages.imcorrectEmailOrPassword,
    },
    422: {
      fieldMessages: {
        email: errorMessages.requiredEmail,
        password: errorMessages.requiredPasswordCommon,
      },
    },
  };
  return parseApiError(error, loginErrorMap);
};

export const parseUserData = (userData) => {
  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
    balance: userData.balance || 0,
    familyId: userData.family_id,
    familyName: userData.family_name,
  };
};