import { GET_USER_LIST } from "../constants";


const initialState = {
  userLogin: null,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_LIST:
      state.arrUser = action.arrUser;
      return { ...state };
    default:
      return state;
  }
};
