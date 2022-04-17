import {
  LOAD_USER,
  LOGIN_ERR,
  LOGIN_REQ,
  LOGIN_SUCC,
  LOGOUT_SUCC,
  REGISTER_ERR,
  REGISTER_REQ,
  REGISTER_SUCC,
  SEND_MAIL_ERR,
  SEND_MAIL_REQ,
} from "./types";

import axios from "axios";

export const loadUser = () => async (dispatch, getState) => {
  try {
    let token;
    if (getState().auth && getState().auth.accessToken) {
      token = getState().auth.accessToken;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get("/api/auth/me", config);
    dispatch({
      type: LOAD_USER,
      payload: data,
    });

    localStorage.setItem("pf-user", JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

export const verifyUser = (fn) => async (dispatch, getState) => {
  try {
    let token;
    if (getState().auth && getState().auth.accessToken) {
      token = getState().auth.accessToken;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.post("/api/auth/verified", {}, config);
    // dispatch({
    //   type: LOAD_USER,
    // });
    fn();
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQ,
    });

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/auth/login",
      { email, password },
      options
    );

    dispatch({
      type: LOGIN_SUCC,
      payload: data,
    });

    localStorage.setItem("pf-user", JSON.stringify(data.user));
    localStorage.setItem("pf-token", JSON.stringify(data.accessToken));
  } catch (err) {
    dispatch({
      type: LOGIN_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
    //   setTimeout(() => {
    //     dispatch({
    //       type: REMOVE_NOTIF,
    //     });
    //   }, 2000);
  }
};

export const userLogout = () => async (dispatch) => {
  localStorage.removeItem("pf-user");
  dispatch({
    type: LOGOUT_SUCC,
  });
  // dispatch({
  //   type: RESET,
  // });
};

export const registerUser =
  (name, email, password, college, github, linkedIn) => async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_REQ,
      });

      const options = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/auth/signUp",
        { email, password, name, college, github, linkedIn },
        options
      );

      dispatch({
        type: REGISTER_SUCC,
        payload: data,
      });

      localStorage.setItem("pf-user", JSON.stringify(data.user));
      localStorage.setItem("pf-token", JSON.stringify(data.accessToken));
    } catch (err) {
      dispatch({
        type: REGISTER_ERR,
        payload:
          err.response && err.response.data.msg
            ? err.response.data.msg
            : err.message,
      });

      //   setTimeout(() => {
      //     dispatch({
      //       type: REMOVE_NOTIF,
      //     });
      //   }, 2000);
    }
  };

export const verifyMail = (email) => async (dispatch) => {
  try {
    dispatch({
      type: SEND_MAIL_REQ,
    });

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/auth/verifyEmail",
      { email },
      options
    );

    dispatch({
      type: REGISTER_SUCC,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: SEND_MAIL_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};

//   export const updateUser = (user) => async (dispatch, getState) => {
//     try {
//       dispatch({
//         type: UPDATE_USER_REQ,
//       });

//       let token;
//       if (getState().auth && getState().auth.user && getState().auth.user.token) {
//         token = getState().auth.user.token;
//       }

//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       const { data } = await axios.put("/api/user", user, config);

//       dispatch({
//         type: UPDATE_USER_SUCC,
//         payload: data,
//       });

//       localStorage.setItem("user", JSON.stringify(data));

//       setTimeout(() => {
//         dispatch({
//           type: REMOVE_NOTIF,
//         });
//       }, 2000);
//     } catch (err) {
//       dispatch({
//         type: UPDATE_USER_ERR,
//         payload:
//           err.response && err.response.data.msg
//             ? err.response.data.msg
//             : err.message,
//       });

//       setTimeout(() => {
//         dispatch({
//           type: REMOVE_NOTIF,
//         });
//       }, 2000);
//     }
//   };
