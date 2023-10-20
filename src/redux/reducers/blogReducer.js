const initialUserState = {
  allBlogs: [],
};

const newsReducer = function (state = initialUserState, action) {
  switch (action.type) {
    case "SET_ALL_BLOGS":
      return Object.assign({}, state, { allBlogs: action.payload });
  }
  return state;
};

export default newsReducer;
