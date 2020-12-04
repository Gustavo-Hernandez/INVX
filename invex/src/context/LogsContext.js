import createDataContext from "./createDataContext";

const logsReducer = (state, action) => {
  switch (action.type) {
    case "set_logs":
      return { ...state, logs: action.payload };
    default:
      return state;
  }
};

const setLogs = (dispatch) => (logs) => {
  dispatch({ type: "set_logs", payload: logs });
};

export const { Provider, Context } = createDataContext(
  logsReducer,
  { setLogs },
  { logs: [] }
);
