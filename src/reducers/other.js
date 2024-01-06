const initialState = {
  isLoading: false,
  data: [],
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

    // case "USER_CHECK_CHANGE":
    //   var index = state.data.findIndex((e) => e.user_pk == payload.id);
    //   if (index != -1) {
    //     state.data[index].isCheck = payload.value;
    //   }
    //   return { ...state };

    case "USER_CLEAR_SUCCESS":
      return {
        isLoading: false,
        data: [],
        errorMessage: null,
      };

    default:
      return state;
  }
}
