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
    const jsonData = {
      state_id: 5,
      district_id: 6,
      consistency_id: 3,
      mandal_id: data.mandal?.mandal_pk,
      division_id: data.division?.division_pk,
      sachivalayam_id: data.sachivalayam?.sachivalayam_pk,
      part_no: data.partno?.part_no,
      village_id: data.village?.village_pk,
    };

    const response = await instance.post(getAllUsersRoute, jsonData);
    const responseData = response.data?.message ?? [];

    // console.log(responseData);

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
