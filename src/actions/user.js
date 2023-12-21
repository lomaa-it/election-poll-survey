import { getAllUsersRoute } from "../utils/apis";
import instance from "../utils/axios";

export const clearUserReducer = () => async (dispatch) => {
  dispatch({
    type: "USER_CLEAR_SUCCESS",
  });
};

export const getAllUsers = (data) => async (dispatch) => {
  dispatch({
    type: "USER_LOAD_START",
  });

  try {
    const response = await instance.post(getAllUsersRoute, data);
    const responseData = response.data?.message ?? [];

    dispatch({
      type: "USER_LOAD_SUCCESS",
      payload: responseData,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "USER_LOAD_ERROR",
      payload: err.message,
    });
  }
};

export const checkOrUncheckUser = (id, value) => async (dispatch) => {
  dispatch({
    type: "USER_CHECK_CHANGE",
    payload: { id: id, value: value },
  });
};

export const deleteUserInRedux = (id, user) => async (dispatch) => {
  console.log("data", user);
  const newData = user.data.filter((item) => {
    return item.user_pk !== id;
  });
  console.log(newData);
  console.log("id", id);
  dispatch({
    type: "USER_LOAD_SUCCESS",
    payload: newData,
  });
};
