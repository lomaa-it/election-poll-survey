import { LIMIT_PER_PAGE } from "../constants";
import { changeOpinionPollRoute, createTicketHistoryRoute, createTicketRoute, getAllNavaratnaluRoute, getAllVotorsSurveyRoute, saveOrupdatedSurvey } from "../utils/apis";
import instance from "../utils/axios";

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

      const response = await instance.post(`${getAllVotorsSurveyRoute}?page=${pageNo + 1}&&limit=${limit}`, data);
      const responseData = response.data;
      // const itemsList = responseData?.data ?? [];
      const itemsList = responseData?.message?.data ?? [];
      // console.log("itemsList", itemsList);

      dispatch({
        type: "VOTER_LOAD_SUCCESS",
        payload: {
          data: itemsList,
          count: responseData.message.count,
          completed: responseData.message.completed,
          pending: responseData.message.pending,
          page: pageNo,
          limit: limit,
        },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: "VOTER_LOAD_ERROR",
        payload: err.message,
      });
    }
  };

export const changeOpinionPoll = (id, value) => async (dispatch) => {
  try {
    const jsonData = {
      volunteer_id: 1,
      voter_pk: id,
      intrested_party: value,
    };
    console.log(jsonData);

    await instance.post(changeOpinionPollRoute, jsonData);

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
    const jsonData = {
      volunteer_id: 1,
      voter_pk: id,
      ...data,
    };
    console.log(jsonData);
    await instance.post(saveOrupdatedSurvey, jsonData);

    dispatch({
      type: "VOTER_UPDATE_SUCCESS",
      payload: { id: id, value: data },
    });

    return true;
  } catch (err) {
    console.log(err);

    return false;
  }
};
