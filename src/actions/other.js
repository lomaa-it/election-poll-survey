import ApiServices from "../services/apiservices";
import { getPermissionListRoute } from "../utils/apis";

export const clearOtherReducer = () => async (dispatch) => {
  dispatch({
    type: "OTHER_CLEAR_SUCCESS",
  });
};

export const getAllAcessPermissions = () => async (dispatch) => {
  dispatch({
    type: "OTHER_LOAD_START",
  });

  try {
    const response = await ApiServices.postRequest(getPermissionListRoute);
    const responseData = response.data?.message ?? [];

    dispatch({
      type: "OTHER_LOAD_SUCCESS",
      payload: responseData,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "OTHER_LOAD_ERROR",
      payload: err.message,
    });
  }
};
