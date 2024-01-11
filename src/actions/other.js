import ApiServices from "../services/apiservices";
import { getPermissionListRoute, updatePermissionListRoute } from "../utils/apis";

export const clearOtherReducer = () => async (dispatch) => {
  dispatch({
    type: "OTHER_CLEAR_SUCCESS",
  });
};

export const getAllAccessPermissions = (id) => async (dispatch) => {
  dispatch({
    type: "OTHER_LOAD_START",
  });

  try {
    const response = await ApiServices.postRequest(`${getPermissionListRoute}/${id}`);
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

export const updateAccessPermission = (name, value, jsonData) => async (dispatch) => {
  // var data = { ...jsonData, [name]: value ? 1 : 0 };
  // var updatedData = { [`${name}_${data.design_id}`]: value ? 1 : 0 };
  // dispatch({
  //   type: "OTHER_UPDATE_ACCESS",
  //   payload: { data, updatedData },
  // });

  var data = { ...jsonData, [name]: value ? 1 : 0 };
  var updatedData = { [`${name}`]: value ? 1 : 0 };
  dispatch({
    type: "OTHER_UPDATE_ACCESS",
    payload: { data, updatedData },
  });
};

export const saveAccessPermission = async (data) => {
  try {
    await ApiServices.postRequest(updatePermissionListRoute, { message: data });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
