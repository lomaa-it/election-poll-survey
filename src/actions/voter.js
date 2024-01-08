import { LIMIT_PER_PAGE } from "../constants";
import ApiServices from "../services/apiservices";
import { changeOpinionPollRoute, createTicketHistoryRoute, createTicketRoute, getAllNavaratnaluRoute, getAllVotorsSurveyRoute, getVotersListTotals, saveOrupdatedSurvey } from "../utils/apis";

export const clearVoterReducer = () => async (dispatch) => {
  dispatch({
    type: "VOTER_CLEAR_SUCCESS",
  });
};

export const getAllVotersSurvey =
  (data, pageNo = 0, limit = LIMIT_PER_PAGE) =>
  async (dispatch) => {
    dispatch({
      type: "VOTER_LOAD_START",
    });

    try {
      // console.log("jsonData", jsonData);

      const response = await ApiServices.postRequest(`${getAllVotorsSurveyRoute}?page=${pageNo + 1}&&limit=${limit}`, data);
      const responseData = response.data;
      // const itemsList = responseData?.data ?? [];
      const itemsList = responseData?.message?.data ?? [];
      console.log("itemsList", itemsList);
      const cardResponse = await ApiServices.postRequest(getVotersListTotals, data);
      const cardResponseData = cardResponse.data;
      const cardData = cardResponseData?.message?.data[0] ?? [];
      // const cardData = []

      // console.log(cardData);

      dispatch({
        type: "VOTER_LOAD_SUCCESS",
        payload: {
          data: itemsList,
          count: cardData?.voters_count ?? 0,
          completed: cardData?.surveyed_count ?? 0,
          pending: cardData?.not_surveyed_count ?? 0,
          page: pageNo,
          limit: limit,
        },
      });
      // console.log("VOTER_LOAD_SUCCESS", itemsList);
    } catch (err) {
      console.log(err);
      dispatch({
        type: "VOTER_LOAD_ERROR",
        payload: err.message,
      });
    }
  };

export const changeOpinionPoll = (id, value, volunteer_id) => async (dispatch) => {
  try {
    const jsonData = {
      volunteer_id: volunteer_id,
      voter_pk: id,
      intrested_party: value,
    };
    console.log(jsonData);

    await ApiServices.postRequest(changeOpinionPollRoute, jsonData);

    dispatch({
      type: "VOTER_CHANGE_OPINION",
      payload: { id: id, value: value },
    });

    return true;
  } catch (err) {
    console.log(err);

    return false;
  }
};

export const updateVoterDetails = (id, data) => async (dispatch) => {
  try {
    // const jsonData = {
    //   volunteer_id: 1,
    //   voter_pk: id,
    //   ...data,
    // };
    const jsonData = {
      voter_pk: id,
      ...data,
    };
    console.log(jsonData);
    const response = await ApiServices.postRequest(saveOrupdatedSurvey, jsonData);
    const responseData = response.data?.data ?? {};

    console.log(responseData);

    dispatch({
      type: "VOTER_UPDATE_SUCCESS",
      payload: { id: id, value: data },
    });

    if (responseData.religion_id) {
      dispatch({
        type: "COMMON_ADD_RELIGION",
        payload: { label: data.religion_name, value: responseData.religion_id },
      });
    }

    if (responseData.caste_id) {
      dispatch({
        type: "COMMON_ADD_CASTE",
        payload: { label: data.caste_name, value: responseData.caste_id },
      });
    }

    return true;
  } catch (err) {
    console.log(err);

    return false;
  }
};
