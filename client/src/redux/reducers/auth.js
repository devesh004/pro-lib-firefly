import {
  LOAD_USER,
  LOGIN_ERR,
  LOGIN_REQ,
  LOGIN_SUCC,
  LOGOUT_SUCC,
  REGISTER_ERR,
  REGISTER_REQ,
  REGISTER_SUCC,
} from "../action/types";

const inititalState = { loading: true, success: false };

export const authReducer = (state = inititalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_REQ:
    case LOGIN_REQ:
      return {
        loading: true,
      };
    case REGISTER_SUCC:
    case LOGIN_SUCC:
      return {
        loading: false,
        user: payload.user,
        accessToken: payload.accessToken,
      };
    case REGISTER_ERR:
    case LOGIN_ERR:
      return {
        loading: false,
        error: payload,
      };
    case LOAD_USER:
      return {
        ...state,
        user: payload,
      };
    case LOGOUT_SUCC:
      return {
        loading: false,
      };
    //   case UPDATE_USER_REQ:
    //     return {
    //       ...state,
    //       uploading: true,
    //       success: false,
    //     };
    //   case UPDATE_USER_ERR:
    //     return {
    //       ...state,
    //       error: payload,

    //       uploading: false,
    //       success: false,
    //     };
    //   case UPDATE_USER_SUCC:
    //     return {
    //       ...state,
    //       user: payload,
    //       success: true,
    //       uploading: false,
    //     };
    //   case REMOVE_NOTIF:
    //     return {
    //       ...state,
    //       error: null,
    //       success: false,
    //     };
    default:
      return state;
  }
};
