// Reducer function for updating user-related state
const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    // Add cases for other actions if needed
    default:
      return state;
  }
};

export default userReducer;