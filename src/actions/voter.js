import { LIMIT_PER_PAGE } from "../constants";
import { changeOpinionPollRoute, getAllNavaratnaluRoute, getAllVotorsSurveyRoute, saveOrupdatedSurvey } from "../utils/apis";
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
      const jsonData = {
        state_id: 5,
        district_id: 6,
        consistency_id: 3,
        mandal_id: data.mandal?.mandal_pk ?? null,
        division_id: data.division?.division_pk ?? null,
        sachivalayam_id: data.sachivalayam?.sachivalayam_pk ?? null,
        part_no: data.partno?.part_no ?? null,
        village_id: data.village?.village_pk ?? null,
      };

      const response = await instance.post(`${getAllVotorsSurveyRoute}?page=${pageNo + 1}&&limit=${limit}`, jsonData);
      const responseData = response.data;
      console.log(responseData);

      const itemsList = responseData?.data ?? [];

      dispatch({
        type: "VOTER_LOAD_SUCCESS",
        payload: { data: itemsList, count: responseData.count, completed: responseData.completed, pending: responseData.pending, page: pageNo, limit: limit },
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

export const addVoterTicket = async (id, data) => {
  try {
    const jsonData = {
      volunteer_id: 11,
      voter_pk: id,
      navaratnalu_id: data.navaratnalu_id,
      reason: data.reason,
    };

    await instance.post(changeOpinionPollRoute, jsonData);

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
