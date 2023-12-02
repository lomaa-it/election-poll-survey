const initialState = {
  isLoading: false,
  data: [],
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
        errorMessage: null,
      };

    case "VOTER_LOAD_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: payload,
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

    case "VOTER_CLEAR_SUCCESS":
      return {
        isLoading: false,
        data: [],
        errorMessage: null,
      };

    default:
      return state;
  }
}
