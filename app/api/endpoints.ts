export const endPoints ={
    LLM_CALL: "/llm",
    HIL_CALL: "/hil",
    LOGIN: "/login",
    GET_ALL_CONVERSATIONS: "/users/conversations",
    GET_CONVERSATION_BY_ID: (conversationId:any) => `/user/conversation/${conversationId}`,
    GET_USER_DETAILS: "/user/details",
    SEND_HIL: "/llm/hil",
    SIGN_UP: "/signup"
}