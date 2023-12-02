import instance from "../utils/axios";
import { getOpinionDashboardRoute, getOpinionResultRoute } from "../utils/apis";

export const clearDashboardReducer = () => async (dispatch) => {
  dispatch({
    type: "DASHBOARD_CLEAR_SUCCESS",
  });
};

export const getOpinionDashboard = (data) => async (dispatch) => {
  dispatch({
    type: "DASHBOARD_LOAD_START",
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

    const response = await instance.post(getOpinionDashboardRoute, jsonData);
    const responseData = response.data?.message ?? [];

    console.log(responseData);

    dispatch({
      type: "OPINION_DB_LOAD_SUCCESS",
      payload: responseData,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "DASHBOARD_LOAD_ERROR",
      payload: err.message,
    });
  }
};

export const getOpinionResults = (data) => async (dispatch) => {
  dispatch({
    type: "DASHBOARD_LOAD_START",
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

    const response = await instance.post(getOpinionResultRoute, jsonData);
    const responseData = response.data?.message ?? [];

    console.log(responseData);

    dispatch({
      type: "OPINION_RESULTS_LOAD_SUCCESS",
      payload: responseData,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "DASHBOARD_LOAD_ERROR",
      payload: err.message,
    });
  }
};
