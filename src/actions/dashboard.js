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
    const response = await instance.post(getOpinionDashboardRoute, data);
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
    const response = await instance.post(getOpinionResultRoute, data);
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
