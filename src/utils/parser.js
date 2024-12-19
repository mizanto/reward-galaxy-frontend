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

export const parseAddMemberError = (error) => {
  const addMemberErrorMap = {
    400: {
      commonMessage: errorMessages.emailExists,
    },
    403: {
      commonMessage: errorMessages.noPermissionAddMember,
    },
    404: {
      commonMessage: errorMessages.familyNotFound,
    },
    422: {
      fieldMessages: {
        email: errorMessages.requiredEmail,
        name: errorMessages.requiredName,
        password: errorMessages.requiredPasswordCommon,
      },
    },
  };
  return parseApiError(error, addMemberErrorMap);
};

export const parseDeleteMemberError = (error) => {
  const deleteMemberErrorMap = {
    400: {
      commonMessage: errorMessages.otherFamilyMember,
    },
    403: {
      commonMessage: errorMessages.onlyParentCanDelete,
    },
    404: {
      commonMessage: errorMessages.memberNotFound,
    },
  };
  return parseApiError(error, deleteMemberErrorMap);
};

export const parseTopupError = (error) => {
  const topupErrorMap = {
    400: {
      commonMessage: errorMessages.negativeBalance,
    },
    403: {
      commonMessage: errorMessages.wrongReceiver,
    },
    404: {
      commonMessage: errorMessages.receiverNotFound,
    },
    422: {
      fieldMessages: {
        amount: errorMessages.requiredAmount,
        reason: errorMessages.requiredReason,
      },
    },
  };
  return parseApiError(error, topupErrorMap);
};

export const parseAddRewardError = (error) => {
  const rewardErrorMap = {
    403: {
      commonMessage: errorMessages.onlyParentCanAddReward,
    },
    422: {
      fieldMessages: {
        name: errorMessages.requiredName,
        price: errorMessages.requiredPrice,
      },
    },
  };
  return parseApiError(error, rewardErrorMap);
};

export const parseDeleteRewardError = (error) => {
  const deleteRewardErrorMap = {
    403: {
      commonMessage: errorMessages.onlyParentCanDeleteReward,
    },
    404: {
      commonMessage: errorMessages.rewardNotFound,
    },
  };
  return parseApiError(error, deleteRewardErrorMap);
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

export const parseNewMemberData = (newMemberData) => {
  console.log('newMemberData', newMemberData);
  return {
    id: newMemberData.id,
    name: newMemberData.name,
    email: newMemberData.email,
    role: newMemberData.role,
    balance: newMemberData.balance || 0,
    familyId: newMemberData.family_id,
    familyName: newMemberData.family_name,
  };
};

export const parseRewardData = (rewardData) => {
  return {
    id: rewardData.id,
    name: rewardData.name,
    price: rewardData.price,
    image: rewardData.image_url,
    purchasedBy: rewardData.owner_id,
  };
};