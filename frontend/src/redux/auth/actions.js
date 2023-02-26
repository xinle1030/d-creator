import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "./constants";

export const signin = (userData) => async (dispatch) => {
  console.log("BE: sign in")

  let data = {
    username: userData.username,
    password: userData.password,
  }

  try {

    dispatch({ type: USER_LOGIN_REQUEST });

    const response = await fetch(
      process.env.REACT_APP_API_URL + '/api/auth/signin',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );
    const user = await response.json();

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(user));

  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  console.log("BE: logout")
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const signup = (userData) => async (dispatch) => {
  console.log("BE: sign up")
  console.log(userData)
    let data = 
  {
    "username": userData.username,
    "name": userData.name,
    "email": userData.email,
    "password": userData.password,
    "role": userData.role,
    "walletAdrHash": userData.walletAdrHash
  }

  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const response = await fetch(
      process.env.REACT_APP_API_URL + '/api/auth/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );
    const user = await response.json();

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(user));
    
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
