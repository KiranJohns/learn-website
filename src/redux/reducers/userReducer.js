const initialUserState = {
  signup: {
    response: null,
    error: null,
    loading: false,
  },
};

const userReducer = function (state = initialUserState, action) {
  switch (action.type) {
    case "SET_LOADING":
      return Object.assign({}, state, {
        signup: { error: null, response: null, loading: true },
      });
    case "SET_RESPONSE":
      return Object.assign({}, state, {
        signup: { error: null, response: action.payload, loading: false },
      });
    case "SET_ERROR":
      return Object.assign({}, state, {
        signup: { error: action.payload, response: null, loading: false },
      });
    default:
      return state;
  }
  return state;
};

export default userReducer;
