import axiosInstance from "./axiosInstance";
import { endPoints } from "./endpoints";

export const getLlmResponse = async (data: any) => {
  const response = await axiosInstance.post(endPoints.LLM_CALL, data);

  return response;
};

export const respondToHil = async (data: any) => {
  const response = await axiosInstance.post(endPoints.HIL_CALL, data);

  return response;
};

export const login = async (data: any) => {
  const response = await axiosInstance.post(endPoints.LOGIN, data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response;
};

export const getAllConversations = async () => {
    const response = await axiosInstance.get(endPoints.GET_ALL_CONVERSATIONS)

    return response
}

export const getConversationHistory = async (conversationId: any) => {
  const response = await axiosInstance.get(endPoints.GET_CONVERSATION_BY_ID(conversationId))

  return response
}

export const getUserDetails = async () => {
  const response = await axiosInstance.get(endPoints.GET_USER_DETAILS)

  return response
}

export const sendHilResposne = async (data:any) => {
  const response = await axiosInstance.post(endPoints.SEND_HIL, data)

  return response
}

export const signUp = async (data:any) => {
  const response = await axiosInstance.post(endPoints.SIGN_UP, data)

  return response
}
