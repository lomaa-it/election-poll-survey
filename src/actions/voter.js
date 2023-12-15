import { json } from "react-router-dom";
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
      const jsonData = {
        state_id: 5,
        district_id: 6,
        consistency_id: 3,
        mandal_id: data.mandal?.mandal_pk ?? null,
        division_id: data.division?.division_pk ?? null,
        sachivalayam_id: data.sachivalayam?.sachivalayam_pk ?? null,
        part_no: data.partno?.part_no ?? null,
        village_id: data.village?.village_pk ?? null,
        gender: data.gender?.value ?? null,
        religion_id: data.religion?.value ?? null,
        caste_id: data.caste?.value ?? null,
        disability: data.disability?.value ?? null,
        govt_employee: data.govt_employee?.value ?? null,
        age: data.age?.value ?? null,
      };
      console.log("jsonData", jsonData);

      const response = await instance.post(`${getAllVotorsSurveyRoute}?page=${pageNo + 1}&&limit=${limit}`, jsonData);
      const responseData = response.data;
      console.log("responseData in voter.js", responseData);
      // const itemsList = responseData?.data ?? [];
      const itemsList = responseData?.message?.data ?? [];
      console.log("itemsList", itemsList);

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

export const addVoterTicket = async (id, data, account) => {
  try {
    const jsonData = {
      voter_pk: id,
      navaratnalu_id: data.navaratnalu_id,
      reason: data.reason,
      status_id: 1,
      volunteer_id: account.user.user_pk,
      createdby: account.user.user_pk,
    };

    var result = await instance.post(createTicketRoute, jsonData);
    console.log(result);

    return { status: true, message: result.data.message };
  } catch (err) {
    console.log(err);
    return { status: false, message: err };
  }
};

export const updateReplyVoterTicket = async (id, data, account) => {
  try {
    const jsonData = {
      ticket_master_pk: id,
      navaratnalu_id: data.navaratnalu_id,
      reason: data.reason,
      status_id: data.status_id != "" ? data.status_id : 1,
      ticket_attachment_id: 6,
      volunteer_id: account.user.user_pk,
      createdby: account.user.user_pk,
    };

    console.log(jsonData);

    var result = await instance.post(createTicketHistoryRoute, jsonData);
    console.log(result);

    return { status: true, message: result.data.message };
  } catch (err) {
    console.log(err);
    return { status: false, message: err };
  }
};
