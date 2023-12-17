const initialState = {
  isLoading: false,
  data: [],
  analytics: { count: 0, open: 0, resolved: 0, cancelled: 0, escalated: 0 },
  history: [],
  errorMessage: null,
};

export default function ticketReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "TICKET_LOAD_START":
      return {
        ...state,
        isLoading: true,
        data: [],
        analytics: { count: 0, open: 0, resolved: 0, cancelled: 0, escalated: 0 },
        history: [],
        errorMessage: null,
      };

    case "TICKET_LOAD_SUCCESS":
      return {
        ...state,
        isLoading: false,
        ...payload,
      };

    case "TICKET_HISTORY_LOAD_SUCCESS":
      return {
        ...state,
        isLoading: false,
        history: payload,
      };

    case "TICKET_LOAD_ERROR":
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };

    case "TICKET_CHECK_CHANGE":
      var index = state.data.findIndex((e) => e.ticket_master_pk == payload.id);
      if (index != -1) {
        state.data[index].isCheck = payload.value;
      }
      return { ...state };

    case "TICKET_CLEAR_SUCCESS":
      return {
        isLoading: false,
        data: [],
        analytics: { count: 0, open: 0, resolved: 0, cancelled: 0, escalated: 0 },
        history: [],
        errorMessage: null,
      };

    default:
      return state;
  }
}
