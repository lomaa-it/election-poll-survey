import { LIMIT_PER_PAGE } from "../constants";

const initialState = {
  isLoading: false,
  data: [],
  count: 0,
  completed: 0,
  pending: 0,
  page: 0,
  limit: LIMIT_PER_PAGE,
  errorMessage: null,
};

export default function voterReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "VOTER_LOAD_START":
      return {
        ...state,
        isLoading: true,
        data: [],
        count: 0,
        completed: 0,
        pending: 0,
        page: 0,
        limit: LIMIT_PER_PAGE,
        errorMessage: null,
      };

    case "VOTER_LOAD_SUCCESS":
      return {
        ...state,
        isLoading: false,
        ...payload,
      };

    case "VOTER_LOAD_ERROR":
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };

    case "VOTER_CHANGE_OPINION":
      var index = state.data.findIndex((e) => e.voter_pkk == payload.id);
      if (index != -1) {
        state.data[index].intrested_party = payload.value;
      }
      return { ...state };

    case "VOTER_UPDATE_SUCCESS":
      var index = state.data.findIndex((e) => e.voter_pkk == payload.id);
      if (index != -1) {
        state.data[index] = { ...state.data[index], ...payload.value };
      }
      return { ...state };

    case "VOTER_CLEAR_SUCCESS":
      return {
        isLoading: false,
        data: [],
        count: 0,
        completed: 0,
        pending: 0,
        page: 0,
        limit: LIMIT_PER_PAGE,
        errorMessage: null,
      };

    default:
      return state;
  }
}
