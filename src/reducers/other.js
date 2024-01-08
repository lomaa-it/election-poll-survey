const initialState = {
  isLoading: false,
  data: [],
  changes: [],
  errorMessage: null,
};

export default function otherReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "OTHER_LOAD_START":
      return {
        ...state,
        isLoading: true,
        data: [],
        changes: [],
        errorMessage: null,
      };

    case "OTHER_LOAD_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: payload,
      };

    case "OTHER_LOAD_ERROR":
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };

    case "OTHER_UPDATE_ACCESS":
      var index = state.data.findIndex((e) => e.page_id == payload.data.page_id);
      if (index != -1) {
        state.data[index] = { ...state.data[index], ...payload.updatedData };
      }

      var changeIndex = state.changes.findIndex((e) => e.page_id == payload.data.page_id && e.design_id == payload.data.design_id);
      if (changeIndex != -1) {
        state.changes[changeIndex] = payload.data;
      } else {
        state.changes.push(payload.data);
      }

      return { ...state };

    case "USER_CLEAR_SUCCESS":
      return {
        isLoading: false,
        data: [],
        changes: [],
        errorMessage: null,
      };

    default:
      return state;
  }
}
