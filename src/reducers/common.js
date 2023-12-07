const initialState = {
  isLoading: false,
  mandals: [],
  divisions: [],
  sachivalayams: [],
  parts: [],
  villages: [],
  navaratnalu: [],
  caste: [],
  religion: [],
  navaratnalu: [],
  designation: [],
  errorMessage: null,
};

export default function commonReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "COMMON_LOAD_START":
      return {
        ...state,
        isLoading: true,
        mandals: [],
        divisions: [],
        sachivalayams: [],
        parts: [],
        villages: [],
        navaratnalu: [],
        caste: [],
        religion: [],
        designation: [],
        errorMessage: null,
      };

    case "COMMON_LOAD_SUCCESS":
      return {
        ...state,
        isLoading: false,
        ...payload,
      };

    case "COMMON_LOAD_ERROR":
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };

    case "COMMON_CLEAR_SUCCESS":
      return {
        isLoading: false,
        mandals: [],
        divisions: [],
        sachivalayams: [],
        parts: [],
        villages: [],
        navaratnalu: [],
        caste: [],
        religion: [],
        designation: [],
        errorMessage: null,
      };

    default:
      return state;
  }
}
