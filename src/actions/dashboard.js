import {
  getDashBoardbyCasteCount,
  getDashBoardbyDisabilityCount,
  getDashBoardbyGenderCount,
  getDashBoardbyGovtEmployeeCount,
  getDashBoardbyReligionCount,
  getDashBoardbyResidentialStatus,
  getDashBoardbyStatusCount,
  getDashBoardbyTicketStatus,
  getDashBoardbyTicketbarChart,
  getDashBoardbyTotalVoters,
  getDashBoardbyVoterPulse,
  getDashBoardbyageGroup,
  getOpinionDashboardRoute,
  getOpinionResultRoute,
} from "../utils/apis";
import ApiServices from "../services/apiservices";

export const clearDashboardReducer = () => async (dispatch) => {
  dispatch({
    type: "DASHBOARD_CLEAR_SUCCESS",
  });
};

export const getOpinionDashboard = (data) => async (dispatch, getState) => {
  dispatch({
    type: "DASHBOARD_LOAD_START",
  });

  const apiCalls = [
    ApiServices.postRequest(getDashBoardbyTotalVoters, data),
    ApiServices.postRequest(getDashBoardbyGenderCount, data),
    ApiServices.postRequest(getDashBoardbyStatusCount, data),
    ApiServices.postRequest(getDashBoardbyVoterPulse, data),
    ApiServices.postRequest(getDashBoardbyTicketStatus, data),
    ApiServices.postRequest(getDashBoardbyCasteCount, data),
    ApiServices.postRequest(getDashBoardbyReligionCount, data),
    ApiServices.postRequest(getDashBoardbyDisabilityCount, data),
    ApiServices.postRequest(getDashBoardbyGovtEmployeeCount, data),
    ApiServices.postRequest(getDashBoardbyResidentialStatus, data),
    ApiServices.postRequest(getDashBoardbyageGroup, data),
    ApiServices.postRequest(getDashBoardbyTicketbarChart, data),
    // ApiServices.postRequest(apiUrl2, data),
    // ... add more API calls as needed
  ];

  Promise.allSettled(apiCalls).then((results) => {
    results.forEach((result, index) => {
      try {
        if (result.status === "fulfilled") {
          const responseData = result.value.data?.message ?? [];
          console.log(`Response from API ${index + 1}:`, responseData);
          if (responseData.name === "total_voters") {
            // access previous state here
            const previousState = getState();
            console.log("Previous state:", previousState.dashboard);
            const { name, ...rest } = responseData;

            dispatch({
              type: `OPINION_DB_LOAD_SUCCESS`,
              payload: {
                ...previousState.dashboard.opinion,
                ...rest,
              },
            });
          }
          if (responseData.name === "gender") {
            const previousState = getState();
            console.log("Previous state:", previousState.dashboard);
            const { name, ...rest } = responseData;
            let result = {};

            for (let i = 0; i < rest.gender.length; i++) {
              console.log("rest[i]", rest.gender[i], i);
              // add the reset.gender[i] to result

              result = {
                ...result,
                ...rest.gender[i],
              };
            }

            dispatch({
              type: `OPINION_DB_LOAD_SUCCESS`,
              payload: {
                ...previousState.dashboard.opinion,
                gender: result,
              },
            });
          }
          if (responseData.name === "survey_status") {
            const previousState = getState();
            console.log("Previous state:", previousState.dashboard);
            const { name, ...rest } = responseData;

            dispatch({
              type: `OPINION_DB_LOAD_SUCCESS`,
              payload: {
                ...previousState.dashboard.opinion,
                ...rest,
              },
            });
          }
          if (responseData.name === "voter_pulse") {
            const previousState = getState();
            console.log("Previous state:", previousState.dashboard);
            const { name, ...rest } = responseData;

            dispatch({
              type: `OPINION_DB_LOAD_SUCCESS`,
              payload: {
                ...previousState.dashboard.opinion,
                ...rest,
              },
            });
          }
          if (responseData.name === "ticket_status") {
            const previousState = getState();
            console.log("Previous state:", previousState.dashboard);
            const { name, ...rest } = responseData;

            dispatch({
              type: `OPINION_DB_LOAD_SUCCESS`,
              payload: {
                ...previousState.dashboard.opinion,
                ...rest,
              },
            });
          }
          if (responseData.name === "caste_wise") {
            const previousState = getState();
            console.log("Previous state:", previousState.dashboard);
            const { name, ...rest } = responseData;

            dispatch({
              type: `OPINION_DB_LOAD_SUCCESS`,
              payload: {
                ...previousState.dashboard.opinion,
                ...rest,
              },
            });
          }
          if (responseData.name === "religion_wise") {
            const previousState = getState();
            console.log("Previous state:", previousState.dashboard);
            const { name, ...rest } = responseData;

            dispatch({
              type: `OPINION_DB_LOAD_SUCCESS`,
              payload: {
                ...previousState.dashboard.opinion,
                ...rest,
              },
            });
          }
          if (responseData.name === "disability_status") {
            const previousState = getState();
            console.log("Previous state:", previousState.dashboard);
            const { name, ...rest } = responseData;

            dispatch({
              type: `OPINION_DB_LOAD_SUCCESS`,
              payload: {
                ...previousState.dashboard.opinion,
                ...rest,
              },
            });
          }
          if (responseData.name === "govt_employee_status") {
            const previousState = getState();
            console.log("Previous state:", previousState.dashboard);
            const { name, ...rest } = responseData;

            dispatch({
              type: `OPINION_DB_LOAD_SUCCESS`,
              payload: {
                ...previousState.dashboard.opinion,
                ...rest,
              },
            });
          }
          if (responseData.name === "residential_status") {
            const previousState = getState();
            console.log("Previous state:", previousState.dashboard);
            const { name, ...rest } = responseData;
            console.log("residential_status", rest);
            dispatch({
              type: `OPINION_DB_LOAD_SUCCESS`,
              payload: {
                ...previousState.dashboard.opinion,
                ...rest,
              },
            });
          }
          if (responseData.name === "age_wise") {
            const previousState = getState();
            console.log("Previous state:", previousState.dashboard);
            const { name, ...rest } = responseData;
            console.log("age_wise", rest);
            dispatch({
              type: `OPINION_DB_LOAD_SUCCESS`,
              payload: {
                ...previousState.dashboard.opinion,
                ...rest,
              },
            });
          }
          if (responseData.name === "ticket_status_by_mandal") {
            const previousState = getState();
            console.log("Previous state:", previousState.dashboard);
            const { name, ...rest } = responseData;
            console.log("ticket_status_bar_chart", rest);
            dispatch({
              type: `OPINION_DB_LOAD_SUCCESS`,
              payload: {
                ...previousState.dashboard.opinion,
                ...rest,
              },
            });
          }
        } else {
          console.error(`API${index + 1} failed with`, result.reason);
        }
      } catch (error) {
        console.error(`Error processing result from API ${index + 1}:`, error);
      }
    });
  });

  // try {
  //   const response = await ApiServices.postRequest(getOpinionDashboardRoute, data);
  //   const responseData = response.data?.message ?? [];

  //   console.log(responseData);

  //   dispatch({
  //     type: "OPINION_DB_LOAD_SUCCESS",
  //     payload: responseData,
  //   });
  // } catch (err) {
  //   console.log(err);
  //   dispatch({
  //     type: "DASHBOARD_LOAD_ERROR",
  //     payload: err.message,
  //   });
  // }
};

export const getOpinionResults = (data) => async (dispatch) => {
  dispatch({
    type: "DASHBOARD_LOAD_START",
  });

  try {
    const response = await ApiServices.postRequest(getOpinionResultRoute, data);
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
